import { useState } from "react";
import { View } from "react-native";
import { PickemsButton } from "../PickemsButton";
import { PickemsTextInput } from "../PickemsTextInput";
import { PickemsText } from "../PickemsText";
import { tw } from "@/tailwind";
type LoginState = {
  email: string;
  password: string;
};
type LoginScreenType = {
  onLogin: (param: LoginState) => void;
};
export function LoginScreen(props: LoginScreenType) {
  const [loginState, setLoginState] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  return (
    <>
      <View style={[tw`flex flex-col gap-4`]}>
        <PickemsTextInput
          label="Email"
          value={loginState.email}
          onChangeText={(val) => {
            setLoginState((prev) => ({ ...prev, email: val }));
          }}
          keyboardType="email-address"
        />
        <PickemsTextInput
          label="Password"
          value={loginState.password}
          secureTextEntry={true}
          onChangeText={(val) => {
            setLoginState((prev) => ({ ...prev, password: val }));
          }}
        />
        <PickemsButton
          onPress={() => {
            props.onLogin(loginState);
          }}
          buttonLabel="Login"
        />
      </View>
    </>
  );
  return;
}
