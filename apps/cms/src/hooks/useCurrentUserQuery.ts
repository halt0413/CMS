import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/auth/getCurrentUser";

export function useCurrentUserQuery() {
  return useQuery({
    queryFn: getCurrentUser,
    queryKey: ["currentUser"]
  });
}
