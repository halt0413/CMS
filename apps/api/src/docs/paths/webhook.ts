export function createGitHubWebhookPaths() {
  return {
    "/webhooks/github": {
      post: {
        summary: "Receive GitHub webhook",
        parameters: [
          {
            in: "header",
            name: "X-Hub-Signature-256",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": {
            description: "Webhook received",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/WebhookResponse" }
              }
            }
          }
        }
      }
    }
  } as const;
}
