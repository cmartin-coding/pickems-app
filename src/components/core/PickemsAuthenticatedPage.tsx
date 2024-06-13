import { ReactNode } from "react";
import { PickemsPage, PickemsPageProps } from "./PickemsPage";
import { useAppSelector } from "@/src/store";
import Home from "@/src/app/(authenticated)/(tabs)/home";

export function PickemsAuthenticatedPage(
  props: { children: ReactNode } & PickemsPageProps
) {
  const user = useAppSelector((state) => state.user);
  if (user.activeLeagues.length === 0) {
    return <Home />;
  } else {
    return (
      <PickemsPage {...props} isTabBarScreen={true}>
        {props.children}
      </PickemsPage>
    );
  }
}
