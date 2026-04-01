export function createPreviewPaths() {
  return {
    "/preview/{slug}": {
      get: {
        summary: "Preview content by slug",
        security: [{ bearerAuth: [] }, { sessionCookieAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "slug",
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
