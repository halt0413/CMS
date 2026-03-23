import { Hono } from "hono";

type Issue = {
  id: number;
  title: string;
  body: string;
};

const issues = new Hono();

issues.get("/", (c) => {
  const sample: Issue[] = [
    { id: 1, title: "Sample issue", body: "This is a sample issue." }
  ];

  return c.json({ items: sample });
});

issues.post("/", async (c) => {
  const payload = await c.req.json<Partial<Issue>>();

  return c.json(
    {
      created: {
        id: Date.now(),
        title: payload.title ?? "Untitled",
        body: payload.body ?? ""
      }
    },
    201
  );
});

export { issues };
