import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { getContent } from "./api";
import { EditContentPage } from "./components/editor/EditContentPage/EditContentPage";

export function EditContentRoute() {
  const { id } = useParams({ from: "/contents/$id/edit" });
  const { data: content = null, isPending } = useQuery({
    queryFn: () => getContent(id),
    queryKey: ["contents", id]
  });

  if (isPending) {
    return <p>読み込み中...</p>;
  }

  return <EditContentPage content={content} />;
}
