pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

/* =========================================
   TABS
========================================= */

function goTab(name, btn) {

  ["analyze", "results", "jobs"]
    .forEach((t) => {

      document.getElementById(
        "pane-" + t
      ).style.display = "none";

    });

  document
    .querySelectorAll(".tab")
    .forEach((b) =>
      b.classList.remove("on")
    );

  document.getElementById(
    "pane-" + name
  ).style.display = "block";

  btn.classList.add("on");
}

/* =========================================
   LOAD SAMPLE DATA
========================================= */

function loadSample() {

  document.getElementById(
    "resumeTxt"
  ).value = `Vishesh Vishwakarma
Mumbai, India

FULL STACK DEVELOPER

SUMMARY
Results-driven Full Stack Developer with strong experience in scalable web application development, REST APIs, frontend optimization, and cloud deployment.

SKILLS
Python
JavaScript
TypeScript
React.js
Next.js
Node.js
Express.js
FastAPI
Django
MongoDB
MySQL
PostgreSQL
Docker
AWS
Firebase
Git
GitHub
Tailwind CSS
REST API
GraphQL
Linux

EXPERIENCE

Software Developer Intern
TechNova Solutions
2024 – Present

• Developed scalable React dashboards
• Built FastAPI backend APIs
• Integrated MongoDB and PostgreSQL
• Optimized API performance by 35%
• Worked with Docker deployment
• Collaborated in Agile team

PROJECTS

ATS Resume Analyzer AI
• Built ATS Resume Analyzer using React + JavaScript
• Implemented PDF resume parsing
• Added dynamic job recommendation engine

Voice Task Manager
Employee Management System

EDUCATION

Master of Computer Applications (MCA)
Mumbai University`;



  document.getElementById(
    "jdTxt"
  ).value = `Senior React Developer

Location:
Mumbai / Remote

Responsibilities:

• Develop scalable web applications
• Build REST APIs
• Optimize frontend performance
• Deploy applications on cloud

Required Skills:

React.js
JavaScript
Node.js
MongoDB
Docker
AWS
Git
Tailwind CSS
REST API

Preferred Qualifications:

• MCA / B.Tech Degree
• Agile development

Experience Required:
2+ years`;
}

/* =========================================
   FILE DROP
========================================= */

function handleDrop(e) {

  e.preventDefault();

  document
    .getElementById("dropzone")
    .classList.remove("drag");

  const file =
    e.dataTransfer.files[0];

  if (file) {
    handleFile(file);
  }
}

/* =========================================
   FILE HANDLE
========================================= */

async function handleFile(file) {

  try {

    let text = "";

    const name =
      file.name.toLowerCase();

    // TXT
    if (name.endsWith(".txt")) {

      text =
        await file.text();

    }

    // PDF
    else if (
      name.endsWith(".pdf")
    ) {

      const buffer =
        await file.arrayBuffer();

      const pdf =
        await pdfjsLib.getDocument({
          data: buffer
        }).promise;

      for (
        let i = 1;
        i <= pdf.numPages;
        i++
      ) {

        const page =
          await pdf.getPage(i);

        const content =
          await page.getTextContent();

        text +=
          content.items
            .map((item) => item.str)
            .join(" ") + "\n";

      }

    }

    // DOCX
    else if (
      name.endsWith(".docx")
    ) {

      text =
        "DOCX extraction currently limited. Please paste manually.";

    }

    else {

      alert(
        "Unsupported file type."
      );

      return;
    }

    document.getElementById(
      "resumeTxt"
    ).value = text;

    document.getElementById(
      "uTitle"
    ).textContent =
      file.name;

    document.getElementById(
      "uSub"
    ).textContent =
      "Resume uploaded successfully";

    document.getElementById(
      "uIcon"
    ).textContent = "✅";

  }

  catch (err) {

    console.error(err);

    alert(
      "File extraction failed."
    );

  }
}

/* =========================================
   MAIN ATS ANALYSIS
========================================= */

function runAnalysis() {

  const resume =
    document.getElementById(
      "resumeTxt"
    ).value;

  const jd =
    document.getElementById(
      "jdTxt"
    ).value;

  if (!resume || !jd) {

    alert(
      "Please add Resume and Job Description."
    );

    return;
  }

  const r =
    resume.toLowerCase();

  const j =
    jd.toLowerCase();

  /* ======================================
     KEYWORDS DATABASE
  ====================================== */

  const ALL_KEYWORDS = [

    "python",
    "javascript",
    "typescript",
    "react",
    "react.js",
    "nextjs",
    "node",
    "express",
    "fastapi",
    "django",
    "mongodb",
    "mysql",
    "postgresql",
    "docker",
    "aws",
    "firebase",
    "git",
    "github",
    "tailwind",
    "rest api",
    "graphql",
    "machine learning",
    "tensorflow",
    "pandas",
    "numpy",
    "java",
    "c++",
    "html",
    "css",
    "bootstrap",
    "redux",
    "linux",
    "api",
    "deployment",
    "agile",
    "scrum"

  ];

  /* ======================================
     EXTRACT JD KEYWORDS
  ====================================== */

  const jdKeywords =
    ALL_KEYWORDS.filter((k) =>
      j.includes(k)
    );

  const matchedKeywords =
    jdKeywords.filter((k) =>
      r.includes(k)
    );

  const missingKeywords =
    jdKeywords.filter(
      (k) => !r.includes(k)
    );

  /* ======================================
     IMPORTANT KEYWORDS BONUS
  ====================================== */

  const importantKeywords = [];

  if (j.includes("react"))
    importantKeywords.push("react");

  if (j.includes("node"))
    importantKeywords.push("node");

  if (j.includes("mongodb"))
    importantKeywords.push("mongodb");

  if (j.includes("fastapi"))
    importantKeywords.push("fastapi");

  if (j.includes("aws"))
    importantKeywords.push("aws");

  /* ======================================
     KEYWORD MATCH SCORE (45)
  ====================================== */

  let keywordScore = 0;

  if (jdKeywords.length > 0) {

    keywordScore =
      (
        matchedKeywords.length /
        jdKeywords.length
      ) * 45;

  }

  importantKeywords.forEach(
    (k) => {

      if (r.includes(k)) {

        keywordScore += 3;

      }

    }
  );

  keywordScore =
    Math.min(
      45,
      Math.round(keywordScore)
    );

  /* ======================================
     EXPERIENCE SCORE (25)
  ====================================== */

  let experienceScore = 8;

  let requiredYears = 0;

  const jdYearMatch =
    j.match(
      /(\d+)\+?\s*years/
    );

  if (jdYearMatch) {

    requiredYears =
      parseInt(
        jdYearMatch[1]
      );

  }

  let candidateYears = 0;

  const resumeYearMatch =
    r.match(
      /(\d+)\+?\s*years/
    );

  if (resumeYearMatch) {

    candidateYears =
      parseInt(
        resumeYearMatch[1]
      );

  }

  if (
    requiredYears > 0
  ) {

    experienceScore +=
      (
        Math.min(
          candidateYears /
            requiredYears,
          1
        )
      ) * 10;

  }

  const projectKeywords = [

    "project",
    "developed",
    "built",
    "deployment",
    "api",
    "dashboard",
    "ai",
    "ml"

  ];

  projectKeywords.forEach(
    (k) => {

      if (r.includes(k)) {

        experienceScore += 1.5;

      }

    }
  );

  const actionVerbs = [

    "developed",
    "implemented",
    "designed",
    "built",
    "optimized",
    "created",
    "managed",
    "deployed"

  ];

  actionVerbs.forEach(
    (v) => {

      if (r.includes(v)) {

        experienceScore += 1;

      }

    }
  );

  experienceScore =
    Math.min(
      25,
      Math.round(
        experienceScore
      )
    );

  /* ======================================
     FORMAT SCORE (15)
  ====================================== */

  let formatScore = 15;

  if (!r.includes("skills"))
    formatScore -= 2;

  if (!r.includes("education"))
    formatScore -= 2;

  if (!r.includes("experience"))
    formatScore -= 2;

  if (!r.includes("@"))
    formatScore -= 2;

  if (r.includes("table"))
    formatScore -= 3;

  if (r.includes("image"))
    formatScore -= 3;

  if (r.includes("icon"))
    formatScore -= 2;

  formatScore =
    Math.max(
      0,
      Math.round(
        formatScore
      )
    );

  /* ======================================
     EDUCATION SCORE (15)
  ====================================== */

  let educationScore = 4;

  if (
    /mca|btech|b\.tech|computer science|cse|information technology|bca/i.test(
      r
    )
  ) {

    educationScore = 15;

  }

  else if (
    /bsc|science|engineering/i.test(
      r
    )
  ) {

    educationScore = 10;

  }

  else {

    educationScore = 5;

  }

  /* ======================================
     FINAL ATS SCORE
  ====================================== */

  const atsScore =

    keywordScore +

    experienceScore +

    formatScore +

    educationScore;

  /* ======================================
     GRADE
  ====================================== */

  let grade =
    "Weak Match";

  if (atsScore >= 85)
    grade =
      "Excellent Match";

  else if (
    atsScore >= 70
  )
    grade =
      "Strong Match";

  else if (
    atsScore >= 55
  )
    grade =
      "Good Match";

  /* ======================================
     UPDATE RESULT UI
  ====================================== */

  document.getElementById(
    "ringNum"
  ).textContent =
    atsScore;

  document.getElementById(
    "resGrade"
  ).textContent =
    grade;

  document.getElementById(
    "resSummary"
  ).innerHTML = `

  <div style="line-height:1.9;margin-top:10px">

    <div>
      <strong>
        Keyword Match:
      </strong>
      ${keywordScore}/45
    </div>

    <div>
      <strong>
        Experience:
      </strong>
      ${experienceScore}/25
    </div>

    <div>
      <strong>
        Format Quality:
      </strong>
      ${formatScore}/15
    </div>

    <div>
      <strong>
        Education:
      </strong>
      ${educationScore}/15
    </div>

    <br>

    <div>

  <strong style="color:#22d3a0">
    ✅ Keywords Matched With JD:
  </strong>

  <br><br>

  ${
    matchedKeywords.length > 0

    ? matchedKeywords
        .map(
          (k) => `
          <span
            style="
              display:inline-block;
              margin:4px;
              padding:6px 12px;
              border-radius:999px;
              background:rgba(34,211,160,.12);
              color:#22d3a0;
              border:1px solid rgba(34,211,160,.25);
              font-size:.82rem;
            "
          >
            ${k}
          </span>
        `
        )
        .join("")

    : "None"

  }

</div>

<br>

<div>

  <strong style="color:#f43f5e">
    ❌ Keywords Missing In Resume:
  </strong>

  <br><br>

  ${
    missingKeywords.length > 0

    ? missingKeywords
        .map(
          (k) => `
          <span
            style="
              display:inline-block;
              margin:4px;
              padding:6px 12px;
              border-radius:999px;
              background:rgba(244,63,94,.12);
              color:#f43f5e;
              border:1px solid rgba(244,63,94,.25);
              font-size:.82rem;
            "
          >
            ${k}
          </span>
        `
        )
        .join("")

    : "None"

  }

</div>
  
  `;

  /* ======================================
     ROLE DETECTION FROM JD
  ====================================== */

  let role =
    "software developer";

  const rolePatterns = [

    "react developer",
    "frontend developer",
    "backend developer",
    "full stack developer",
    "python developer",
    "data analyst",
    "cyber security",
    "java developer",
    "software engineer",
    "software developer",
    "ui ux designer",
    "devops engineer"

  ];

  for (let rname of rolePatterns) {

    if (
      j.includes(rname)
    ) {

      role = rname;

      break;
    }
  }

  /* ======================================
     LOCATION FROM RESUME
  ====================================== */

  let location =
    "india";

  const locations = [

    "mumbai",
    "delhi",
    "gurgaon",
    "bangalore",
    "hyderabad",
    "pune",
    "kolkata",
    "chennai",
    "noida",
    "punjab",
    "remote"

  ];

  for (let loc of locations) {

    if (
      r.includes(loc)
    ) {

      location = loc;

      break;
    }
  }

  /* ======================================
     FINAL SEARCH KEYWORD
  ====================================== */

  const finalKeyword =
    `${role} ${location}`;

  const encodedKeyword =
    encodeURIComponent(
      finalKeyword
    );

  const encodedRole =
    encodeURIComponent(
      role
    );

  const encodedLocation =
    encodeURIComponent(
      location
    );

  /* ======================================
     JOB LINKS
  ====================================== */

  const jobs = [

    // LINKEDIN

    {
      title:
        `LinkedIn • ${finalKeyword}`,

      url:
        `https://www.linkedin.com/jobs/search/?keywords=${encodedKeyword}`
    },

    {
      title:
        `LinkedIn • ${role}`,

      url:
        `https://www.linkedin.com/jobs/search/?keywords=${encodedRole}&location=${encodedLocation}`
    },

    {
      title:
        `LinkedIn Remote • ${role}`,

      url:
        `https://www.linkedin.com/jobs/search/?keywords=${encodedRole}%20remote`
    },

    // NAUKRI

    {
      title:
        `Naukri • ${finalKeyword}`,

      url:
        `https://www.naukri.com/${role.replaceAll(
          " ",
          "-"
        )}-jobs-in-${location}`
    },

    {
      title:
        `Naukri • ${role}`,

      url:
        `https://www.naukri.com/jobs?k=${encodedRole}&l=${encodedLocation}`
    },

    {
      title:
        `Naukri Freshers • ${role}`,

      url:
        `https://www.naukri.com/fresher-${role.replaceAll(
          " ",
          "-"
        )}-jobs`
    },

    // INTERNSHALA

    {
      title:
        `Internshala • ${role}`,

      url:
        `https://internshala.com/jobs/keywords-${role.replaceAll(
          " ",
          "-"
        )}`
    },

    {
      title:
        `Internshala Internship • ${role}`,

      url:
        `https://internshala.com/internships/${role.replaceAll(
          " ",
          "-"
        )}-internship`
    },

    // GOOGLE JOBS

    {
      title:
        `Google Jobs • ${finalKeyword}`,

      url:
        `https://www.google.com/search?q=${encodedKeyword}+jobs&ibp=htl;jobs`
    },

    {
      title:
        `Google Jobs Remote • ${role}`,

      url:
        `https://www.google.com/search?q=${encodedRole}+remote+jobs&ibp=htl;jobs`
    }

  ];

  /* ======================================
     JOBS UI
  ====================================== */

  document.getElementById(
    "jobsList"
  ).innerHTML = jobs
    .map(
      (j, i) => `
      
      <div class="job-row">

        <a
          href="${j.url}"
          target="_blank"
          class="job-title"
        >
          ${i + 1}. ${j.title}
        </a>

      </div>

    `
    )
    .join("");

  /* ======================================
     OPEN RESULTS
  ====================================== */

  goTab(
    "results",
    document.querySelectorAll(".tab")[1]
  );

}
