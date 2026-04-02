import { EditContentPage } from "../../../../../features/content/components/EditContentPage";

type EditContentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditContentRoute({
  params
}: EditContentPageProps) {
  const { id } = await params;

  return <EditContentPage id={id} />;
}
