import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { getContent } from "./api";
import { EditContentPage } from "./components/editor/EditContentPage/EditContentPage";
import { useUpdateContentMutation } from "./hooks/useUpdateContentMutation";

export function EditContentRoute() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/contents/$id/edit" });
  const { data: content = null, isPending } = useQuery({
    queryFn: () => getContent(id),
    queryKey: ["contents", id]
  });
  const updateMutation = useUpdateContentMutation(id);

  if (isPending) {
    return <p>読み込み中...</p>;
  }

  return (
    <EditContentPage
      content={content}
      isSubmitting={updateMutation.isPending}
      onSubmit={async (payload) => {
        const updated = await updateMutation.mutateAsync(payload);
        await navigate({ to: "/contents/$id", params: { id: updated.id } });
      }}
    />
  );
}
