import { EditContentContainer } from "../../../../features/content/editor/components/EditContentContainer/EditContentContainer";

type EditContentRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditContentRoute({
  params
}: EditContentRouteProps) {
  const { id } = await params;

  return <EditContentContainer id={id} />;
}
