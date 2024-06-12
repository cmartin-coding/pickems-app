import { PickemsText } from "@/src/components/PickemsText";
import { PickemsAuthenticatedPage } from "@/src/components/core/PickemsAuthenticatedPage";
import { PickemsPage } from "@/src/components/core/PickemsPage";

export default function Standings() {
  return (
    <PickemsAuthenticatedPage>
      <PickemsText>Standings</PickemsText>
    </PickemsAuthenticatedPage>
  );
}
