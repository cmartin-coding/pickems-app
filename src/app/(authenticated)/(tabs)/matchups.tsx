import { PickemsText } from "@/src/components/PickemsText";
import { PickemsPage } from "@/src/components/core/PickemsPage";
import { MatchupsScreen } from "@/src/components/screens/MatchupsScreen";
import { useThemeContext } from "@/src/context/ThemeContext";

export default function Matchups() {
  const {} = useThemeContext();
  return <MatchupsScreen />;
}
