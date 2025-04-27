import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import App from "./App";
import "./index.css";

// Проверка, находимся ли мы на GitHub Pages
const isGitHubPages = window.location.hostname.includes('github.io');

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    {/* Рендерим Analytics только если мы не на GitHub Pages */}
    {!isGitHubPages && <Analytics />}
  </>
);
