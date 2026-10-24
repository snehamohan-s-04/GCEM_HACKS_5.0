"""
SmartOps AI — Autonomous Incident Resolution Engine
Backend entrypoint: FastAPI application bootstrap

This module creates and configures the core FastAPI application.
Additional routers (Gemini, Supabase, incident resolution, etc.)
will be registered here as the project grows.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

import os
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is not configured")

gemini_client = genai.Client(api_key=GEMINI_API_KEY)

# ---------------------------------------------------------------------------
# App initialisation
# ---------------------------------------------------------------------------
# Create the FastAPI instance with project metadata.
# The title and description show up in the auto-generated /docs UI.
app = FastAPI(
    title="SmartOps AI",
    description="Autonomous Incident Resolution Engine — Backend API",
    version="0.1.0",
)

# ---------------------------------------------------------------------------
# Middleware
# ---------------------------------------------------------------------------
# TODO(security): Restrict allow_origins to the exact frontend URL(s) before
# going to production. Wildcard "*" is acceptable only during local development
# when there is no authentication in place yet.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # Tighten this once the frontend URL is known
    allow_credentials=False,      # Must be False when allow_origins=["*"]
    allow_methods=["GET", "POST"],  # POST added for /incidents ingestion
    allow_headers=["Content-Type"],
)

# ---------------------------------------------------------------------------
# Security headers middleware
# ---------------------------------------------------------------------------
# Inject basic security-hardening response headers on every reply.
# These complement (but do not replace) a reverse-proxy / CDN layer.
@app.middleware("http")
async def add_security_headers(request, call_next):
    """Add OWASP-recommended security headers to every HTTP response."""
    response = await call_next(request)
    # Prevent MIME-type sniffing
    response.headers["X-Content-Type-Options"] = "nosniff"
    # Prevent the page from being embedded in an iframe (clickjacking)
    response.headers["X-Frame-Options"] = "DENY"
    # Strict CSP — no external resources needed for a pure JSON API
    response.headers["Content-Security-Policy"] = "default-src 'none'"
    # Remove the server fingerprint
    response.headers["X-Powered-By"] = ""
    return response


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.get("/", response_class=JSONResponse, summary="Root health-check")
async def root():
    """
    Root endpoint.

    Returns a simple confirmation that the SmartOps AI backend is up.
    Useful for quick smoke-tests and load-balancer health probes.
    """
    return {"message": "SmartOps AI Backend is running"}


@app.get("/health", response_class=JSONResponse, summary="Detailed health-check")
async def health():
    """
    Health-check endpoint.

    Returns the operational status of the service.
    Intended for container orchestration probes (Kubernetes liveness /
    readiness) and monitoring dashboards.

    Future iterations can extend this to report database connectivity,
    external API reachability, queue depths, etc.
    """
    return {"status": "healthy"}


# ---------------------------------------------------------------------------
# Pydantic models
# ---------------------------------------------------------------------------

class IncidentRequest(BaseModel):
    """
    Payload sent by monitoring agents or the frontend when an incident occurs.

    Fields
    ------
    service           : Name of the affected microservice (e.g. "payment-api").
    error_rate        : Percentage of requests returning errors (0–100).
    latency           : 95th-percentile response time in milliseconds.
    logs              : Relevant log snippet captured at the time of the alert.
    recent_deployment : True if a deployment happened in the last 30 minutes.
    """

    service: str = Field(..., min_length=1, max_length=128,
                         description="Name of the affected service")
    error_rate: float = Field(..., ge=0.0, le=100.0,
                              description="Error rate percentage (0–100)")
    latency: float = Field(..., ge=0.0,
                           description="95th-percentile latency in milliseconds")
    logs: str = Field(..., max_length=10_000,
                      description="Log snippet captured at alert time")
    recent_deployment: bool = Field(...,
                                    description="Deployment in the last 30 min?")


# ---------------------------------------------------------------------------
# Severity helper
# ---------------------------------------------------------------------------

def calculate_severity(error_rate: float, latency: float) -> str:
    """
    Apply simple rule-based thresholds to determine incident severity.

    Rules (evaluated top-to-bottom; first match wins):
      - error_rate >= 30 OR latency >= 3000 ms  →  "critical"
      - error_rate >= 10 OR latency >= 1000 ms  →  "warning"
      - otherwise                                →  "normal"

    Future iterations can replace or augment these rules with an AI model.
    """
    if error_rate >= 30 or latency >= 3000:
        return "critical"
    if error_rate >= 10 or latency >= 1000:
        return "warning"
    return "normal"


# ---------------------------------------------------------------------------
# Incident ingestion endpoint
# ---------------------------------------------------------------------------

@app.post("/incidents", response_class=JSONResponse, summary="Ingest an incident")
async def ingest_incident(incident: IncidentRequest):
    """
    Incident ingestion endpoint.

    Accepts telemetry from a monitored service, calculates a severity level
    using rule-based thresholds, and returns the result immediately.

    This is the first step in the SmartOps AI pipeline. Future iterations
    will forward the enriched payload to Gemini for root-cause analysis and
    automated remediation suggestions.

    Request body (JSON)
    -------------------
    See :class:`IncidentRequest` for the full schema.

    Response body (JSON)
    --------------------
    ``status``   — Always "received" to confirm the payload was accepted.
    ``service``  — Echoed back from the request.
    ``severity`` — One of "critical", "warning", or "normal".
    """
    # Derive severity from the incoming telemetry
    severity = calculate_severity(incident.error_rate, incident.latency)

    # Return the acknowledgement payload
    # TODO: Forward to Gemini AI analysis and Supabase persistence in later steps
    return {
        "status": "received",
        "service": incident.service,
        "severity": severity,
    }


# ---------------------------------------------------------------------------
# Analysis helper
# ---------------------------------------------------------------------------

def analyze_severity(error_rate: float, latency: float) -> str:
    """
    Severity thresholds used by the /analyze endpoint.

    These thresholds are slightly more sensitive than /incidents so the AI
    analysis pipeline triggers earlier.

    Rules (first match wins):
      - error_rate >= 20 OR latency >= 3000 ms  →  "critical"
      - error_rate >=  5 OR latency >= 1000 ms  →  "warning"
      - otherwise                               →  "normal"
    """
    if error_rate >= 20 or latency >= 3000:
        return "critical"
    if error_rate >= 5 or latency >= 1000:
        return "warning"
    return "normal"


def analyze_root_cause(
    logs: str,
    recent_deployment: bool,
    severity: str,
) -> tuple[str, str, str]:
    """
    Derive root_cause, explanation, and recommended_action from telemetry.

    Parameters
    ----------
    logs              : Raw log snippet from the incident.
    recent_deployment : Whether a deployment happened recently.
    severity          : Pre-computed severity label.

    Returns
    -------
    A tuple of (root_cause, explanation, recommended_action).
    """
    # Check for known log patterns first (case-insensitive)
    logs_lower = logs.lower()

    if "database connection pool" in logs_lower:
        root_cause = "Database connection pool exhaustion"
        explanation = (
            "The service is unable to acquire new database connections because "
            "the connection pool has reached its maximum size. This typically "
            "happens under high traffic or when connections are not released "
            "promptly after use."
        )
        recommended_action = (
            "Increase the connection pool size, reduce connection hold time, "
            "or scale the database tier. Check for unclosed transactions or "
            "long-running queries consuming connections."
        )

    elif "timeout" in logs_lower or "timed out" in logs_lower:
        root_cause = "Request timeout"
        explanation = (
            "One or more downstream calls are exceeding their allowed time "
            "budget, causing cascading latency or errors in the service."
        )
        recommended_action = (
            "Review downstream service SLAs, add circuit breakers, and "
            "consider increasing timeout thresholds or optimising slow queries."
        )

    elif "out of memory" in logs_lower or "oom" in logs_lower:
        root_cause = "Memory exhaustion (OOM)"
        explanation = (
            "The service process has run out of available memory, which can "
            "lead to crashes, restarts, or degraded performance."
        )
        recommended_action = (
            "Profile memory usage, fix potential leaks, and increase the "
            "container/pod memory limit if necessary."
        )

    else:
        # Generic root-cause based on severity
        if severity == "critical":
            root_cause = "High error rate or severe latency spike"
            explanation = (
                "The service is experiencing a critical level of errors or "
                "latency. No specific pattern was detected in the provided logs."
            )
            recommended_action = (
                "Immediately check service logs, dashboards, and downstream "
                "dependencies. Consider rolling back the latest change if "
                "nothing else explains the spike."
            )
        elif severity == "warning":
            root_cause = "Elevated error rate or latency above baseline"
            explanation = (
                "The service metrics are above normal thresholds but have not "
                "yet reached critical levels."
            )
            recommended_action = (
                "Monitor closely for further degradation, review recent changes, "
                "and investigate slow or failing dependencies."
            )
        else:
            root_cause = "No significant anomaly detected"
            explanation = (
                "All metrics are within normal operating bounds and no known "
                "error patterns were found in the logs."
            )
            recommended_action = "No immediate action required. Continue routine monitoring."

    # Append a deployment note when relevant
    if recent_deployment:
        explanation += (
            " Note: a deployment was recorded recently, which may be a "
            "contributing factor. Consider reviewing the change log."
        )

    return root_cause, explanation, recommended_action


# ---------------------------------------------------------------------------
# Analysis endpoint
# ---------------------------------------------------------------------------

@app.post("/analyze", response_class=JSONResponse, summary="Analyze an incident")
async def analyze_incident(incident: IncidentRequest):
    """
    AI-powered incident analysis using Gemini.

    Takes incident telemetry and asks Gemini to:
    - identify the likely root cause
    - explain the incident
    - recommend a remediation action
    """

    prompt = f"""
You are SmartOps AI, an expert DevOps incident-response assistant.

Analyze the following production incident:

Service: {incident.service}
Error rate: {incident.error_rate}
Latency: {incident.latency} ms
Logs: {incident.logs}
Recent deployment: {incident.recent_deployment}

Determine:
1. Severity
2. Most likely root cause
3. Plain-English explanation
4. Recommended remediation action

Return ONLY valid JSON in exactly this format:

{{
    "service": "string",
    "severity": "critical | warning | normal",
    "root_cause": "string",
    "explanation": "string",
    "recommended_action": "string"
}}

Do not include markdown or ```json fences.
"""

    try:
        response = gemini_client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents=prompt,
        )

        ai_text = response.text.strip()

        # Remove accidental markdown fences if Gemini adds them
        if ai_text.startswith("```"):
            ai_text = ai_text.replace("```json", "")
            ai_text = ai_text.replace("```", "")
            ai_text = ai_text.strip()

        result = json.loads(ai_text)

        return result

    except json.JSONDecodeError:
        return JSONResponse(
            status_code=502,
            content={
                "error": "Gemini returned an invalid JSON response",
                "raw_response": ai_text,
            },
        )

    except Exception as exc:
        return JSONResponse(
            status_code=500,
            content={
                "error": "Gemini analysis failed",
                "details": str(exc),
            },
        )    