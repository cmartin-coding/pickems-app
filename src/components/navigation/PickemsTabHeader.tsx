import tw from "@/tailwind";
import { StatusBar, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PickemsText } from "../PickemsText";
import { ReactNode, useState } from "react";
import { SettingsCogHeader } from "./SettingsCogHeader";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "@/src/store";
import { useDispatch } from "react-redux";
import { activeLeagueActions } from "@/src/slices/activeLeague";
import { userActions } from "@/src/slices/user";
import { useThemeContext } from "@/src/context/ThemeContext";

type PickemsTabHeaderProps = {
  title: string;
  children?: ReactNode;
  includeLeagueSelector?: boolean;
};

export function PickemsTabHeader(props: PickemsTabHeaderProps) {
  const insets = useSafeAreaInsets();
  const disptach = useDispatch();
  const user = useAppSelector((state) => state.user);
  const theme = useThemeContext();
  // const activeLeague = useAppSelector((state) => state.activeLeague);
  const leagueDetails = user.activeLeagues.find(
    (al) => al.league_id === user.currentActiveLeague
  );

  const [isLeagueSelectionShown, setIsLeagueSelectionShown] = useState(false);
  const [highlightPosition, setHighlightPosition] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>({ x: 0, y: 0, height: 0, width: 0 });

  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <View
        style={[
          tw`bg-white dark:bg-pickems-dark-blue border-b-[1px] border-b-slate-300/30 pb-2`,
          { paddingTop: insets.top },
        ]}
      >
        <PickemsText style={[tw`text-center  text-lg font-bold`]}>
          {props.title}
        </PickemsText>
        {props.children && <>{props.children}</>}
        <View style={[tw`absolute bottom-2 right-2`]}>
          <SettingsCogHeader />
        </View>
        <View
          onLayout={(ev) => {
            const layout = ev.nativeEvent.layout;
            setHighlightPosition({
              x: layout.x,
              y: layout.y,
              height: layout.height,
              width: layout.width,
            });
          }}
          style={[tw`flex flex-row justify-center`]}
        >
          {props.includeLeagueSelector && user.activeLeagues.length > 0 && (
            <TouchableOpacity
              style={[tw` `]}
              onPress={() => {
                setIsLeagueSelectionShown((prev) => !prev);
              }}
            >
              <View
                style={[tw`flex flex-row items-center gap-1 justify-center`]}
              >
                <PickemsText style={[tw`text-xs text-black`]}>
                  {leagueDetails?.league_name}
                </PickemsText>
                <Ionicons name="chevron-down" size={14} />
              </View>
            </TouchableOpacity>
          )}
        </View>
        {isLeagueSelectionShown && (
          <>
            <TouchableOpacity
              onPress={() => {
                setIsLeagueSelectionShown(false);
              }}
              style={[tw`absolute h-[1000px] w-[10000px] bg-white/0`]}
            />
            <View style={[tw`flex flex-row justify-center `]}>
              <View
                style={[
                  tw` absolute  border rounded-md bg-white`,
                  {
                    //   left: highlightPosition.x - 20,
                    //   right: highlightPosition.x,

                    width: highlightPosition.width - 20,
                  },
                ]}
              >
                {/* <PickemsText style={[tw`text-center font-semibold`]}>
              Your leagues
            </PickemsText> */}
                <View style={[tw`flex flex-col`]}>
                  {user.activeLeagues.map((al) => (
                    <TouchableOpacity
                      onPress={() => {
                        disptach(
                          userActions.updateSelectedLeague({
                            activeLeagueID: al.league_id,
                          })
                        );
                        setIsLeagueSelectionShown(false);
                      }}
                      style={[
                        tw`flex flex-row rounded-md ${
                          al.league_id === user.currentActiveLeague
                            ? "bg-blue-200/70 "
                            : ""
                        } justify-center p-2`,
                      ]}
                      key={al.league_id}
                    >
                      <PickemsText>{al.league_name}</PickemsText>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </>
        )}
      </View>
    </>
  );
}
