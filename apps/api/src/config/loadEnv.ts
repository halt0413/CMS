import { loadEnvFile } from "node:process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export function loadRootEnv() {
  const rootEnvPath = resolve(
    dirname(fileURLToPath(import.meta.url)),
    "../../../../.env"
  );

  loadEnvFile(rootEnvPath);
}
