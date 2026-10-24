# GCEM_HACKS_5.0
# 🚀 SmartOps AI — Autonomous Incident Resolution Engine

> **From incident detection to intelligent resolution — powered by AI.**

SmartOps AI is an AI-assisted incident management platform designed to help DevOps and SRE teams understand, investigate, and respond to production incidents faster.

Traditional monitoring systems can tell engineers **that something is wrong**. SmartOps AI focuses on the next question:

**“Why did it happen, what should we do, and how can we prevent it?”**

SmartOps combines an operations dashboard with AI-powered root-cause analysis, actionable recommendations, incident history, and human-in-the-loop remediation.

---

## 🎯 Problem Statement

Modern applications run across distributed services and multiple cloud environments. When an incident occurs, engineers often need to:

- Identify the affected service
- Understand the severity of the incident
- Investigate possible root causes
- Correlate different operational signals
- Decide what action should be taken
- Manually document the incident
- Review previous incidents for recurring patterns

This process can be time-consuming and highly dependent on manual investigation.

SmartOps AI aims to simplify this workflow by bringing **incident visibility, AI analysis, recommended actions, and historical intelligence into one platform.**

---

## 💡 Our Solution

SmartOps AI provides a unified operations interface where an engineer can move through the incident lifecycle:

```text
Detect
   ↓
Analyze
   ↓
Explain
   ↓
Recommend
   ↓
Human Approve
   ↓
Learn
```

When an incident occurs, SmartOps sends the incident information to the backend, where Gemini analyzes the event and generates:

- Probable root cause
- Explanation of the incident
- Recommended corrective action

The engineer can then review the recommendation before approving the remediation workflow.

---

## ✨ Key Features

### 📊 Operations Dashboard

A centralized dashboard provides an overview of the current operational state, including:

- Active incidents
- Critical incidents
- Service health
- Error rates
- Latency
- Infrastructure status
- Recent operational events

---

### 🚨 Incident Management

SmartOps provides an incident-focused view for investigating operational problems.

Each incident can include:

- Incident ID
- Affected service
- Severity
- Status
- Detection time
- Root-cause information
- AI explanation
- Recommended action
- Incident timeline

---

### 🤖 Gemini-Powered Root Cause Analysis

The core intelligence layer uses **Google Gemini** to analyze incident information.

The AI analysis provides:

```text
Incident
   ↓
FastAPI Backend
   ↓
Gemini AI
   ↓
Root Cause
   ↓
Explanation
   ↓
Recommended Action
```

For example, a Payment API incident can be analyzed as:

**Root Cause:**  
Database connection pool exhaustion

**Explanation:**  
The AI analyzes the incident context and explains the likely reason for the service failure.

**Recommended Action:**  
Gemini proposes a corrective action that the engineer can review.

---

### 🧑‍💻 Human-in-the-Loop Remediation

SmartOps follows a safety-first approach.

Instead of automatically making potentially risky infrastructure changes, the platform allows the engineer to review the AI recommendation before approving remediation.

```text
AI Recommendation
       ↓
Engineer Review
       ↓
Approval
       ↓
Remediation Workflow
```

This keeps the engineer in control of critical operational decisions.

---

### 🏗️ Multi-Cloud Infrastructure View

SmartOps provides a unified infrastructure view for:

- AWS
- Microsoft Azure
- Google Cloud Platform

The dashboard presents infrastructure health, resource information, performance indicators, and recent events in a single interface.

> **Current prototype note:** Cloud infrastructure metrics are simulated demonstration data. Real cloud telemetry integrations are planned for future development.

---

### 📚 Incident History & Intelligence

The Incident History section helps identify operational patterns across previous incidents.

It provides insights such as:

- Total incidents
- Critical incidents
- AI-analyzed incidents
- Most affected service
- Common root causes
- Prevention insights

This helps move incident management from simply resolving individual failures toward learning from previous incidents.

---

### ⚙️ Configuration & Safety

The Settings section provides visibility into the current SmartOps configuration, including:

- Environment
- Monitoring mode
- Gemini AI status
- Remediation approval requirements
- Critical incident handling
- Remediation safety controls

---

## 🧠 What Makes SmartOps Different?

Traditional monitoring platforms are primarily focused on:

> **“Something is wrong.”**

SmartOps AI focuses on:

> **“Something is wrong — here is what may have caused it, why it happened, and what you should consider doing next.”**

The goal is to reduce the time engineers spend moving between alerts, logs, dashboards, and investigation tools.

### Our USP

**AI-assisted incident resolution with explainable recommendations and human-controlled remediation.**

---

## 🏛️ System Architecture

```text
                    ┌──────────────────────┐
                    │      SmartOps UI     │
                    │   React + Vite       │
                    └──────────┬───────────┘
                               │
                               │ HTTP
                               ▼
                    ┌──────────────────────┐
                    │    FastAPI Backend   │
                    │       Python         │
                    └──────────┬───────────┘
                               │
                               │ Incident Analysis
                               ▼
                    ┌──────────────────────┐
                    │      Google Gemini   │
                    │     AI Analysis      │
                    └──────────┬───────────┘
                               │
                               ▼
              ┌────────────────────────────────┐
              │ Root Cause + Explanation +     │
              │ Recommended Corrective Action  │
              └────────────────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Engineer Approval  │
                    │ Human-in-the-Loop    │
                    └──────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Recharts

### Backend

- Python
- FastAPI
- Uvicorn

### AI

- Google Gemini API

### Planned Infrastructure

- Supabase / PostgreSQL
- AWS
- Microsoft Azure
- Google Cloud Platform

---

## 📁 Project Structure

```text
GCEM_HACKS_5.0/
│
├── backend/
│   ├── app/
│   │   └── main.py
│   ├── .env
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Infrastructure.jsx
│   │   │   ├── AIAnalysis.jsx
│   │   │   ├── IncidentHistory.jsx
│   │   │   └── Settings.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# 🚀 Running Locally

Follow these steps to run SmartOps AI on your local machine.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- Python 3.x
- Git
- Google Gemini API key

---

## 1. Clone the Repository

```bash
git clone <your-repository-url>
cd GCEM_HACKS_5.0
```

---

## 2. Set Up the Backend

Navigate to the backend:

```bash
cd backend
```

Create and activate a Python virtual environment if required.

### Windows

```powershell
python -m venv venv
.\venv\Scripts\activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

The backend will be available at:

```text
http://127.0.0.1:8000
```

---

## 3. Configure Gemini API

Create a `.env` file inside the `backend` directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> Never commit your API key to GitHub.

Make sure `.env` is included in `.gitignore`.

---

## 4. Start the Frontend

Open a **new terminal** and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will display the local URL in the terminal, for example:

```text
http://localhost:5173/
```

Open the displayed URL in your browser.

---

#  Demo Workflow

Once the application is running, the main demonstration flow is:

```text
1. Open SmartOps Dashboard
        ↓
2. View service and incident health
        ↓
3. Simulate an incident
        ↓
4. Payment API enters a critical state
        ↓
5. Incident is sent to FastAPI
        ↓
6. FastAPI sends incident information to Gemini
        ↓
7. Gemini analyzes the incident
        ↓
8. Root cause is displayed
        ↓
9. Explanation is displayed
        ↓
10. Recommended action is displayed
        ↓
11. Engineer reviews the recommendation
        ↓
12. Engineer approves remediation
        ↓
13. Incident appears in Incident History
        ↓
14. Historical patterns and prevention insights are shown
```

---


# 📌 Current Prototype Status

SmartOps AI currently demonstrates the core AI-assisted incident resolution workflow.

### Implemented

- React/Vite operations dashboard
- Incident management interface
- Service health monitoring interface
- Infrastructure dashboard
- FastAPI backend
- Gemini-powered incident analysis
- Root-cause analysis
- AI-generated explanations
- Recommended corrective actions
- Human-in-the-loop remediation approval flow
- Incident history and intelligence
- Settings and safety controls

### Currently Simulated

- Incident generation
- AWS infrastructure data
- Azure infrastructure data
- GCP infrastructure data
- Cloud performance metrics
- Remediation execution

### Planned

- Persistent Supabase/PostgreSQL storage
- Real AWS telemetry integration
- Real Azure telemetry integration
- Real GCP telemetry integration
- Real-time monitoring and observability
- Log and metric correlation
- Automated remediation execution
- Advanced incident pattern detection
- Continuous learning from historical incidents

---

# 🗺️ Future Roadmap

## Phase 1 — AI-Assisted Operations

- Incident detection
- Gemini-powered RCA
- Explainable recommendations
- Human approval workflow

## Phase 2 — Real Observability

- Cloud telemetry integration
- Logs and metrics ingestion
- Real-time service monitoring
- Cross-service correlation

## Phase 3 — Autonomous Remediation

- Approved remediation execution
- Safe rollback workflows
- Automated recovery actions
- Policy-based remediation controls

## Phase 4 — Predictive Operations

- Incident pattern recognition
- Failure prediction
- Proactive alerts
- Preventive recommendations

---

# 🎯 Vision

SmartOps AI aims to evolve from an incident investigation dashboard into an intelligent operations platform that can:

**Detect → Understand → Recommend → Act → Learn**

The long-term vision is to reduce mean time to resolution, improve operational reliability, and help engineering teams move from reactive incident response toward proactive and autonomous operations.

---

# Team-Binary Brainz

**GCEM HACKS 5.0**

Built as a hackathon project focused on applying AI to modern DevOps and incident management.

---
