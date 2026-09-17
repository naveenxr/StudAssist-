// Complete Mock Data Repository for StudAssist SaaS

export const userProfile = {
  name: "Alex Morgan",
  rollNo: "21CS1048",
  department: "Computer Science & Engineering",
  semester: "Semester 7",
  email: "alex.morgan@univ.edu",
  avatarInitials: "AM",
  academicYear: "2024–2025",
  status: "Active Student"
};

export const suggestedQuestions = [
  {
    id: "q1",
    text: "What is the attendance requirement?",
    category: "Regulations",
    iconName: "FileCheck"
  },
  {
    id: "q2",
    text: "Show me the Semester 7 syllabus",
    category: "Academics",
    iconName: "BookOpen"
  },
  {
    id: "q3",
    text: "What are the latest college notices?",
    category: "Notices",
    iconName: "Bell"
  },
  {
    id: "q4",
    text: "How do I register for examinations?",
    category: "Examinations",
    iconName: "GraduationCap"
  }
];

export const mockConversations = [
  {
    id: "conv-1",
    title: "Attendance & Medical Condonation",
    timestamp: "Today, 10:42 AM",
    preview: "What is the minimum attendance required for end-semester exams?",
    messages: [
      {
        id: "m-101",
        sender: "user",
        text: "What is the attendance requirement for end-semester exams?",
        timestamp: "10:42 AM"
      },
      {
        id: "m-102",
        sender: "assistant",
        text: "According to Academic Regulation 2021 (Clause 4.2), students must maintain a minimum of **75% attendance** in each course to be eligible to appear for the End-Semester Examinations.\n\nKey exceptions & guidelines:\n- **65% - 74% Attendance**: Can be condoned on medical grounds or official college deputation upon payment of a condonation fee.\n- **Below 65%**: Student is strictly detained in that course and must re-register when offered next.",
        timestamp: "10:42 AM",
        sources: [
          {
            title: "Academic Regulations 2021 - Clause 4.2",
            category: "Regulations",
            relevance: 0.95
          },
          {
            title: "Student Handbook - Medical Leave Policy",
            category: "Regulations",
            relevance: 0.88
          }
        ]
      }
    ]
  },
  {
    id: "conv-2",
    title: "Semester 7 CSE Syllabus Query",
    timestamp: "Yesterday, 3:15 PM",
    preview: "Can you list the core subjects for Computer Science Sem 7?",
    messages: [
      {
        id: "m-201",
        sender: "user",
        text: "Show me the Semester 7 syllabus for Computer Science",
        timestamp: "3:15 PM"
      },
      {
        id: "m-202",
        sender: "assistant",
        text: "Here is the summary of courses offered in **Semester 7 (CSE)**:\n\n1. **CS701 - Cloud Computing & Distributed Systems** (3 Credits)\n2. **CS702 - Artificial Intelligence & Machine Learning** (4 Credits)\n3. **CS703 - Cyber Security & Cryptography** (3 Credits)\n4. **CS704 - Professional Elective IV** (3 Credits)\n5. **CS705 - Capstone Project Phase 1** (4 Credits)\n\nDetailed syllabus modules for each course can be reviewed in the **Syllabus section** of this dashboard.",
        timestamp: "3:15 PM",
        sources: [
          {
            title: "Semester 7 Syllabus Handbook",
            category: "Syllabus",
            relevance: 0.96
          }
        ]
      }
    ]
  }
];

export const syllabusData = [
  {
    code: "CS701",
    title: "Cloud Computing & Distributed Systems",
    semester: "Semester 7",
    department: "Computer Science & Engineering",
    credits: 3,
    category: "Core",
    prerequisites: "CS502 Computer Networks",
    description: "Covers cloud infrastructure models (IaaS, PaaS, SaaS), virtualization technologies, containerization with Docker and Kubernetes, serverless architectures, and distributed storage systems.",
    modules: [
      "Unit 1: Introduction to Cloud & Virtualization (Hypervisors, KVM, Docker)",
      "Unit 2: Cloud Infrastructure & Storage (AWS S3, OpenStack, HDFS)",
      "Unit 3: Cloud Programming Models (MapReduce, Spark, Serverless Lambda)",
      "Unit 4: Distributed Consensus & Security (Paxos, Raft, IAM, Encryption)",
      "Unit 5: Microservices & DevOps (Kubernetes Orchestration, CI/CD Pipelines)"
    ]
  },
  {
    code: "CS702",
    title: "Artificial Intelligence & Machine Learning",
    semester: "Semester 7",
    department: "Computer Science & Engineering",
    credits: 4,
    category: "Core",
    prerequisites: "CS403 Linear Algebra & Probability",
    description: "Comprehensive introduction to search algorithms, supervised/unsupervised machine learning, deep neural networks, natural language processing, and evaluation metrics.",
    modules: [
      "Unit 1: Intelligent Agents & Heuristic Search (A*, Minimax, CSP)",
      "Unit 2: Supervised Learning (Linear/Logistic Regression, SVM, Decision Trees)",
      "Unit 3: Unsupervised Learning & Clustering (K-Means, PCA, Hierarchical)",
      "Unit 4: Deep Learning Foundations (Perceptrons, CNNs, RNNs, Transformers)",
      "Unit 5: Model Deployment & AI Ethics (Fairness, Bias, MLops Basics)"
    ]
  },
  {
    code: "CS703",
    title: "Cyber Security & Cryptography",
    semester: "Semester 7",
    department: "Computer Science & Engineering",
    credits: 3,
    category: "Core",
    prerequisites: "CS502 Computer Networks",
    description: "Focuses on mathematical foundations of cryptography, symmetric/asymmetric encryption, network security protocols, vulnerability scanning, and threat mitigation.",
    modules: [
      "Unit 1: Classical & Modern Encryption (AES, RSA, ECC, Diffie-Hellman)",
      "Unit 2: Hash Functions & Digital Signatures (SHA-256, HMAC, PKI)",
      "Unit 3: Network & Web Security (TLS/SSL, Firewalls, IPSec, OAuth 2.0)",
      "Unit 4: Ethical Hacking & Vulnerabilities (OWASP Top 10, Penetration Testing)",
      "Unit 5: Cyber Laws, Forensics & Incident Response"
    ]
  },
  {
    code: "CS704",
    title: "Big Data Analytics",
    semester: "Semester 7",
    department: "Computer Science & Engineering",
    credits: 3,
    category: "Elective",
    prerequisites: "CS401 Database Management Systems",
    description: "Hands-on experience with handling large-scale unstructured data streams using Hadoop, Spark, NoSQL databases, and real-time analytical pipelines.",
    modules: [
      "Unit 1: Big Data Ecosystem & Hadoop Architecture",
      "Unit 2: NoSQL Databases (MongoDB, Cassandra, Neo4j)",
      "Unit 3: In-Memory Analytics with Apache Spark",
      "Unit 4: Real-time Streaming Architecture (Kafka, Flink)",
      "Unit 5: Data Visualization & Business Intelligence Tools"
    ]
  },
  {
    code: "IT702",
    title: "Internet of Things & Embedded Systems",
    semester: "Semester 7",
    department: "Information Technology",
    credits: 3,
    category: "Elective",
    prerequisites: "IT501 Microprocessors",
    description: "Architecture of IoT nodes, sensor networks, MQTT/CoAP protocols, ESP32 development, and edge computing analytical architectures.",
    modules: [
      "Unit 1: IoT Hardware & Sensor Architectures",
      "Unit 2: Wireless Sensor Networks & Protocols (ZigBee, BLE, LoRaWAN)",
      "Unit 3: IoT Cloud Messaging (MQTT, CoAP, HTTP/2)",
      "Unit 4: Edge AI & Microcontroller Programming",
      "Unit 5: IoT Security & Industrial Applications"
    ]
  },
  {
    code: "EC501",
    title: "Digital Signal Processing",
    semester: "Semester 5",
    department: "Electronics & Communication",
    credits: 4,
    category: "Core",
    prerequisites: "EC302 Signals & Systems",
    description: "Discrete Fourier transforms, IIR/FIR filter design algorithms, spectral analysis, and hardware implementation on DSP processors.",
    modules: [
      "Unit 1: Discrete-Time Signals & Z-Transforms",
      "Unit 2: Fast Fourier Transform (FFT) Algorithms",
      "Unit 3: FIR Filter Design (Windowing & Frequency Sampling)",
      "Unit 4: IIR Filter Design (Butterworth & Chebyshev)",
      "Unit 5: Multirate Signal Processing & Applications"
    ]
  },
  {
    code: "ME603",
    title: "Computer Aided Design & Manufacturing",
    semester: "Semester 6",
    department: "Mechanical Engineering",
    credits: 3,
    category: "Core",
    prerequisites: "ME401 Mechanics of Solids",
    description: "3D solid modeling transformation, Finite Element Analysis (FEA) basics, CNC G-code programming, and automated manufacturing systems.",
    modules: [
      "Unit 1: Geometric Modeling Techniques (B-Rep, CSG)",
      "Unit 2: Finite Element Method Foundations",
      "Unit 3: CNC Machine Tool Technology & G-Code Programming",
      "Unit 4: Flexible Manufacturing Systems & Robotics",
      "Unit 5: Rapid Prototyping & 3D Printing Technologies"
    ]
  }
];

export const regulationsData = [
  {
    id: "reg-1",
    clause: "Clause 4.2",
    category: "Attendance",
    title: "Minimum Attendance Requirement for University Exams",
    summary: "Mandatory requirement of 75% aggregate attendance per course to sit for final university examinations.",
    content: "1. A candidate shall be deemed to have completed a semester if he/she secures not less than 75% attendance in aggregate of all courses.\n2. Shortage of attendance between 65% and 74% may be condoned by the Academic Council on valid medical grounds (hospitalization certificate required).\n3. Students with less than 65% attendance shall NOT be permitted to write end-semester examinations and must repeat the semester course when offered next.",
    effectiveYear: "2021–Present"
  },
  {
    id: "reg-2",
    clause: "Clause 5.1",
    category: "Eligibility",
    title: "Promotion & Fast-Track Credit Carryover Eligibility",
    summary: "Criteria required to progress to higher semesters without credit lockouts.",
    content: "1. To be eligible for promotion to Semester 5, a student must have cleared at least 60% of total credits offered in Semesters 1 and 2.\n2. To register for Capstone Project Phase 1 in Semester 7, all core laboratory courses up to Semester 4 must be completed without active backlogs.",
    effectiveYear: "2021–Present"
  },
  {
    id: "reg-3",
    clause: "Clause 6.1",
    category: "Academic Rules",
    title: "Choice Based Credit System (CBCS) & SGPA/CGPA Grading Scale",
    summary: "Letter grading scale from 'O' (Outstanding - 10) to 'F' (Fail - 0) with 10-point cumulative performance tracking.",
    content: "Grades awarded:\n- O (Outstanding): 90-100% | Grade Points: 10\n- A+ (Excellent): 80-89% | Grade Points: 9\n- A (Very Good): 70-79% | Grade Points: 8\n- B+ (Good): 60-69% | Grade Points: 7\n- B (Above Average): 50-59% | Grade Points: 6\n- C (Pass): 45-49% | Grade Points: 5\n- F (Fail): < 45% | Grade Points: 0\n\nA student obtaining Grade 'F' must re-appear for supplementary examinations.",
    effectiveYear: "2021–Present"
  },
  {
    id: "reg-4",
    clause: "Clause 8.4",
    category: "Examination",
    title: "Procedure for Answer Script Re-evaluation & Marks Photocopy",
    summary: "Guidelines for requesting answer sheet photocopies and formal re-assessment within 15 days of result announcement.",
    content: "1. Students dissatisfied with their end-semester marks can apply for a digital copy of their answer script within 7 days of result notification.\n2. Request for formal re-evaluation must be submitted within 15 days along with the prescribed fee (₹500 per paper).\n3. If the variation in marks after re-evaluation exceeds 15% of total marks, the higher mark will be awarded.",
    effectiveYear: "2021–Present"
  },
  {
    id: "reg-5",
    clause: "Clause 11.3",
    category: "Academic Rules",
    title: "Academic Integrity & Anti-Plagiarism Regulations",
    summary: "Zero tolerance policy for examination malpractice and thesis plagiarism exceeding 15%.",
    content: "1. Submission of capstone reports, assignments, or research papers requires an official Turnitin similarity report with < 15% similarity score.\n2. Any form of communication, smart device usage, or copying during examinations results in immediate cancellation of all written exams for that semester.",
    effectiveYear: "2020–Present"
  }
];

export const noticesData = [
  {
    id: "not-1",
    title: "Schedule & Fee Payment Notice for Nov/Dec 2024 End-Semester Exams",
    date: "October 12, 2024",
    category: "Examinations",
    isImportant: true,
    issuedBy: "Office of the Controller of Examinations",
    targetAudience: "All B.Tech & M.Tech Students",
    summary: "End-semester examination registration portal is now open. Last date for fee payment without fine is October 25, 2024.",
    content: "All eligible students are instructed to register for the upcoming End-Semester Theory & Practical Examinations through the ERP portal. Please verify that your internal assessment marks and attendance percentage are correctly updated before generating the hall ticket."
  },
  {
    id: "not-2",
    title: "Smart India Hackathon & AI Innovation Challenge 2024 Team Screening",
    date: "October 08, 2024",
    category: "Academics",
    isImportant: true,
    issuedBy: "Dean of Research & Innovation Cell",
    targetAudience: "CSE, IT & ECE Departments",
    summary: "Call for team registrations for national level hackathon problem statements. Mentorship and seed funding available.",
    content: "Student teams of 6 members (minimum 1 female member mandatory) are invited to submit solution proposals for university internal screening. Selected teams will represent the institute at SIH 2024."
  },
  {
    id: "not-3",
    title: "Mid-Term Performance Review & Parent-Teacher Meeting Announcement",
    date: "September 28, 2024",
    category: "Academics",
    isImportant: false,
    issuedBy: "Academic Affairs Division",
    targetAudience: "Semester 3, 5 & 7 Students",
    summary: "Mid-term performance reports have been released on the portal. Hybrid PTM scheduled for October 18, 2024.",
    content: "Internal Assessment 1 (IA-1) marks and attendance shortage warnings have been dispatched to registered student emails. Students with < 75% attendance must meet their respective Class Advisors."
  },
  {
    id: "not-4",
    title: "Campus High-Speed Wi-Fi Upgrade & Credential Reset Window",
    date: "September 20, 2024",
    category: "Administrative",
    isImportant: false,
    issuedBy: "IT Services Infrastructure Desk",
    targetAudience: "All Campus Residents",
    summary: "Network maintenance scheduled for this weekend. New WPA3 security protocols deployed across campus hostels.",
    content: "High-speed campus network bandwidth has been upgraded to 10 Gbps. Please re-authenticate your devices using your university roll number and updated portal password."
  }
];

export const faqData = [
  {
    id: "faq-1",
    category: "Examinations",
    question: "What happens if I miss an internal assessment test due to illness?",
    answer: "If you miss an Internal Assessment (IA) test owing to valid medical reasons, you must submit a medical certificate approved by the Campus Health Officer to your Head of Department within 3 days. A re-test or makeup assignment will be arranged at the discretion of the department coordinator.",
    tags: ["Internal Exams", "Medical Leave", "Absence"]
  },
  {
    id: "faq-2",
    category: "Academics",
    question: "How do I apply for course credit transfer or NPTEL/SWAYAM electives?",
    answer: "Students in Semesters 5 through 8 can opt for approved 12-week NPTEL/SWAYAM online courses in place of Professional Electives. Submit the course approval form to the Academic Coordinator prior to course registration and submit the final proctored certificate for grade conversion.",
    tags: ["Electives", "NPTEL", "Credit Transfer"]
  },
  {
    id: "faq-3",
    category: "Administrative",
    question: "Where can I request a Bona Fide Certificate or Transcript?",
    answer: "Bona fide certificates for passport, bank loan, or internship purposes can be generated instantly online via the Student Portal under 'Document Requests'. Hard copies with university seal can be collected from Desk 4 at the Administrative Building within 24 hours.",
    tags: ["Certificates", "Bona Fide", "ERP Portal"]
  },
  {
    id: "faq-4",
    category: "Library & Facilities",
    question: "What are the Central Library timings and digital resource access policies?",
    answer: "The Central Library is open Monday to Saturday from 8:00 AM to 10:00 PM. Digital library resources (IEEE Xplore, ScienceDirect, ACM Digital Library) are accessible on and off campus using your university VPN or Shibboleth single sign-on credentials.",
    tags: ["Library", "IEEE", "Research Papers"]
  },
  {
    id: "faq-5",
    category: "Placements",
    question: "What is the minimum CGPA eligibility requirement for campus placement drives?",
    answer: "While individual companies set specific criteria, the general eligibility for Tier 1 campus placements requires a minimum CGPA of 7.0 with no active standing backlogs. Training & Placement Cell conducts specialized aptitude and coding bootcamps starting Semester 6.",
    tags: ["Placements", "CGPA", "Career Cell"]
  }
];
