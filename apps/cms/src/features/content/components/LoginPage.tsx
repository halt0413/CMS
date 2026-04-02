import { getApiConfig } from "../api/getApiConfig";

export function LoginPage() {
  const config = getApiConfig();

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Config</p>
        <h2>Server-side credentials</h2>
        <p>
          The CMS keeps API credentials on the server. Browser code never receives the bearer token.
        </p>
      </section>

      <section className="panel stack">
        <p className="notice">
          API base URL: <code>{config.baseUrl}</code>
        </p>
        <p className="notice">
          API token env: <code>CMS_API_TOKEN</code> or <code>ADMIN_API_TOKEN</code>
        </p>
      </section>
    </main>
  );
}
