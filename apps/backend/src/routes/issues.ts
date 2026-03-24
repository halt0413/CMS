import { Hono } from "hono";
import type {
  ApiIssue,
  IssueCreateRequest,
  IssueCreateResponse,
  IssuesListResponse
} from "@repo/types";

const issues = new Hono();

issues.get("/", (c) => {
  const sample: ApiIssue[] = [
    { id: 1, title: "Sample issue", body: "This is a sample issue." }
  ];

  const response: IssuesListResponse = { items: sample };

  return c.json(response);
});

issues.post("/", async (c) => {
  const payload = await c.req.json<IssueCreateRequest>();

  const response: IssueCreateResponse = {
    created: {
      id: Date.now(),
      title: payload.title ?? "Untitled",
      body: payload.body ?? ""
    }
  };

  return c.json(response, 201);
});

export { issues };
