import type { CmsPageUpdateRequest } from "@repo/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ContentItem } from "../api/contentItem";
import { updateContent } from "../api/updateContent";

export function useUpdateContentMutation(id: string) {
  const queryClient = useQueryClient();

  return useMutation<ContentItem, Error, CmsPageUpdateRequest>({
    mutationFn: (payload: CmsPageUpdateRequest) => updateContent(id, payload),
    onSuccess: async (updated) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["contents"] }),
        queryClient.invalidateQueries({ queryKey: ["contents", id] }),
        queryClient.invalidateQueries({ queryKey: ["contents", updated.id] })
      ]);
    }
  });
}
