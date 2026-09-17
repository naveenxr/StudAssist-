const annaUnivDocuments = [
  {
    title: "Anna University Regulations 2021 (R-2021) Overview",
    category: "regulations",
    content: "Anna University Regulations 2021 (R-2021) applies to full-time B.E. / B.Tech. undergraduate degree programmes offered in affiliated colleges. R-2021 emphasizes Choice Based Credit System (CBCS), outcome-based education, continuous assessment, and flexible learning pathways including honors and minor degrees.",
    source: "https://cac.annauniv.edu/aidetails/reg/Approved%20R2021/Undergraduate%20Programme%20-%20Academic%20Regulations%202021.pdf",
    sourceType: "official",
    tags: ["R2021", "regulations", "CBCS", "overview", "undergraduate", "Anna University"]
  },
  {
    title: "Minimum Attendance Requirements (Clause 7)",
    category: "attendance",
    content: "As per Anna University R-2021 regulations, a student must secure a minimum of 75% attendance overall in a semester to be eligible to appear for the end-semester examinations. Students securing between 65% and 74% attendance due to medical reasons or official university sports participation may be condoned by the Principal upon submitting valid certificates. Students with less than 65% attendance are not permitted to write end-semester exams and must repeat the semester.",
    source: "https://cac.annauniv.edu/aidetails/reg/Approved%20R2021/Undergraduate%20Programme%20-%20Academic%20Regulations%202021.pdf",
    sourceType: "official",
    tags: ["attendance", "75%", "condonation", "medical certificate", "eligibility", "shortage"]
  },
  {
    title: "Credit Requirements & Duration of B.E. / B.Tech. Programme (Clause 3 & 4)",
    category: "academic",
    content: "A student registered for a 4-year B.E. / B.Tech. degree under R-2021 is required to complete a minimum total of 160 to 165 credits depending on the branch of study. The minimum duration is 8 semesters (4 years) and the maximum duration allowed to complete the degree is 14 semesters (7 years) for regular students, and 12 semesters (6 years) for lateral entry students.",
    source: "https://cac.annauniv.edu/aidetails/reg/Approved%20R2021/Undergraduate%20Programme%20-%20Academic%20Regulations%202021.pdf",
    sourceType: "official",
    tags: ["credits", "duration", "semesters", "lateral entry", "maximum time", "degree completion"]
  },
  {
    title: "Continuous Assessment & Internal Marks (Clause 11)",
    category: "examinations",
    content: "For theory courses under R-2021, the evaluation weightage ratio is 40% Continuous Internal Assessment (CIA) and 60% End Semester Examination (ESE). CIA consists of periodic internal assessment tests (IA tests), assignments, and seminar/quiz performance. For practical courses, continuous assessment constitutes 60% and end semester exam constitutes 40%.",
    source: "https://cac.annauniv.edu/aidetails/reg/Approved%20R2021/Undergraduate%20Programme%20-%20Academic%20Regulations%202021.pdf",
    sourceType: "official",
    tags: ["internal assessment", "CIA", "marks split", "60-40", "40-60", "practical assessment"]
  },
  {
    title: "End Semester Examination Rules (Clause 12)",
    category: "examinations",
    content: "End Semester Examinations are conducted by the Controller of Examinations (COE), Anna University, at the end of each semester. Hall tickets are issued to students meeting attendance criteria (>=75%). Examinations are held for a duration of 3 hours per paper carrying 100 marks, which is subsequently converted to the appropriate weightage.",
    source: "https://cac.annauniv.edu/aidetails/reg/Approved%20R2021/Undergraduate%20Programme%20-%20Academic%20Regulations%202021.pdf",
    sourceType: "official",
    tags: ["end semester", "COE", "examinations", "hall ticket", "passing criteria", "100 marks"]
  },
  {
    title: "Grading System & CGPA Calculation (Clause 14)",
    category: "academic",
    content: "R-2021 uses a 10-point letter grading system: O (Outstanding, 10 grade points, 91-100 marks), A+ (Excellent, 9 points, 81-90), A (Very Good, 8 points, 71-80), B+ (Good, 7 points, 61-70), B (Average, 6 points, 50-60), RA (Re-Appearance/Fail, 0 points, <50), SA (Shortage of Attendance, 0 points), W (Withdrawal). Cumulative Grade Point Average (CGPA) is computed as the sum of (Credits x Grade Points) divided by Total Credits.",
    source: "https://cac.annauniv.edu/aidetails/reg/Approved%20R2021/Undergraduate%20Programme%20-%20Academic%20Regulations%202021.pdf",
    sourceType: "official",
    tags: ["grading system", "CGPA", "SGPA", "letter grades", "grade points", "O grade", "RA grade"]
  },
  {
    title: "Passing Requirements & Arrears (Re-Appearance) (Clause 13)",
    category: "examinations",
    content: "A candidate secures a pass in a course if they obtain a minimum of 45% in the End Semester Examination and a minimum of 50% overall (CIA + ESE combined). A student securing an 'RA' (Re-Appearance) grade must re-appear for the end semester examination in the subsequent semester. Internal marks earned during the regular semester are retained for a maximum of 4 attempts.",
    source: "https://cac.annauniv.edu/aidetails/reg/Approved%20R2021/Undergraduate%20Programme%20-%20Academic%20Regulations%202021.pdf",
    sourceType: "official",
    tags: ["arrears", "re-appearance", "RA grade", "passing marks", "50 percent", "4 attempts"]
  },
  {
    title: "Course Registration & Credit Limits (Clause 6)",
    category: "academic",
    content: "Students must register for courses in each semester during the specified registration window. In a regular semester, a student can register for a minimum of 16 credits and a maximum of 36 credits, including arrears. Registration is managed through the student portal in consultation with the Faculty Advisor.",
    source: "https://cac.annauniv.edu/aidetails/reg/Approved%20R2021/Undergraduate%20Programme%20-%20Academic%20Regulations%202021.pdf",
    sourceType: "official",
    tags: ["course registration", "credit limit", "faculty advisor", "semester registration", "36 credits"]
  },
  {
    title: "Fast Track / Accelerated Learning Option (Clause 6.4)",
    category: "academic",
    content: "Under R-2021 CBCS rules, high-performing students with no standing arrears and CGPA of 7.5 or above can register for additional courses from 5th semester onwards to complete 8th semester theory courses early. This allows students to dedicate their entire 8th semester to industrial projects or internships.",
    source: "https://cac.annauniv.edu/aidetails/reg/Approved%20R2021/Undergraduate%20Programme%20-%20Academic%20Regulations%202021.pdf",
    sourceType: "official",
    tags: ["fast track", "accelerated learning", "internship", "8th semester", "CGPA 7.5", "project work"]
  },
  {
    title: "B.E. B.Tech. Honors & Minor Degree Requirements (Clause 4.5)",
    category: "academic",
    content: "Students with a minimum CGPA of 7.50 and no standing arrears can opt for B.E./B.Tech. (Honors) by earning an additional 18 credits in specialized courses of their parent branch. Alternatively, students can earn a Minor Degree in a different discipline by completing 18 credits offered by the minor department.",
    source: "https://cac.annauniv.edu/aidetails/reg/Approved%20R2021/Undergraduate%20Programme%20-%20Academic%20Regulations%202021.pdf",
    sourceType: "official",
    tags: ["honors degree", "minor degree", "18 credits", "specialization", "CBCS", "CGPA 7.5"]
  },
  {
    title: "Withdrawal from End Semester Examination (Clause 15)",
    category: "academic",
    content: "A student may, for valid emergency reasons (such as serious illness or accident), be granted permission to withdraw from appearing in the End Semester Examination for one or more courses in a semester. Application for withdrawal must be submitted to the Head of the Institution before or during the examination along with valid medical certificate. Authorized withdrawal is represented as 'W' grade and is not treated as an attempt.",
    source: "https://cac.annauniv.edu/aidetails/reg/Approved%20R2021/Undergraduate%20Programme%20-%20Academic%20Regulations%202021.pdf",
    sourceType: "official",
    tags: ["withdrawal", "exam withdrawal", "medical grounds", "W grade", "attempt"]
  },
  {
    title: "Break of Study & Readmission (Clause 16)",
    category: "academic",
    content: "A student can take a temporary break of study for a maximum cumulative period of 1 year (2 semesters) during the entire degree programme for medical reasons, industrial training, or startup/entrepreneurship activities. Formal approval from the Director, Centre for Academic Courses, Anna University is mandatory before taking a break of study.",
    source: "https://cac.annauniv.edu/aidetails/reg/Approved%20R2021/Undergraduate%20Programme%20-%20Academic%20Regulations%202021.pdf",
    sourceType: "official",
    tags: ["break of study", "readmission", "pause studies", "entrepreneurship", "medical break", "2 semesters"]
  },
  {
    title: "Class Classification (First Class with Distinction, First Class) (Clause 17)",
    category: "academic",
    content: "First Class with Distinction: Minimum CGPA of 8.50, must have passed all courses in the first attempt within 8 semesters (9 semesters for break of study). First Class: Minimum CGPA of 6.50, completed within maximum allowed period of 10 semesters. Second Class: All other students who successfully complete the degree requirements within maximum allowed duration.",
    source: "https://cac.annauniv.edu/aidetails/reg/Approved%20R2021/Undergraduate%20Programme%20-%20Academic%20Regulations%202021.pdf",
    sourceType: "official",
    tags: ["class classification", "first class distinction", "CGPA 8.5", "degree classification", "first class"]
  },
  {
    title: "Curriculum and Syllabus Structure (CAC Anna University)",
    category: "syllabus",
    content: "Anna University UG R-2021 curriculum consists of Humanities and Social Sciences (HSMC), Basic Sciences (BSC), Engineering Sciences (ESC), Professional Core (PCC), Professional Electives (PEC), Open Electives (OEC), Employability Enhancement Courses (EEC), and Mandatory Audit Courses (MC). Detailed syllabi for all branches (CSE, IT, ECE, EEE, Mech, Civil, AI-DS) are published on the Centre for Academic Courses (CAC) website.",
    source: "https://cac.annauniv.edu/aidetails/ai_ug_cands_2021ft.html",
    sourceType: "official",
    tags: ["curriculum", "syllabus", "elective courses", "open elective", "professional core", "CAC", "R2021"]
  },
  {
    title: "Revaluation and Photocopy of Answer Scripts (Clause 14.5)",
    category: "examinations",
    content: "Students who wish to apply for revaluation of end semester answer scripts can first apply for a photocopy of their evaluated answer script within the notified date after results declaration. After reviewing the answer script with the course teacher, students can apply for revaluation through the college COE office by paying the prescribed fee per course.",
    source: "https://cac.annauniv.edu/aidetails/reg/Approved%20R2021/Undergraduate%20Programme%20-%20Academic%20Regulations%202021.pdf",
    sourceType: "official",
    tags: ["revaluation", "photocopy", "answer script", "marks review", "COE", "revaluation fee"]
  },
  {
    title: "Industrial Training and Internship Credits (Clause 5.3)",
    category: "academic",
    content: "Under R-2021, students can undergo industrial training / internship in recognized industries or research organizations for a minimum of 2 to 4 weeks during vacation periods. Earned credits (1 to 3 credits) can be substituted for professional elective courses subject to approval by the Departmental Advisory Committee.",
    source: "https://cac.annauniv.edu/aidetails/reg/Approved%20R2021/Undergraduate%20Programme%20-%20Academic%20Regulations%202021.pdf",
    sourceType: "official",
    tags: ["internship", "industrial training", "credits", "vacation internship", "elective credit"]
  }
];

module.exports = annaUnivDocuments;
