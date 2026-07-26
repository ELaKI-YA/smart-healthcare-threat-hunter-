Medical Center – Autonomous Insider Threat Hunter

Medical Center 
Autonomous Insider Threat Hunter is an AI-powered healthcare cybersecurity platform designed to detect, monitor, predict, and respond to insider threats in real time.

Healthcare organizations manage highly sensitive patient information, making them attractive targets for both external cyberattacks and insider threats. Authorized users such as doctors, nurses, and administrators may intentionally or unintentionally misuse their access privileges by exporting patient records, accessing unauthorized information, logging in from unknown devices, or performing suspicious activities outside normal working hours.

Traditional security systems mainly record these events after they occur, making it difficult to prevent data breaches before confidential information is exposed.

Our project introduces a **Hybrid AI-Based Insider Threat Detection System** that continuously monitors user behavior, learns normal activity patterns using Machine Learning, detects anomalous behavior, explains suspicious activities using a rule-based security engine, and instantly alerts administrators before sensitive healthcare information is compromised.

By combining Artificial Intelligence, User Behavior Analytics, Explainable AI, and Real-Time Monitoring, the system transforms healthcare cybersecurity from **reactive incident response** into **proactive threat prevention**.

---

Project Objectives

The objectives of this project are to:

- Protect sensitive healthcare data.
- Detect insider threats before data breaches occur.
- Learn normal doctor behavior using Machine Learning.
- Continuously monitor healthcare user activities.
- Generate dynamic risk scores.
- Provide real-time administrator alerts.
- Explain detected threats using rule-based analytics.
- Maintain complete audit logs for investigations.
- Improve healthcare cybersecurity using intelligent automation.

---

Problem Statement

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

Our Solution

Medical Center – Autonomous Insider Threat Hunter provides a proactive AI-powered cybersecurity solution specifically designed for healthcare environments.

The platform continuously monitors authenticated doctor sessions and records behavioral activities such as:

- Login time
- Session duration
- Patient record access
- Medical record searches
- Data exports
- Device information
- Network location
- Failed login attempts
- Department access
- User interaction patterns

These behavioral features are analyzed using Machine Learning to identify abnormal activities.

When suspicious behavior is detected, the system:

- Generates an anomaly score
- Calculates a dynamic risk score
- Explains the threat using rule-based analytics
- Sends real-time alerts to administrators
- Records complete audit logs
- Supports rapid incident response

---

Why This Project?

Unlike traditional healthcare security systems that rely solely on predefined rules, our solution combines:

- Machine Learning-based anomaly detection
- Rule-Based Security Analytics
- User Behavior Analytics (UBA)
- Explainable AI (XAI)
- Dynamic Risk Scoring
- Real-Time Monitoring
- Live Administrator Dashboard

This hybrid approach enables the platform to detect both known and previously unseen insider threats while providing clear explanations for every security decision.

---

Hybrid AI Detection Architecture

Our project is **not purely rule-based**.

Instead, it combines **Machine Learning** and **Rule-Based Security Analytics** to create an intelligent and explainable insider threat detection platform.

The architecture consists of two major components:

Machine Learning Layer

The Machine Learning engine is responsible for detecting abnormal behavior.

Instead of relying only on predefined attack signatures, it learns what **normal doctor behavior** looks like from historical activity data and identifies activities that significantly deviate from these learned patterns.

The project uses an **Isolation Forest** anomaly detection model because it is highly effective for identifying rare and unusual activities without requiring labeled attack data.
Behavioral Features Used

The model analyzes:

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

Machine Learning Workflow

1. Collect historical doctor activity
2. Extract behavioral features
3. Train the Isolation Forest model
4. Learn normal behavior patterns
5. Detect anomalies
6. Calculate anomaly scores
7. Predict insider threats

Machine Learning Output

For every monitored session, the model generates:

- Anomaly Score
- Confidence Score
- Threat Prediction
- Risk Level

Risk Levels include:

- 🟢 Low
- 🟡 Medium
- 🟠 High
- 🔴 Critical

---

Rule-Based Security Engine

After the Machine Learning model identifies suspicious behavior, a rule-based security engine explains **why** the activity is considered risky.

Example rules include:

- Login outside working hours
- Unknown device detected
- External IP address
- Excessive failed login attempts
- Cross-department access
- Bulk "Export All" operation
- Excessive patient record access
- Large download volume

Example explanations:

- "Unrecognized device detected."
- "Login occurred outside normal working hours."
- "Bulk patient data export requested."

These explanations provide **Explainable AI (XAI)**, helping administrators quickly understand and investigate potential insider threats.

---

Why Hybrid AI?

Combining Machine Learning with Rule-Based Security Analytics provides the advantages of both approaches.

Machine Learning

- Learns normal doctor behavior
- Detects unknown insider threats
- Identifies behavioral anomalies
- Reduces dependence on manually written rules

Rule-Based Detection

- Explains suspicious behavior
- Generates human-readable security alerts
- Supports administrator decision-making
  ---

Threat Detection Workflow

The following workflow illustrates how the system detects and responds to insider threats.


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


---

Key Features

Secure Authentication

- Doctor Login
- Administrator Login
- JWT Authentication
- Password Hashing using bcrypt
- Role-Based Access Control

---

Doctor Activity Monitoring

The platform continuously monitors doctor activities including:

- Login & Logout
- Patient Record Access
- Medical Record Search
- Patient Report Export
- Unknown Device Login
- External IP Login
- Failed Login Attempts
- Session Duration
- Department Access
- Risk Score Updates



Artificial Intelligence

The AI module provides:

- User Behavior Analytics
- Isolation Forest Anomaly Detection
- Dynamic Risk Scoring
- Insider Threat Prediction
- Explainable AI Decisions
- Confidence Score Calculation



Real-Time Monitoring

Using Socket.IO, administrators receive:

- Live Doctor Activity
- Instant Threat Alerts
- Real-Time Notifications
- Live Dashboard Updates
- Dynamic Risk Score Changes

---

Security Features

- User Behavior Analytics (UBA)
- Insider Threat Detection
- Audit Logging
- Explainable AI
- Dynamic Risk Scoring
- Secure API Protection
- Role-Based Authorization
- Real-Time Monitoring

---

Technology Stack

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

---

Project Structure


Medical-Center/
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

---

git clone https://github.com/ELaKI-YA/Medical-Center-Autonomous-Insider-Threat-Hunter.git


Navigate into the project

cd Medical-Center-Autonomous-Insider-Threat-Hunter

Install dependencies

bash
npm install

bash
npm start

Open your browser


http://localhost:3000



Demo Credentials

Doctor Portal

| Username | Password |

|----------|----------|
| doctor   | doctor123 |

Doctor Features

- Login
- View Patient Records
- Search Medical Records
- Export Reports
- View Personal Risk Score

Administrator Portal

| Username | Password |
|----------|----------|
| **admin** | **admin123** |

Administrator Features

- Monitor Doctor Activities
- View Live Dashboard
- Receive AI Alerts
- Review Audit Logs
- Monitor Risk Scores
- Investigate Insider Threats
- Restrict Suspicious Users

Note: These credentials are for demonstration purposes only.

---
Demonstration,
log in as the **Doctor** in one browser and as the **Administrator** in another browser or Incognito window to observe real-time monitoring and alerts.


User Roles

Doctor

Doctors can:

- Login securely
- Access patient records
- Search medical records
- Export reports
- View personal session risk score

---

Administrator

Administrators can:

- Monitor all doctors
- View AI-generated alerts
- Access the live dashboard
- Review audit logs
- Analyze risk scores
- Investigate insider threats
- Restrict suspicious users

---

Demonstration

Before AI Protection

- Doctor exports patient records.
- No intelligent detection.
- No administrator notification.
- Potential data breach remains unnoticed.

---

After AI Protection

- AI detects abnormal behavior.
- Isolation Forest identifies the anomaly.
- Rule engine explains the threat.
- Risk score is updated.
- Administrator receives a real-time alert.
- Incident is logged.
- Suspicious account can be restricted.

---

Future Enhancements

Future versions may include:

- Deep Learning-Based Threat Detection
- Federated Learning
- SIEM Integration
- Multi-Hospital Deployment
- Cloud Database Support
- Mobile Security Dashboard
- Continuous Model Retraining
- Predictive Insider Threat Analytics

---


Machine Learning Training

The Machine Learning component is responsible for learning normal doctor behavior and identifying anomalous activities.

The project uses an **Isolation Forest** algorithm, an unsupervised anomaly detection model that isolates abnormal observations without requiring labeled attack data.

Training Dataset

The training dataset contains historical doctor activities collected from simulated healthcare operations.

Behavioral features include:

| Feature | Description |
|---------|-------------|
| Login Hour | Time when the doctor logged in |
| Session Duration | Total active session duration |
| Patient Records Viewed | Number of patient records accessed |
| Downloads | Number of downloaded or exported reports |
| Failed Login Attempts | Invalid login attempts |
| Department Access | Number of departments accessed |
| Unknown Device | Login from an unrecognized device |
| External IP | Login from outside the hospital network |
| After Hours Access | Activity outside normal working hours |
| Export All | Bulk patient record export operation |

---

Training Process

The Machine Learning model follows these steps:

1. Collect historical doctor activity.
2. Clean and preprocess the dataset.
3. Extract behavioral features.
4. Normalize the data.
5. Train the Isolation Forest model.
6. Save the trained model.
7. Use the trained model to detect future insider threats.

---

Prediction Process

Whenever a doctor performs an activity:

1. Collect current behavior.
2. Extract behavioral features.
3. Load the trained Isolation Forest model.
4. Calculate the anomaly score.
5. Determine the confidence level.
6. Assign a risk level.
7. Send results to the administrator dashboard.

---

Risk Score Calculation

The system combines Machine Learning predictions with rule-based security analysis to calculate an overall risk score.

Risk Levels

| Risk Score | Level |
|------------|-------|
| 0 – 25 | 🟢 Low |
| 26 – 50 | 🟡 Medium |
| 51 – 75 | 🟠 High |
| 76 – 100 | 🔴 Critical |

The administrator dashboard updates the risk score in real time whenever suspicious behavior is detected.

---

Administrator Dashboard

The administrator dashboard provides a centralized view of all security activities occurring within the healthcare system.

Features include:

- Live doctor monitoring
- Real-time AI alerts
- User activity timeline
- Risk score visualization
- Audit log management
- Suspicious activity investigation
- Machine Learning predictions
- Security incident history

The dashboard automatically refreshes using **Socket.IO**, allowing administrators to monitor ongoing activities without refreshing the page.

---

Doctor Dashboard

The doctor dashboard provides healthcare professionals with secure access to medical records while allowing the AI system to monitor user behavior.

Doctors can:

- Login securely
- Search patient records
- View patient information
- Export reports
- View personal session risk score
- Perform healthcare operations

Every action performed by the doctor is securely logged and analyzed by the AI engine.

---

Security Architecture

The application follows multiple layers of security.

Authentication Layer

- JWT Authentication
- Password Hashing using bcrypt
- Session Validation

Application Layer

- Role-Based Access Control
- Protected API Endpoints
- Secure Middleware

AI Layer

- Isolation Forest Anomaly Detection
- User Behavior Analytics
- Dynamic Risk Scoring

Monitoring Layer

- Real-Time Dashboard
- Socket.IO Notifications
- Audit Logs

Response Layer

- AI Alerts
- Incident Logging
- Risk Score Updates
- Account Restriction

---

Project Workflow


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
Rule-Based Analysis
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


Demonstration

 Before AI Detection

- Doctor exports sensitive patient records.
- Activity is completed successfully.
- No intelligent monitoring.
- Insider threat remains undetected.

After AI Detection

- AI identifies abnormal behavior.
- Isolation Forest predicts an anomaly.
- Rule engine explains the threat.
- Administrator receives a real-time alert.
- Risk score increases.
- Security incident is logged.
- Optional account restriction is applied.

---

Future Scope

The project can be extended with:

- Deep Learning–based insider threat detection
- Federated Learning across hospitals
- Cloud-native deployment
- Multi-hospital monitoring
- SIEM integration
- Predictive behavior analytics
- Mobile administrator dashboard
- Continuous online model retraining



