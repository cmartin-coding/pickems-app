import { ReactNode } from "react";
import { PickemsPage } from "./PickemsPage";
import { useAppSelector } from "@/src/store";
import Home from "@/src/app/(authenticated)/(tabs)/home";

export function PickemsAuthenticatedPage(props: { children: ReactNode }) {
  const user = useAppSelector((state) => state.user);
  if (user.activeLeagues.length === 0) {
    return <Home />;
  } else {
    return <PickemsPage isTabBarScreen={true}>{props.children}</PickemsPage>;
  }
}
