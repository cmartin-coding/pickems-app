import { PickemsButton } from "@/src/components/PickemsButton";
import { PickemsHeader } from "@/src/components/PickemsHeader";
import { PickemsOptionSlider } from "@/src/components/PickemsOptionSlider";
import { PickemsText } from "@/src/components/PickemsText";
import { PickemsPage } from "@/src/components/core/PickemsPage";
import { useThemeContext } from "@/src/context/ThemeContext";
import { useAuthContext } from "@/src/utils";
import tw from "@/tailwind";
import { Switch, View } from "react-native";

export default function Settings() {
  const authCtx = useAuthContext();
  const { theme, toggleTheme } = useThemeContext();
  return (
    <PickemsPage showBackButton>
      <View style={[tw`flex flex-col  flex-1 border-white gap-4`]}>
        <PickemsHeader>Settings Screen</PickemsHeader>
        <View style={[tw`flex flex-col items-center gap-1`]}>
          <PickemsText style={[tw`self-start text-lg`]}>
            Color Theme
          </PickemsText>
          <PickemsOptionSlider
            buttonOneLabel="Light Mode"
            buttonTwoLabel="Dark Mode"
            onClickOption={(option) => {
              toggleTheme();
            }}
            selectedOption={theme === "light"}
          />
          {/* <PickemsText>Theme</PickemsText>
          <Switch
            value={theme === "light"}
            onChange={() => {
              toggleTheme();
            }}
          /> */}
        </View>
        <PickemsButton
          style={[tw`mt-10`]}
          buttonLabel="Logout"
          onPress={async () => {
            await authCtx.logout();
          }}
        />
      </View>
    </PickemsPage>
  );
}
