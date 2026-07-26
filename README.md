# Medical Center – Autonomous Insider Threat Hunter

<p align="center">

AI-Powered Healthcare Cybersecurity Platform for Real-Time Insider Threat Detection



---

# Project Overview

Medical Center – Autonomous Insider Threat Hunter is an AI-powered healthcare cybersecurity platform designed to detect, monitor, predict, and respond to insider threats in real time.

Healthcare organizations manage highly sensitive patient information, making them attractive targets for both external cyberattacks and insider threats. Authorized users such as doctors, nurses, and administrators may intentionally or unintentionally misuse their access privileges by exporting patient records, accessing unauthorized information, logging in from unknown devices, or performing suspicious activities outside normal working hours.

Traditional security systems mainly record these events after they occur, making it difficult to prevent data breaches before confidential information is exposed.

Our project introduces a **Hybrid AI-Based Insider Threat Detection System** that continuously monitors user behavior, learns normal activity patterns using Machine Learning, detects anomalous behavior, explains suspicious activities using a rule-based security engine, and instantly alerts administrators before sensitive healthcare information is compromised.

By combining Artificial Intelligence, User Behavior Analytics (UBA), Explainable AI (XAI), and Real-Time Monitoring, the system transforms healthcare cybersecurity from **reactive incident response** into **proactive threat prevention**.

---

# Table of Contents

- Project Objectives
- Problem Statement
- Our Solution
- Why This Project?
- Hybrid AI Detection Architecture
- Threat Detection Workflow
- Key Features
- Technology Stack
- Project Structure
- Installation
- Demo Credentials
- Screenshots
- User Roles
- Machine Learning Training
- Administrator Dashboard
- Doctor Dashboard
- Security Architecture
- Project Workflow
- Future Enhancements

---

# Project Objectives

The objectives of this project are to:

- Protect sensitive healthcare data.
- Detect insider threats before data breaches occur.
- Learn normal doctor behavior using Machine Learning.
- Continuously monitor healthcare user activities.
- Generate dynamic risk scores.
- Provide real-time administrator alerts.
- Explain detected threats using rule-based analytics.
- Maintain complete audit logs.
- Improve healthcare cybersecurity using intelligent automation.

---

# Problem Statement

Healthcare organizations face increasing insider security risks, including:

- Unauthorized patient record access
- Bulk patient data exports
- Login outside working hours
- Unknown device logins
- External IP access
- Credential misuse
- Excessive failed login attempts
- Cross-department access
- Insider data theft

Traditional monitoring systems usually detect these incidents only after the damage has already occurred.

An intelligent system capable of learning user behavior and detecting suspicious activities in real time is essential to minimize these risks and protect confidential patient information.

---

# Our Solution

Medical Center – Autonomous Insider Threat Hunter provides a proactive AI-powered cybersecurity solution specifically designed for healthcare environments.

The platform continuously monitors authenticated doctor sessions and records behavioral activities such as:

- Login Time
- Session Duration
- Patient Record Access
- Medical Record Searches
- Data Exports
- Device Information
- Network Location
- Failed Login Attempts
- Department Access
- User Interaction Patterns

These behavioral features are analyzed using Machine Learning to identify abnormal activities.

When suspicious behavior is detected, the system:

- Generates an anomaly score
- Calculates a dynamic risk score
- Explains the threat using rule-based analytics
- Sends real-time alerts to administrators
- Records complete audit logs
- Supports rapid incident response

---

# Why This Project?

Unlike traditional healthcare security systems that rely solely on predefined rules, our solution combines:

- Machine Learning-Based Anomaly Detection
- Rule-Based Security Analytics
- User Behavior Analytics (UBA)
- Explainable AI (XAI)
- Dynamic Risk Scoring
- Real-Time Monitoring
- Live Administrator Dashboard

This hybrid approach enables the platform to detect both known and previously unseen insider threats while providing clear explanations for every security decision.

# Hybrid AI Detection Architecture

The project uses a **Hybrid AI-Based Insider Threat Detection Architecture** that combines Machine Learning with Rule-Based Security Analytics to identify, explain, and respond to suspicious user activities in real time.

Unlike traditional healthcare security systems that rely only on predefined rules, this platform learns normal doctor behavior using Machine Learning while simultaneously applying explainable security rules to justify every detected anomaly.

---

## Architecture Overview

```text
                   Doctor Login
                        │
                        ▼
              User Activity Monitoring
                        │
                        ▼
               Feature Extraction
                        │
          ┌─────────────┴─────────────┐
          ▼                           ▼
  Isolation Forest              Rule Engine
          │                           │
          └─────────────┬─────────────┘
                        ▼
                 Risk Score Engine
                        │
                        ▼
            Administrator Dashboard
                        │
                        ▼
                 Audit Log Database
```

---

## Machine Learning Layer

The Machine Learning engine is responsible for detecting abnormal user behavior.

Instead of relying only on predefined attack signatures, the model learns normal healthcare user behavior from historical activity and identifies activities that significantly deviate from these learned patterns.

The system uses an **Isolation Forest** algorithm because it is highly effective for anomaly detection without requiring labeled attack data.

### Behavioral Features Used

The Machine Learning model analyzes:

- Login Hour
- Session Duration
- Patient Records Viewed
- Downloads
- Failed Login Attempts
- Department Access
- Unknown Device Login
- External IP Address
- After-Hours Access
- Export All Operation

---

## Machine Learning Workflow

1. Collect historical doctor activity.
2. Extract behavioral features.
3. Train the Isolation Forest model.
4. Learn normal behavior patterns.
5. Detect anomalies.
6. Calculate anomaly scores.
7. Predict insider threats.

---

## Machine Learning Output

For every monitored session, the model generates:

- Anomaly Score
- Confidence Score
- Threat Prediction
- Risk Level

### Risk Levels

| Risk Score | Level |
|------------|-------|
| 0–25 | Low |
| 26–50 | Medium |
| 51–75 | High |
| 76–100 | Critical |

---

# Rule-Based Security Engine

After the Machine Learning model detects suspicious behavior, a Rule-Based Security Engine explains why the activity is considered risky.

### Example Detection Rules

- Login outside working hours
- Unknown device detected
- External IP address
- Excessive failed login attempts
- Cross-department access
- Bulk "Export All" operation
- Excessive patient record access
- Large download volume

### Example Security Explanations

- Unrecognized device detected.
- Login occurred outside normal working hours.
- Bulk patient data export requested.
- Excessive patient record access detected.
- Multiple failed login attempts observed.

These explanations provide **Explainable AI (XAI)**, helping administrators understand exactly why a threat was detected.

---

# Why Hybrid AI?

Combining Machine Learning with Rule-Based Security Analytics provides the advantages of both approaches.

## Machine Learning

- Learns normal doctor behavior.
- Detects unknown insider threats.
- Identifies behavioral anomalies.
- Reduces dependence on manually written rules.

## Rule-Based Analytics

- Explains suspicious activities.
- Generates human-readable security alerts.
- Supports administrator decision-making.
- Improves transparency of AI predictions.

---

# Threat Detection Workflow

The following workflow illustrates how the system detects and responds to insider threats.

```text
Doctor Login
      │
      ▼
JWT Authentication
      │
      ▼
User Activity Monitoring
      │
      ▼
Feature Extraction
      │
      ▼
Isolation Forest Analysis
      │
      ▼
Anomaly Detection
      │
      ▼
Rule-Based Security Analysis
      │
      ▼
Risk Score Calculation
      │
      ▼
Real-Time Administrator Alert
      │
      ▼
Incident Logging
      │
      ▼
Optional Account Restriction
```

---

# Key Features

## Secure Authentication

- Doctor Login
- Administrator Login
- JWT Authentication
- Password Hashing using bcrypt
- Role-Based Access Control

---

## Doctor Activity Monitoring

The platform continuously monitors doctor activities including:

- Login and Logout
- Patient Record Access
- Medical Record Search
- Patient Report Export
- Unknown Device Login
- External IP Login
- Failed Login Attempts
- Session Duration
- Department Access
- Dynamic Risk Score Updates

---

## Artificial Intelligence

The AI module provides:

- User Behavior Analytics (UBA)
- Isolation Forest Anomaly Detection
- Dynamic Risk Scoring
- Insider Threat Prediction
- Explainable AI Decisions
- Confidence Score Calculation

---

## Real-Time Monitoring

Using Socket.IO, administrators receive:

- Live Doctor Activity
- Instant Threat Alerts
- Real-Time Notifications
- Live Dashboard Updates
- Dynamic Risk Score Changes

---

## Security Features

- User Behavior Analytics (UBA)
- Insider Threat Detection
- Audit Logging
- Explainable AI (XAI)
- Dynamic Risk Scoring
- Secure API Protection
- Role-Based Authorization
- Real-Time Monitoring

---

# Technology Stack

| Category | Technology |
|----------|------------|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Node.js |
| Framework | Express.js |
| Database | SQLite |
| Authentication | JWT + bcrypt |
| Real-Time Communication | Socket.IO |
| Machine Learning | Isolation Forest |
| Version Control | Git & GitHub |
| Deployment | Render |

# Project Structure

```text
Medical-Center-Autonomous-Insider-Threat-Hunter/
│
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── index.html
│
├── routes/
├── services/
├── middleware/
├── database/
├── data/
├── server.js
├── package.json
├── package-lock.json
├── README.md
└── .env
```

---

# Installation

## Navigate to the Project Directory

```bash
cd Medical-Center-Autonomous-Insider-Threat-Hunter
```

## Install Dependencies

```bash
npm install
```

## Start the Application

```bash
npm start
```

Open your browser and visit:

```text
http://localhost:3000
```

---

# Demo Credentials

## Doctor Portal

| Username | Password |
|----------|----------|
| **doctor** | **doctor123** |

### Doctor Features

- Secure Login
- View Patient Records
- Search Medical Records
- Export Reports
- View Personal Risk Score

---

## Administrator Portal

| Username | Password |
|----------|----------|
| **admin** | **admin123** |

### Administrator Features

- Monitor Doctor Activities
- View Live Dashboard
- Receive AI Alerts
- Review Audit Logs
- Monitor Risk Scores
- Investigate Insider Threats
- Restrict Suspicious Users

> **Note:** These credentials are provided for demonstration purposes only.

---

# Quick Start Guide

1. Clone the repository.
2. Install dependencies.

```bash
npm install
```

3. Configure the `.env` file.

```env
JWT_SECRET=your_secret_key
```

4. Start the server.

```bash
npm start
```

5. Open your browser.

```text
http://localhost:3000
```

6. Log in using one of the demo accounts.

### Doctor

```text
Username : doctor
Password : doctor123
```

### Administrator

```text
Username : admin
Password : admin123
```

> **Tip:** For the best demonstration, log in as the **Doctor** in one browser and as the **Administrator** in another browser (or an Incognito window). This allows you to observe real-time monitoring, AI-based threat detection, and administrator alerts simultaneously.

---

## Doctor Dashboard

> Add screenshot here.

```markdown
![Doctor DashBoard]("C:\Users\elakiya U\OneDrive\Pictures\doctor dashboar.png")
```

---

# User Roles

## Doctor

Doctors can:

- Login securely
- Access patient records
- Search medical records
- Export reports
- View personal risk score
- Perform healthcare operations

The AI continuously monitors every activity performed by doctors and evaluates the associated behavioral risk.

---

## Administrator

Administrators can:

- Monitor all doctors
- View AI-generated alerts
- Access the live monitoring dashboard
- Review audit logs
- Analyze risk scores
- Investigate insider threats
- Restrict suspicious users
- Monitor real-time activity using Socket.IO

---

# Demonstration

## Before AI Protection

- Doctor exports patient records.
- No intelligent monitoring.
- No administrator notification.
- Potential data breach remains unnoticed.

---

## After AI Protection

- AI detects abnormal behavior.
- Isolation Forest identifies the anomaly.
- Rule-Based Security Engine explains the threat.
- Dynamic risk score is calculated.
- Administrator receives a real-time alert.
- Incident is logged.
- Suspicious account can be restricted automatically.

---# Machine Learning Training

The Machine Learning component is responsible for learning normal healthcare user behavior and identifying anomalous activities that may indicate insider threats.

The project uses an **Isolation Forest** algorithm, an unsupervised anomaly detection model that isolates abnormal observations without requiring labeled attack data.

---

## Training Dataset

The model is trained using historical doctor activity collected from simulated healthcare operations.

### Behavioral Features

| Feature | Description |
|---------|-------------|
| Login Hour | Time when the doctor logged in |
| Session Duration | Total session duration |
| Patient Records Viewed | Number of patient records accessed |
| Downloads | Number of exported reports |
| Failed Login Attempts | Invalid login attempts |
| Department Access | Number of departments accessed |
| Unknown Device | Login from an unrecognized device |
| External IP | Login from outside the hospital network |
| After-Hours Access | Activity outside normal working hours |
| Export All | Bulk patient record export operation |

---

## Training Process

The Machine Learning model follows these steps:

1. Collect historical doctor activity.
2. Clean and preprocess the dataset.
3. Extract behavioral features.
4. Normalize the dataset.
5. Train the Isolation Forest model.
6. Save the trained model.
7. Detect future insider threats using the trained model.

---

## Prediction Process

Whenever a doctor performs an activity, the system executes the following workflow:

1. Monitor user activity.
2. Extract behavioral features.
3. Load the trained Isolation Forest model.
4. Calculate the anomaly score.
5. Determine prediction confidence.
6. Assign a risk level.
7. Send the prediction to the administrator dashboard.

---

# Risk Score Calculation

The overall risk score combines Machine Learning predictions with rule-based security analysis.

| Risk Score | Risk Level |
|------------|------------|
| 0 – 25 | Low |
| 26 – 50 | Medium |
| 51 – 75 | High |
| 76 – 100 | Critical |

Whenever suspicious behavior is detected, the administrator dashboard updates automatically with the latest risk score.

---

# Administrator Dashboard

The administrator dashboard provides a centralized view of all security activities occurring within the healthcare environment.

### Dashboard Features

- Live Doctor Monitoring
- Real-Time AI Alerts
- User Activity Timeline
- Risk Score Visualization
- Audit Log Management
- Suspicious Activity Investigation
- Machine Learning Predictions
- Security Incident History

Using **Socket.IO**, administrators receive live updates without refreshing the page.

---

# Doctor Dashboard

The doctor dashboard allows healthcare professionals to securely access medical records while the AI continuously monitors user behavior.

### Doctor Functions

- Secure Login
- Search Patient Records
- View Patient Information
- Export Reports
- View Personal Risk Score
- Perform Healthcare Operations

Every action performed by the doctor is securely logged and analyzed by the AI engine.

---

# Security Architecture

The application follows a multi-layer security architecture.

## Authentication Layer

- JWT Authentication
- Password Hashing using bcrypt
- Session Validation

---

## Application Layer

- Role-Based Access Control
- Protected REST APIs
- Secure Middleware

---

## Artificial Intelligence Layer

- Isolation Forest Anomaly Detection
- User Behavior Analytics
- Dynamic Risk Scoring
- Explainable AI

---

## Monitoring Layer

- Real-Time Dashboard
- Socket.IO Notifications
- Audit Logging

---

## Response Layer

- AI Threat Alerts
- Incident Logging
- Dynamic Risk Score Updates
- Optional Account Restriction

---

# Project Workflow

```text
Doctor Login
      │
      ▼
JWT Authentication
      │
      ▼
Doctor Activities
      │
      ▼
Behavior Monitoring
      │
      ▼
Feature Extraction
      │
      ▼
Isolation Forest Prediction
      │
      ▼
Rule-Based Security Analysis
      │
      ▼
Risk Score Calculation
      │
      ▼
Administrator Dashboard
      │
      ▼
Real-Time Alert
      │
      ▼
Incident Logging
      │
      ▼
Optional Account Restriction
```

---

# Demonstration

## Before AI Detection

- Doctor exports sensitive patient records.
- Activity completes successfully.
- No intelligent monitoring.
- Insider threat remains undetected.
- No administrator notification.

---

## After AI Detection

- AI identifies abnormal behavior.
- Isolation Forest predicts an anomaly.
- Rule-Based Security Engine explains the threat.
- Dynamic risk score increases.
- Administrator receives an instant alert.
- Security incident is logged.
- Suspicious account can be restricted.

---

# Future Enhancements

Future versions of the project may include:

- Deep Learning-based Insider Threat Detection
- Federated Learning Across Hospitals
- Multi-Hospital Deployment
- Cloud-Native Database Support
- SIEM Integration
- Predictive Insider Threat Analytics
- Continuous Model Retraining
- Mobile Administrator Dashboard
- Security Analytics Reports
- Automated Threat Response

---

# Conclusion

Medical Center – Autonomous Insider Threat Hunter demonstrates how Artificial Intelligence and Machine Learning can strengthen healthcare cybersecurity by detecting insider threats before sensitive patient information is compromised.

The project combines:

- Machine Learning using Isolation Forest
- User Behavior Analytics
- Explainable AI
- Rule-Based Security Analytics
- Real-Time Monitoring
- Dynamic Risk Scoring
- Secure Authentication
- Live Administrator Dashboard


---
