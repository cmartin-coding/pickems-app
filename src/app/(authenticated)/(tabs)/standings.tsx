import { NoActiveLeaguesPlaceholder } from "@/src/components/NoActiveLeaguesPlaceholder";
import { PickemsText } from "@/src/components/PickemsText";
import { PickemsPage } from "@/src/components/core/PickemsPage";
import { useAppSelector } from "@/src/store";

export default function Standings() {
  const user = useAppSelector((state) => state.user);
  if (user.activeLeagues.length === 0) {
    return <NoActiveLeaguesPlaceholder tab="standings" />;
  }
  return (
    <PickemsPage isTabBarScreen>
      <PickemsText>Standings</PickemsText>
    </PickemsPage>
  );
}
