export function createAuthPaths() {
  return {
    "/auth/github/login": {
      get: {
        summary: "Start GitHub OAuth login",
        parameters: [
          {
            in: "query",
            name: "redirectTo",
            schema: { type: "string" }
          }
        ],
        responses: {
          "302": {
            description: "Redirect to GitHub OAuth"
          }
        }
      }
    },
    "/auth/github/callback": {
      get: {
        summary: "Complete GitHub OAuth login",
        parameters: [
          {
            in: "query",
            name: "code",
            required: true,
            schema: { type: "string" }
          },
          {
            in: "query",
            name: "state",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "302": {
            description: "Redirect to CMS after login"
          }
        }
      }
    },
    "/auth/logout": {
      post: {
        summary: "Logout",
        responses: {
          "200": {
            description: "Logged out",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LogoutResponse" }
              }
            }
          }
        }
      }
    }
  } as const;
}
