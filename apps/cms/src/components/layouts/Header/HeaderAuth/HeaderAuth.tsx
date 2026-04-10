import { getLoginHref } from "../../../../api/auth/getLoginHref";
import { useCurrentUserQuery } from "../../../../hooks/useCurrentUserQuery";
import { HeaderAuthView } from "./HeaderAuthView";

export function HeaderAuth() {
  const { data: currentUser, isPending } = useCurrentUserQuery();
  const loginHref = getLoginHref("/contents");

  return (
    <HeaderAuthView
      currentUser={currentUser}
      isLoading={isPending}
      loginHref={loginHref}
    />
  );
}
