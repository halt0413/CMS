import type { CmsPage } from "@repo/types";
import { createPageAction, syncPageAction } from "./actions";
import { fetchCmsPages, getCmsApiConfig } from "../../lib/api";

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("ja-JP", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
}

function statusClassName(page: CmsPage): string {
  return page.status === "published" ? "status" : "status status--draft";
}

export default async function DashboardPage() {
  const config = getCmsApiConfig();
  let pages: CmsPage[] = [];
  let error: string | null = null;

  try {
    pages = await fetchCmsPages();
  } catch (caughtError) {
    error = getErrorMessage(caughtError);
  }

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">CMS → API → GitHub</p>
        <h2>Editorial workflow is wired through the API layer.</h2>
        <p>
          CMS submissions are sent server-side to <code>{config.baseUrl}</code>. API auth uses a
          bearer token managed in server env vars, not in the browser.
        </p>
      </section>

      <section className="dashboard-grid">
        <div className="panel">
          <p className="eyebrow">Editor</p>
          <h2>Create page</h2>
          <form action={createPageAction} className="stack">
            <div className="field">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" placeholder="Spring release notes" required />
            </div>

            <div className="field">
              <label htmlFor="slug">Slug</label>
              <input id="slug" name="slug" placeholder="spring-release-notes" required />
            </div>

            <div className="field">
              <label htmlFor="status">Status</label>
              <select id="status" name="status" defaultValue="draft">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="body">Body</label>
              <textarea
                id="body"
                name="body"
                placeholder="Write the content that should go to the API and GitHub."
                required
              />
            </div>

            <div className="actions">
              <button className="button" type="submit">
                Save to API
              </button>
            </div>
          </form>
        </div>

        <div className="stack">
          <section className="panel">
            <p className="eyebrow">Connection</p>
            <h2>Current wiring</h2>
            <p className="notice">
              API base URL: <code>{config.baseUrl}</code>
            </p>
            <p className="notice">
              API token source: <code>CMS_API_TOKEN</code> or <code>ADMIN_API_TOKEN</code>
            </p>
            <p className="notice">
              GitHub sync requires <code>GITHUB_TOKEN</code>, <code>GITHUB_OWNER</code> and{" "}
              <code>GITHUB_REPO</code> on the API side.
            </p>
          </section>

          <section className="panel">
            <p className="eyebrow">Library</p>
            <h2>Pages in API memory store</h2>
            {error ? (
              <p>{error}</p>
            ) : pages.length === 0 ? (
              <p className="empty">No pages yet.</p>
            ) : (
              <div className="cards">
                {pages.map((page) => (
                  <article className="card" key={page.id}>
                    <div className="card__top">
                      <div>
                        <h3>{page.title}</h3>
                        <p>{page.slug}</p>
                      </div>
                      <span className={statusClassName(page)}>{page.status}</span>
                    </div>
                    <p>{page.body}</p>
                    <div className="meta">
                      <span>Updated {formatDate(page.updatedAt)}</span>
                      {"publishedAt" in page ? <span>Published {formatDate(page.publishedAt)}</span> : null}
                    </div>
                    <form action={syncPageAction} className="actions">
                      <input name="id" type="hidden" value={page.id} />
                      <button className="button" type="submit">
                        Sync to GitHub
                      </button>
                    </form>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
