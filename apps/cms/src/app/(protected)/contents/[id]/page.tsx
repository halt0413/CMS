import { notFound } from "next/navigation";
import { ContentDetailPage } from "../../../../features/content/components/ContentDetailPage";
import { getMockContentById } from "../../../../features/content/const/mockContents";

type ContentDetailRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ContentDetailRoute({
  params
}: ContentDetailRouteProps) {
  const { id } = await params;
  const content = getMockContentById(id);

  if (!content) {
    notFound();
  }

  return <ContentDetailPage content={content} />;
}
