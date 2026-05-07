# ATS Resume Analyzer AI 🚀

AI-powered ATS Resume Analyzer that compares resumes with job descriptions and generates:

- ATS Match Score
- Keyword Match Analysis
- Missing Skills Detection
- Resume Feedback
- Smart Job Apply Links

---

# ✨ Features

## 📄 Resume Upload & Parsing

Supports:

- PDF
- DOCX
- TXT

Features:

- Drag & Drop Upload
- Resume Text Extraction
- Manual Resume Paste

---

# 🎯 ATS Analysis Logic

The ATS engine analyzes resumes using weighted scoring logic inspired by real ATS systems.

---

## ✅ Final ATS Score Formula

```text
ATS Score =
Keyword Match (45%)
+ Experience (25%)
+ Format Quality (15%)
+ Education (15%)
```

---

# 1️⃣ Keyword Match — 45%

Most important ATS factor.

## Logic

The system extracts keywords from:

- Skills
- Technologies
- Tools
- Responsibilities
- Certifications
- Tech Stack

Then compares them with resume content.

---

## Example

### Job Description Keywords

```text
React
Node.js
MongoDB
REST API
JavaScript
Git
Tailwind CSS
```

### Resume Contains

```text
React
MongoDB
JavaScript
Git
```

### Formula

```text
(Matched Keywords / Total Keywords) × 45
```

Example:

```text
(4 / 7) × 45 = 25.7
```

Final Keyword Score:

```text
26 / 45
```

---

## 🔥 Important Keyword Bonus

High-priority skills receive bonus points.

Example:

```js
const importantKeywords = [
  "React",
  "Node.js",
  "MongoDB"
];
```

Each matched important keyword:

```text
+3 bonus points
```

---

# 2️⃣ Experience Score — 25%

ATS checks:

- Years of experience
- Internship/work history
- Project relevance
- Action verbs

---

## A. Years Match

If JD requires:

```text
2+ years experience
```

And candidate has:

```text
1.5 years
```

Formula:

```js
experienceScore =
(min(candidateYears / requiredYears, 1)) * 25;
```

---

## B. Project Relevance

Projects improve ATS score if they include:

- Same tech stack
- APIs
- Deployment
- AI/ML
- Dashboards
- Similar domain

Example:

```text
Built ATS Resume Analyzer using React + FastAPI
```

---

## C. Action Verbs Bonus

ATS prefers:

- Developed
- Implemented
- Designed
- Built
- Optimized
- Created
- Managed
- Deployed

---

# 3️⃣ Format Quality — 15%

ATS systems prefer clean formatting.

---

## ✅ Good ATS Resume

- Single column layout
- Proper headings
- PDF/DOCX
- Simple fonts
- Bullet points
- Clean structure

---

## ❌ ATS Penalties

Deduct score for:

- Tables
- Images/icons
- Fancy formatting
- Poor structure
- Missing sections

---

## Example Logic

```js
let formatScore = 15;

if (hasImages) formatScore -= 3;
if (hasTables) formatScore -= 3;
if (poorSections) formatScore -= 2;
```

---

# 4️⃣ Education Score — 15%

ATS compares:

- Degree
- Field
- Certifications

---

## Full Match

```text
MCA
B.Tech CSE
Computer Science
IT
```

Score:

```text
15 / 15
```

---

## Partial Match

```text
BSc Mathematics
Engineering
```

Score:

```text
8–10 / 15
```

---

## Low Match

Unrelated field:

```text
3–5 / 15
```

---

# 📊 Example Final ATS Score

| Section | Score |
|---|---|
| Keywords | 34 / 45 |
| Experience | 18 / 25 |
| Format | 12 / 15 |
| Education | 15 / 15 |

## Final ATS Score

```text
34 + 18 + 12 + 15 = 79
```

Final:

```text
ATS Score = 79 / 100
```

---

# 🔗 Smart Job Apply Links Logic

The project generates dynamic job apply URLs using:

## ✅ Role → From Job Description

Example:

```text
React Developer
Python Developer
Data Analyst
Cyber Security
```

---

## ✅ Location → From Resume

Example:

```text
Mumbai
Delhi
Punjab
Gurgaon
```

---

## ✅ Final Search Keyword

Generated dynamically:

```text
React Developer Mumbai
Python Developer Delhi
Data Analyst Gurgaon
```

---

# 🌐 Platforms Supported

The system generates:

| Platform | Links |
|---|---|
| LinkedIn | 3 |
| Naukri | 3 |
| Internshala | 2 |
| Google Jobs | 2 |

Total:

```text
10 Dynamic Apply Links
```

---

# 🔍 Example Generated URL

```text
https://www.linkedin.com/jobs/search/?keywords=React%20Developer%20Mumbai
```

---

# 🛠️ Tech Stack

## Frontend

- HTML5
- CSS3
- Vanilla JavaScript

---

## Libraries

- PDF.js

---

# 📂 Project Structure

```bash
ATS-Resume-Analyzer-AI/
│
├── index.html
├── styles.css
├── script.js
├── README.md
└── .gitignore
```

---

# 🚀 How to Run

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/ATS-Resume-Analyzer-AI.git
```

---

## 2️⃣ Open Project

Simply open:

```bash
index.html
```

in browser.

No backend required.

---

# 🔐 Privacy

- 100% Client-side
- No backend
- No database
- No user data stored

---

# 🌟 Future Improvements

- OpenAI Resume Suggestions
- AI Resume Rewrite
- Better DOCX Parsing
- Resume Export PDF
- Real NLP Skill Extraction
- Job Ranking AI

---

# 👨‍💻 Author

## Vishesh Vishwakarma

GitHub:

https://github.com/visheshvishh

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub.