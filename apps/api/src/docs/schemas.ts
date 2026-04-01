export function createSecuritySchemes(sessionCookieName: string) {
  return {
    bearerAuth: {
      type: "http",
      scheme: "bearer"
    },
    sessionCookieAuth: {
      type: "apiKey",
      in: "cookie",
      name: sessionCookieName
    }
  } as const;
}

export const openApiSchemas = {
  ErrorResponse: {
    type: "object",
    properties: {
      error: { type: "string" }
    },
    required: ["error"]
  },
  HealthResponse: {
    type: "object",
    properties: {
      name: { type: "string", example: "cms-api" },
      status: { type: "string", example: "ok" }
    },
    required: ["name", "status"]
  },
  AuthUser: {
    type: "object",
    properties: {
      id: { type: "integer" },
      login: { type: "string" },
      name: { type: "string", nullable: true },
      email: { type: "string", nullable: true },
      avatarUrl: { type: "string" },
      profileUrl: { type: "string" }
    },
    required: ["id", "login", "name", "email", "avatarUrl", "profileUrl"]
  },
  MeResponse: {
    type: "object",
    properties: {
      user: { $ref: "#/components/schemas/AuthUser" }
    },
    required: ["user"]
  },
  LogoutResponse: {
    type: "object",
    properties: {
      loggedOut: { type: "boolean", enum: [true] }
    },
    required: ["loggedOut"]
  },
  CmsPageInput: {
    type: "object",
    properties: {
      slug: { type: "string" },
      title: { type: "string" },
      body: { type: "string" },
      status: { type: "string", enum: ["draft", "published"] }
    },
    required: ["slug", "title", "body", "status"]
  },
  CmsPagePatch: {
    type: "object",
    properties: {
      slug: { type: "string" },
      title: { type: "string" },
      body: { type: "string" },
      status: { type: "string", enum: ["draft", "published"] }
    }
  },
  CmsPage: {
    type: "object",
    properties: {
      id: { type: "string" },
      slug: { type: "string" },
      title: { type: "string" },
      body: { type: "string" },
      status: { type: "string", enum: ["draft", "published"] },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
      publishedAt: { type: "string", format: "date-time", nullable: true }
    },
    required: ["id", "slug", "title", "body", "status", "createdAt", "updatedAt"]
  },
  PublicContent: {
    type: "object",
    properties: {
      slug: { type: "string" },
      title: { type: "string" },
      body: { type: "string" }
    },
    required: ["slug", "title", "body"]
  },
  CmsPreviewResponse: {
    type: "object",
    properties: {
      slug: { type: "string" },
      status: { type: "string", enum: ["preview"] },
      content: { $ref: "#/components/schemas/PublicContent" }
    },
    required: ["slug", "status", "content"]
  },
  CmsPageListResponse: {
    type: "object",
    properties: {
      items: {
        type: "array",
        items: { $ref: "#/components/schemas/CmsPage" }
      },
      total: { type: "integer" }
    },
    required: ["items", "total"]
  },
  CmsPageItemResponse: {
    type: "object",
    properties: {
      item: { $ref: "#/components/schemas/CmsPage" }
    },
    required: ["item"]
  },
  CmsPageCreateResponse: {
    type: "object",
    properties: {
      created: { $ref: "#/components/schemas/CmsPage" }
    },
    required: ["created"]
  },
  CmsPageUpdateResponse: {
    type: "object",
    properties: {
      updated: { $ref: "#/components/schemas/CmsPage" }
    },
    required: ["updated"]
  },
  CmsPageDeleteResponse: {
    type: "object",
    properties: {
      deleted: { type: "boolean", enum: [true] },
      id: { type: "string" }
    },
    required: ["deleted", "id"]
  },
  GitHubIssue: {
    type: "object",
    properties: {
      id: { type: "integer" },
      number: { type: "integer" },
      title: { type: "string" },
      body: { type: "string", nullable: true },
      url: { type: "string" },
      state: { type: "string", enum: ["open", "closed"] },
      labels: {
        type: "array",
        items: { type: "string" }
      }
    },
    required: ["id", "number", "title", "body", "url", "state", "labels"]
  },
  GitHubIssueInput: {
    type: "object",
    properties: {
      title: { type: "string" },
      body: { type: "string" },
      labels: {
        type: "array",
        items: { type: "string" }
      }
    },
    required: ["title", "body"]
  },
  GitHubIssueUpdateRequest: {
    type: "object",
    properties: {
      title: { type: "string" },
      body: { type: "string" },
      state: { type: "string", enum: ["open", "closed"] }
    }
  },
  IssueLabelsUpdateRequest: {
    type: "object",
    properties: {
      labels: {
        type: "array",
        items: { type: "string" }
      }
    },
    required: ["labels"]
  },
  IssuesListResponse: {
    type: "object",
    properties: {
      items: {
        type: "array",
        items: { $ref: "#/components/schemas/GitHubIssue" }
      },
      total: { type: "integer" }
    },
    required: ["items", "total"]
  },
  IssueItemResponse: {
    type: "object",
    properties: {
      item: { $ref: "#/components/schemas/GitHubIssue" }
    },
    required: ["item"]
  },
  IssueCreateResponse: {
    type: "object",
    properties: {
      created: { $ref: "#/components/schemas/GitHubIssue" }
    },
    required: ["created"]
  },
  IssueUpdateResponse: {
    type: "object",
    properties: {
      updated: { $ref: "#/components/schemas/GitHubIssue" }
    },
    required: ["updated"]
  },
  IssueLabelsResponse: {
    type: "object",
    properties: {
      updated: { $ref: "#/components/schemas/GitHubIssue" }
    },
    required: ["updated"]
  },
  WebhookResponse: {
    type: "object",
    properties: {
      received: { type: "boolean", enum: [true] },
      payload: {}
    },
    required: ["received", "payload"]
  }
} as const;
