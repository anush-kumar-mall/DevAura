import express, { Request, Response } from "express";

const app = express();
const PORT = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running — DevAura API 🚀");
});

app.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});
