import { PickemsButton } from "@/src/components/PickemsButton";
import { PickemsText } from "@/src/components/PickemsText";
import { PickemsPage } from "@/src/components/core/PickemsPage";
import { useThemeContext } from "@/src/context/ThemeContext";
import { useAuthContext } from "@/src/utils";
import { Switch, View } from "react-native";

export default function Settings() {
  const authCtx = useAuthContext();
  const { theme, toggleTheme } = useThemeContext();
  return (
    <PickemsPage showBackButton>
      <View>
        <PickemsText>Settings Screen</PickemsText>
        <View>
          <PickemsText>Theme</PickemsText>
          <Switch
            value={theme === "light"}
            onChange={() => {
              toggleTheme();
            }}
          />
        </View>
        <PickemsButton
          buttonLabel="Logout"
          onPress={async () => {
            await authCtx.logout();
          }}
        />
      </View>
    </PickemsPage>
  );
}
