export function createGitHubPaths() {
  return {
    "/internal/github/issues": {
      get: {
        summary: "List GitHub issues",
        security: [{ bearerAuth: [] }, { sessionCookieAuth: [] }],
        responses: {
          "200": {
            description: "Issues list",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/IssuesListResponse" }
              }
            }
          }
        }
      },
      post: {
        summary: "Create GitHub issue",
        security: [{ bearerAuth: [] }, { sessionCookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/GitHubIssueInput" }
            }
          }
        },
        responses: {
          "201": {
            description: "Created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/IssueCreateResponse" }
              }
            }
          }
        }
      }
    },
    "/internal/github/issues/{issueNumber}": {
      get: {
        summary: "Get GitHub issue",
        security: [{ bearerAuth: [] }, { sessionCookieAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "issueNumber",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          "200": {
            description: "Issue detail",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/IssueItemResponse" }
              }
            }
          }
        }
      },
      patch: {
        summary: "Update GitHub issue",
        security: [{ bearerAuth: [] }, { sessionCookieAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "issueNumber",
            required: true,
            schema: { type: "integer" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/GitHubIssueUpdateRequest" }
            }
          }
        },
        responses: {
          "200": {
            description: "Updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/IssueUpdateResponse" }
              }
            }
          }
        }
      }
    },
    "/internal/github/issues/{issueNumber}/labels": {
      post: {
        summary: "Replace GitHub issue labels",
        security: [{ bearerAuth: [] }, { sessionCookieAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "issueNumber",
            required: true,
            schema: { type: "integer" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/IssueLabelsUpdateRequest"
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Updated labels",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/IssueLabelsResponse" }
              }
            }
          }
        }
      }
    }
  } as const;
}
