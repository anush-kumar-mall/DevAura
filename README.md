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

👉 [**View DevAura HLD on draw.io**](https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&target=blank&highlight=0000ff&edit=_blank&layers=1&nav=1&dark=1#R%3Cmxfile%3E%3Cdiagram%20name%3D%22Page-1%22%20id%3D%22qGfXf11IDUfxluAVkWh4%22%3E7Vtbd9o4EP41PLLHd5xHwNmmPZvTNiRNsy97hC3Ap8ZiZZnA%2FvodXWxjYRJooKQ%2BvCTSWBppRt98utKxh%2FPVB4oWs1sS4aRjGdGqYwcdy7JNx4F%2FXLKWEsu1fCmZ0jiSMrMSjOL%2FsBIaSprHEc5qBRkhCYsXdWFI0hSHrCZDlJLnerEJSeqtLtAUbwlGIUq2pY9xxGZS6rtGJb%2FB8XRWtGwa6sscFYWVIJuhiDxviOzrjj2khDCZmq%2BGOOHeK%2Fwi6%2F2542vZMYpTtk%2BFEfWzb%2B6Xr%2B739O9%2F%2BtbT6OHpqVu4eYmSXFncsbwEFA4WvM9srRzh%2FZvzjg7miE7jtGP3jcWqzHYZWYDIESKGV6yLknjKS4XQOUxBWmmA1FT9F%2B2MdcGEgEFNbfMP3UxApA8FzJ5ob1tzPwfXW8YI02Uc4kIteEZqrrcG4q0egGyhy2aU96nAZ9Gkudl6Q5fHhEaYdtWHfkYSPhwveOMQryd4wkq371b5Zn92uTP5eFrGA%2B8fx1gp%2BQh%2FPDSH8R%2Bk42whq%2Bn5VwZgy9nv1QufHu8r%2B3GWxYS74BalQANzLGzb31Sr1h1riSmLgXj6MnQCEVMDFUiBtHJAoNQkETQyiSG8AZdsDv8CE5LPs5jh0QKFXOMzEHLZDNeNVzuJwyzpCIgckzlmdA1FVIWe6coqisOdgtGeK0K0PFVmVidDRcSKhKel7oqnIKGo6hDaslpIW3eEzC%2B0ddyAHVKMGC5j9hOJecBKT7eGlfpARNPKLuNj0GIKvqco%2FMGNDlm85CP7kGGatcjAb0BCkQStnG7iCadrSpawEo7aOcPYRm2G8dyGGcYxGmYY52QzjN3CGeZDjjOu4Qvfm7x1fvldwOWadXD5zja4TK8BXLZ7Kmw5LcTWHUbc8Pt4zplrSJIEwSoCMbVEJlGeXNY0R5kgHvF4RMIfmJXLGpDc3Q9bNAcOKEFRiARZXS8BzlmLVzQ3KI0SGTRpmFPgtXDdzmne6%2F1R30peeXty8dXJ5nn37Fz8ZhANScThcx3FjNADyPZCrPVA5FNYlxUTmPDpaJ2GLaKa4V1QHWB95skxyg7cVLxvC%2Fs5I90MLas9%2F02cQVi0k1Fto762NS3H3d452U07J%2BtkjNo7O6Mef3W7sZ4V0Hrk4zkmiO4RO5c17R7XCzO0wLDIG%2FIQltd2In0PI98idrrNExZ3xZ0jkDFKl6hNJ1fDu4eAzysLLPd978S2MW0H2fcsS1s%2Bm1bDWYblNl3F2Ceje7%2BNdD9D1e66%2F%2FFygHGydfYtzjIEHZi%2BD644zhqUA%2BZrjkXwit19u%2BwbQlkRos%2FAXcre92BcW4jeNP19lvXuL13WF4prPK95FKeRWLxBLkxQlsVh3V%2BU5Cm%2Fw7IDA3J4FbPvPA2zmsw9qXI8Haw2igXrIpOCLRuVePZp81tVTeSKehHKZqJhrj5jlPwon3M55aDhaOstmDZkYC3JaYhfmg%2BVnxhAF7OXClrNINgY4qYRLmQUJ3Izstm7plFXLXwhsQh9hTG%2Fp1256cCRhqpam8%2FKNEVXVl2R29MUSUdsKRIgLM1%2BAy7NX4NLY09c1lBZgXQHLk8LRfu3gKLn1BHk68%2BG9oWid1VX1PP2gyJgA603ii14gWx3h129nfrLS0hIjcfFedOTp9%2BGf0%2BLc2tfnDtnpVxtVvf1S429KVd7LuHrryBOTbneBYqvXO2%2FDkX3rFDUEFQ9Wz8Ui66na9JRfSTS9R2%2Fucu7euZoz1b1Ciei6abT77fFxk%2Fi%2FGdi6p3Ehn%2FW2LCOFRumcfWaqnMFh2kbZ4mOpsPCS3QcFh29dswc%2BirGNPfcOR47OE4E9asGqB92CGe5Ow68bmBY4ftfeCl%2Bbhdg9f7780Tklv2cIkh13AESIy5e5qkD17C8yRRvRZbynQOWb0fcYOdJnhal%2FADw9cMwGTFDkoBuO0hJirmVcZJoouLQrTzs18%2Fm5nHE30jp0a9c%2FJbDNs%2FRHyWZ5RHGRkg5RkNM%2FcwPXCBb%2FeZPgq366aR9%2FT8%3D%3C%2Fdiagram%3E%3C%2Fmxfile%3E)

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
