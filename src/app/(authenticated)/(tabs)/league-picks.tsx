import { NoActiveLeaguesPlaceholder } from "@/src/components/NoActiveLeaguesPlaceholder";
import { OverUnderPicker } from "@/src/components/OverUnderPicker";
import { PickemsText } from "@/src/components/PickemsText";
import { PickemsPage } from "@/src/components/core/PickemsPage";
import { useAppSelector } from "@/src/store";
import { tw } from "@/tailwind";

export default function LeaguePicks() {
  const user = useAppSelector((state) => state.user);
  if (user.activeLeagues.length === 0) {
    return <NoActiveLeaguesPlaceholder tab="league-picks" />;
  }
  return (
    <PickemsPage isTabBarScreen>
      <PickemsText style={[tw``]}>League Picks</PickemsText>
    </PickemsPage>
  );
}
