import { serve } from "@hono/node-server";
import { createApiApp } from "../src/app/createDependencies";
import { getApiEnv } from "../src/config/env";
import { loadRootEnv } from "../src/config/loadEnv";

loadRootEnv();

const env = getApiEnv();
const app = createApiApp(env, {
  createId: () => crypto.randomUUID(),
  getNow: () => new Date().toISOString()
});

serve({
  fetch: app.fetch,
  port: env.port
});

console.log(`API is running on ${env.apiUrl}`);
