export function createContentsPaths() {
  return {
    "/contents": {
      get: {
        summary: "List contents",
        responses: {
          "200": {
            description: "Contents list",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CmsPageListResponse" }
              }
            }
          }
        }
      },
      post: {
        summary: "Create content",
        security: [{ bearerAuth: [] }, { sessionCookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CmsPageInput" }
            }
          }
        },
        responses: {
          "201": {
            description: "Created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CmsPageCreateResponse" }
              }
            }
          }
        }
      }
    },
    "/contents/{id}": {
      get: {
        summary: "Get content",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": {
            description: "Content detail",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CmsPageItemResponse" }
              }
            }
          }
        }
      },
      patch: {
        summary: "Update content",
        security: [{ bearerAuth: [] }, { sessionCookieAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CmsPagePatch" }
            }
          }
        },
        responses: {
          "200": {
            description: "Updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CmsPageUpdateResponse" }
              }
            }
          }
        }
      },
      delete: {
        summary: "Delete content",
        security: [{ bearerAuth: [] }, { sessionCookieAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": {
            description: "Deleted",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CmsPageDeleteResponse" }
              }
            }
          }
        }
      }
    },
    "/contents/{id}/preview": {
      get: {
        summary: "Preview content by id",
        security: [{ bearerAuth: [] }, { sessionCookieAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": {
            description: "Preview",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CmsPreviewResponse" }
              }
            }
          }
        }
      }
    }
  } as const;
}
