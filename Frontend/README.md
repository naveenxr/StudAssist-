# Student Support Assistant (`Frontend`)

An AI-powered college Student Support Assistant dashboard built with **React**, **Vite**, **Tailwind CSS**, **Lucide React**, and **React Router DOM**.

---

## 🚀 Features

- 💬 **AI-Powered Chat Assistant**: Interactive messaging state with simulated AI reasoning, temporary typing indicators, and verified college source document citations.
- 📚 **Syllabus Explorer**: Complete course listings, module breakdowns, credit distribution, and prerequisites for Semester 7 CSE.
- 🛡️ **Academic Regulations**: Searchable governing clauses (Attendance rules, CBCS Grading scale, Condonation fee policies, Academic Integrity).
- 📢 **College Notices & Circulars**: Real-time bulletins for end-semester exams, hackathons, mid-term reviews, and Wi-Fi upgrades.
- ❓ **FAQ Knowledge Base**: Categorized Q&A directory covering internal exams, bona fide certificates, library rules, and placement requirements.
- 📱 **Modern SaaS Dashboard**: Clean, responsive layout with fixed desktop sidebar and mobile overlay drawer.
- ⚡ **Backend Ready**: Decoupled `chatService.js` abstraction layer for effortless connection to an Express.js / Node.js backend.

---

## 🛠️ Project Structure

```text
Frontend/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── index.css
    ├── main.jsx
    ├── App.jsx
    ├── components/
    │   ├── Sidebar.jsx             # Left sidebar navigation & recent conversations
    │   ├── ChatHeader.jsx          # Top chat header with AI status badge & reset
    │   ├── ChatWindow.jsx          # Message thread scroll container & typing indicator
    │   ├── MessageBubble.jsx       # User/Assistant bubbles with source documents
    │   ├── SuggestedQuestions.jsx  # Interactive suggested question cards
    │   ├── ChatInput.jsx           # Textarea input with send button & placeholders
    │   ├── SourceCard.jsx          # Cited document card with category badge
    │   ├── RecentChats.jsx         # Sidebar recent chat history item list
    │   └── EmptyState.jsx          # New chat welcome screen with prompt shortcuts
    ├── pages/
    │   ├── ChatPage.jsx            # Main AI Chat Assistant page (Route: /)
    │   ├── SyllabusPage.jsx        # Course curriculum directory (Route: /syllabus)
    │   ├── RegulationsPage.jsx     # Official regulations clauses (Route: /regulations)
    │   ├── NoticesPage.jsx         # Administrative notices (Route: /notices)
    │   └── FAQPage.jsx             # Categorized FAQs (Route: /faqs)
    ├── services/
    │   └── chatService.js          # Async AI response engine (Ready for Express fetch)
    └── data/
        └── mockData.js             # Syllabus, regulations, notices, FAQs & conversations
```

---

## 🏁 How to Run the Project

1. Navigate into the Frontend folder:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.
