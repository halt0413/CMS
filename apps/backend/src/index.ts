import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { auth } from "./middleware/auth";
import { issues } from "./routes/issues";
import { preview } from "./routes/preview";
import { webhook } from "./routes/webhook";

const app = new Hono();

app.get("/", (c) => c.text("Hello World"));

app.use("/issues/*", auth);
app.use("/preview/*", auth);

app.route("/issues", issues);
app.route("/preview", preview);
app.route("/webhook", webhook);

const port = Number(process.env.PORT ?? 8787);

serve({
  fetch: app.fetch,
  port
});

console.log(`Backend is running on http://localhost:${port}`);
