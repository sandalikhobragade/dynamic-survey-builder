# Dynamic Survey Builder

A complete, fully functional React application to create, share, and analyze dynamic surveys in real-time.

---

## 🚀 Features

- **Login System**: Secure entry to access the dashboard.
- **Dashboard**: Overview of the app’s main features.
- **Survey Builder**:  
  ➤ Create custom surveys with Text, Multiple Choice, and Rating questions.  
  ➤ Drag and Drop questions using `@dnd-kit`.  
  ➤ Preview, Save, Share, or Clear surveys.  

- **Unique Survey Link Generation**:  
  Each created survey generates a unique shareable link for respondents.

- **Survey Respondent View**:  
  The respondent can fill surveys via a shared link (SurveyDisplay page).

- **Survey Analysis**:  
  Real-time analysis with bar and pie charts using `Recharts`.  
  Displays text responses and average ratings.

- **Redux Toolkit + Redux Persist**:  
  State persistence across reloads and sessions.

---

## 📂 Folder Structure
/public
/src
│
├── /app # Redux store setup
├── /features
│ ├── /auth # LoginPage
│ ├── /builder # SurveyBuilder + builderSlice
│ ├── /responses # responsesSlice
│
├── /pages # Dashboard, TakeSurvey, SurveyDisplay, AnalyzePage
├── /routes # AppRoutes.jsx
├── App.jsx
├── index.js
├── package.json
├── README.md
└── .gitignore

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/dynamic-survey-builder.git
cd dynamic-survey-builder

npm install

npm start

http://localhost:3000/

| Path                     | Description                          |
| ------------------------ | ------------------------------------ |
| `/`                      | Login Page                           |
| `/dashboard`             | Dashboard Page                       |
| `/builder`               | Survey Builder Page                  |
| `/take-survey/:surveyId` | Take Survey Link Generator Page      |
| `/survey/:surveyId`      | Survey Respondent View (Fill Survey) |
| `/analyze/:surveyId`     | Survey Analysis Page                 |

🛠️ Tech Stack
React.js

Redux Toolkit

Redux Persist

React Router DOM v6

Material-UI (MUI)

@dnd-kit (Drag & Drop)

Recharts (Charts)

👥 Collaborators
Access for evaluation:
zorever20x@gmail.com (invited as collaborator)

