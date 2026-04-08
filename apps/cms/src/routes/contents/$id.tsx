import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { getContent } from "./api";
import { ContentDetailPage } from "./components/detail/ContentDetailPage/ContentDetailPage";

export function ContentDetailRoute() {
  const { id } = useParams({ from: "/contents/$id" });
  const { data: content = null, isPending } = useQuery({
    queryFn: () => getContent(id),
    queryKey: ["contents", id]
  });

  if (isPending) {
    return <p>読み込み中...</p>;
  }

  return <ContentDetailPage content={content} />;
}
