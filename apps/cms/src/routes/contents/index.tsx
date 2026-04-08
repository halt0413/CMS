import { useQuery } from "@tanstack/react-query";
import { listContents } from "./api";
import { ContentsPage } from "./components/list/ContentsPage/ContentsPage";

export function ContentsRoute() {
  const { data = [] } = useQuery({
    queryFn: listContents,
    queryKey: ["contents"]
  });

  return <ContentsPage contents={data} />;
}
