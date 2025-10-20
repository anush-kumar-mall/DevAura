# 🌐 DevAura — Real-Time Collaborative Code Environment

DevAura is a real-time collaborative coding platform that lets multiple users **code, chat, draw, and run terminals together** — all inside one shared workspace.  
Think of it as a browser-based VS Code that supports **multi-user live coding**, **AI assistance**, **real-time chat**, **shared terminal**, and **whiteboard collaboration**.

---

## 🚀 Features

### 🧑‍💻 1. Real-Time Code Collaboration
- Multiple users can edit the same code file at once.  
- Changes sync instantly for all participants.  
- Syntax highlighting and theming similar to VS Code.  

### 💬 2. Real-Time Chat
- Integrated chat area for instant communication.  
- Each message includes username and timestamp.  
- Live updates across all active users in the room.  

### ⚡ 3. Shared Terminal
- Real-time collaborative terminal visible to all room members.  
- Run basic commands or simulated outputs.  
- Sandboxed for safety — isolated per room session.  

### 🧾 4. File Explorer
- VS Code–like sidebar with file and folder structure.  
- Create, rename, or delete files/folders.  
- Instant updates across all connected users.  

### 🎨 5. Collaborative Whiteboard
- Draw, sketch, and brainstorm visually.  
- Supports rectangles, arrows, text boxes, and erasers.  
- Multiple whiteboard pages can be created per room.  

### 🧠 6. AI Assistant
- Built-in AI assistant for on-the-fly help.  
- Can explain code, fix bugs, or generate snippets.  
- Powered by OpenAI API (or a custom LLM).  

### 👥 7. Room Management
- Users can **create** or **join** rooms with a unique ID.  
- Only username required — no forced authentication.  
- Displays list of active users in the room sidebar.  

### 🔐 8. Optional Sign-Up & Sign-In
- Authentication is **optional**.  
- Guests can join instantly using a username.  
- Registered users can save preferences, avatars, and history.  

---

## 🏗️ High-Level Architecture

👉 [**View DevAura HLD on draw.io**](https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&target=blank&highlight=0000ff&edit=_blank&layers=1&nav=1&dark=1#R%3Cmxfile%3E%3Cdiagram%20name%3D%22Page-1%22%20id%3D%22qGfXf11IDUfxluAVkWh4%22%3E7VvbcuI4EP0aHtnyHfIIODvJ1KZmJiSTyb5sCVuAKsZiZZnAfv22ZNnGwiSQwJC4eAGpLbXUrdNHF8stezBbfmFoPr2hIY5alhEuW7bfsizTcLrwJySrTNJ17EwwYSRUhUrBkPyH85pKmpIQJ5WCnNKIk3lVGNA4xgGvyBBj9LlabEyjaqtzNMEbgmGAok3pAwn5VFnhGqX8CpPJNG%2FZNNSTGcoLK0EyRSF9XhPZly17wCjlWWq2HOBIOC%2F3S1bvzy1Pi44xHPNdKgxZN%2Fnpfv%2Fh%2For%2F%2FqdnPQ7vHx%2FbuZsXKEqVxS3Li0Bhfy76zFfKEd6%2Fqehof4bYhMQtu2fMl0W2zekcRI4UcbzkbRSRiSgVQOcwA2mpAVIT9S%2FbGemCMQWD6toWD9qJhEgPCpgd2d6m5l4KrreMIWYLEuBcLXgm01xtDcQbPQDZXJdNmehTjs%2B8SXO99ZoujygLMWurB72ERmI4XvDGPl6P8JgXbt%2Bu8t3%2BbAtnivG0jHvRP4GxQnINPx6awfj341Eyz6rp%2BVcGYMPZH9ULXx%2FuSvtxkhAqXHCDYqCBGZa27W6qVemOtcCMEyCeXhY6voypvgokP7OyT6HUOJI0MiYQ3oBLPoM%2F34Tk85RwPJyjQGh8Bj4umhG68XIrcZgFHQGPYzrDnK2giKrQMd2siqJwJ2e055IQLU%2BVmVbJUBGxIuFJobvkKUgoqtqHtqwG0tYtpbMzbR02YAcMI46LmP1KiQjYzNONYaUeENGktMu49htMwXcMBU%2FC6ICThRjZ%2BwSzpEEG%2FgQSCjPQZtMNGQu6ZnQBK%2BGwmTOMbVRmGM%2BtmWEco2aGcY42w9gNnGG%2BpDgRGr6Lvcl755fPAi7XrIKr62yCy%2FRqwGW7x8KW00Bs3WIkDL8jM8FcAxpFCFYRiKslMg3T6LymOcgE8YBHQxo8YV4sa0Byezdo0BzYZxSFAZJkdbkAOCcNXtFcoTiMsqCJg5QBrwWrZk7zXueP6lbywtuRiy%2BONs%2B7J%2Bfid4NoQEMBn8uQcMr2INszsVYDUUxhbZ5PYNKnw1UcNIhqBrd%2BeYD1TSRHKNlzU%2FGxLeylnLYTtCj3%2FFckgbBoJqPaRnVta1qOu7lzsut2TtbRGLVzckY9%2FOp2bT0rofUgxnNEEdshds5r2h1eL0zRHMMibyBCOHttJ9N3MPINYqebNOKkLd85AhmjeIGadHI1uL33xbwyx9m%2B74PYNmLNIPuOZWnLZ9OqOcuw3LpXMfbR6L7bRLqfonJ33bs%2BH2AcbZ19g5MEQQcmH4MrDrMGFYD5kWIZvHJ33yz7BlBWhugzcJey9yMY1xSiN83uLst697cu63PFFZ7XPIrjUC7eIBdEKElIUPUXo2ks3mHZvgE5vCT8l0jDrJblHlU5kfaXa8X8VZ6JwZa1SiL7uP6srCZzeb0QJVPZsFCfcEafiutcTjFoONy4C6YNGVhLUxbgl%2BZD5ScO0MX8pYJWPQjWhrhuhHMZw1G2GVnvXd2oqxa%2BUyJDX2Gs29FeuenAyQxVtdavlWmKLqyqIrejKcocsaFIgrAw%2Bx24NH8PLo0dcVlBZQnSLbg8LhTtTwFFz6kiqKtfG9oVit5FVVHH2w2KgA20Wis2FwWS7R129XaqNy8hkWk8LM7rrjx9Gv49Ls6tXXHunJRytVm9q7%2FU2JlytesSXf0WxLEp1ztD8ZVX%2B69D0T0pFDUEldfW98Wi6%2BmadFQfiHS7%2BZcEepe39czRrq3qFY5E03Wn3%2B%2BLjTfi%2FC0x9UFio3vS2LAOFRumcfGaqlMFh2kbJ4mOusPCc3TsFx2dZswc%2BirGNHfcOR46OI4E9YsaqO93CGe5Ww68rmBY4flfeCG%2FtvOxuv%2F9bSxzi17KEKRabh%2FJEZc389SBa1C8yZR3RRbZPQec3R1x%2Fa0neVqUigPA1w%2FDsogZ0Ah0235MYyysJFGkifJDt%2BKwXz%2Bbm5FQ3JHSo1%2B5%2BD2HbZ6jX0oyiyOMtZByjJqYessHLpAtv%2FnLwFZ%2BOWlf%2Fg8%3D%3C%2Fdiagram%3E%3C%2Fmxfile%3E)

---

## 🧩 Tech Stack

| Layer | Technologies Used |
|-------|--------------------|
| **Frontend** | React.js, Tailwind CSS, Socket.io-client, CodeMirror/Monaco Editor |
| **Backend** | Node.js, Express.js, Socket.io, REST APIs |
| **Database** | MongoDB (Mongoose) |
| **Auth** | JWT, bcrypt |
| **Real-Time Communication** | WebSockets via Socket.io |
| **AI Assistant** | OpenAI API or Custom LLM |
| **Deployment** | Docker, Render / Heroku / Netlify |

---

## 🧠 Future Enhancements

- Integrate video/audio call  
- GitHub repository sync  
- Code versioning and replay feature  
- AI-based debugging and test generation  
- Voice-based AI commands  

---

## 👨‍💻 Author

**Anush Kumar Mall**  
CSE Student | Full Stack Developer | Builder at Heart  

- [**GitHub**](https://github.com/anush-kumar-mall)  
- [**LinkedIn**](https://www.linkedin.com/in/anush-kumar-mall?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)

---

## 📜 License

This project is open-source under the **MIT License**.
