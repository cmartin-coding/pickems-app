import { tw } from "@/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Alert, View } from "react-native";
import { PickemsText } from "./PickemsText";
import { UserPicksHeader } from "./UserPicksHeader";

type WeekSelectorHeaderProps = {
  selectedWeek: number;
  onWeekChange: (week: number) => void;
  title?: string;
};
export function WeekSelectorHeader(props: WeekSelectorHeaderProps) {
  return (
    <View style={[tw`flex w-full px-4 py-2 flex-col items-start relative `]}>
      <LinearGradient
        style={[
          tw` absolute top-0 bottom-0 flex flex-row justify-center left-0 right-0`,
        ]}
        start={{ x: 0.2, y: 0.2 }}
        // end={{ x: 1, y: 1.5 }}
        colors={["#000000", "#0000FF"]}
      >
        <Ionicons
          name="american-football"
          size={175}
          style={[tw`absolute bg-transparent -top-10 right-0 text-white/20`]}
        />
      </LinearGradient>
      <PickemsText style={[tw`text-white font-semibold mb-2 text-lg`]}>
        {props.title ? props.title : "My Picks"}
      </PickemsText>
      <UserPicksHeader
        style={[tw`bg-transparent`]}
        selectionStyle={[tw`bg-white`]}
        selectedWeek={props.selectedWeek}
        onWeekChange={(week) => {
          props.onWeekChange(week);
        }}
      />
    </View>
  );
}
