import { ContentDetailContainer } from "../../../features/content/detail/components/ContentDetailContainer/ContentDetailContainer";

type ContentDetailRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ContentDetailRoute({
  params
}: ContentDetailRouteProps) {
  const { id } = await params;

  return <ContentDetailContainer id={id} />;
}
