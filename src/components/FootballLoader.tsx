import tw from "@/tailwind";
import LottieView from "lottie-react-native";
import { View } from "react-native";

export function FootballLoader() {
  return (
    <View style={[tw`flex flex-row justify-center`]}>
      <LottieView
        speed={1}
        autoPlay
        // ref={animation}
        style={[tw`w-50  h-50 bg-transparent`]}
        source={require("../assets/lottie-animations/football.json")}
      />
    </View>
  );
}
