import { tw } from "@/tailwind";
import { BlueSVGBackground } from "./BlueSVGBackground";
import { FootballLoader } from "./FootballLoader";
import { PickemsText } from "./PickemsText";
import { PickemsPage } from "./core/PickemsPage";
import { View } from "react-native";
import { PickemsHeader } from "./PickemsHeader";

type LoadingPageProps = {
  title?: string;
};
export function PickemsLoadingPage(props: LoadingPageProps) {
  return (
    <>
      <BlueSVGBackground />
      <PickemsPage
        style={[tw`bg-transparent`]}
        scrollViewContentStyle={[tw`flex flex-col justify-center h-full`]}
      >
        <View
          style={[
            tw`bg-white shadow-black  shadow-2xl p-3 flex flex-col items-center rounded-3xl`,
          ]}
        >
          <PickemsHeader style={[tw`mb-0`]}>
            {props.title ? props.title : "Loading your information!"}
          </PickemsHeader>
          <FootballLoader />
        </View>
      </PickemsPage>
    </>
  );
}
