import { useParams } from "@tanstack/react-router";
import { LoadingMessage } from "../../components/feedback/LoadingMessage/LoadingMessage";
import { useContentQuery } from "../../features/contents/hooks/useContentQuery";
import { ContentDetailPage } from "../../features/contents/ui/detail/cards/ContentDetailPage/ContentDetailPage";

export function ContentDetailRoute() {
  const { id } = useParams({ from: "/contents/$id" });
  const { data: content = null, isPending } = useContentQuery(id);

  if (isPending) {
    return <LoadingMessage />;
  }

  return <ContentDetailPage content={content} />;
}
