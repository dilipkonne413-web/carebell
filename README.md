# CareBell 🔔
> **Smart Elder Care Medicine Reminder & SOS Escalation System**

CareBell is a real-time healthcare support system bridging the gap between elderly patients living independently and remote caregivers. It ensures zero missed doses through automated reminders and instant multi-stage SOS escalations.

---

## 🎯 Problem Statement
- Elderly patients with chronic conditions (hypertension, diabetes) frequently forget scheduled medication.
- Standard mobile reminders lack feedback loops; families never know whether pills were genuinely consumed.
- Hardware smart pillboxes are expensive (₹5,000–₹12,000) and impractical for mass Indian households.

---

## 💡 Key Features & Workflow
- **Elder Patient UI:** Distraction-free, high-contrast, large-button interface designed for seniors.
- **Bi-Directional Real-Time Sync:** Immediate transmission of medicine adherence status to the remote caregiver.
- **Fail-Safe Multi-Stage SOS:** If an alarm is ignored across 3 warning cycles, system automatically escalates an audible, high-priority emergency alert.
- **Audit Logging:** Transparent, timestamped logs tracking every alarm trigger, response, and emergency dispatch.

---

## 🛠 Tech Stack
- **Frontend:** React.js, Vite, Modern CSS
- **Backend:** Node.js, Express.js
- **Real-Time Engine:** Socket.io (Low-latency full-duplex WebSockets)
- **Version Control:** Git & GitHub

---

## 🚀 Getting Started Locally

### 1. Clone Repository
```bash
git clone [https://github.com/dilipkonne413-web/carebell.git](https://github.com/dilipkonne413-web/carebell.git)
cd carebell
