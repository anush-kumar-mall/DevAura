import { spawn } from "child_process";
import open from "open";

const port = 3000;

// Start Next.js dev server
const dev = spawn("npm", ["run", "next:dev"], { stdio: "inherit", shell: true });

// Once the server starts, open browser after a small delay
setTimeout(() => {
  open(`http://localhost:${port}`);
}, 3000);
