import { useState } from "react";
import { View } from "react-native";
import { PickemsTextInput } from "../PickemsTextInput";
import { PickemsText } from "../PickemsText";
import tw from "@/tailwind";
import { PickemsButton } from "../PickemsButton";
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
          label={{ text: "Email", style: [tw`text-black`] }}
          value={loginState.email}
          onChangeText={(val) => {
            setLoginState((prev) => ({ ...prev, email: val }));
          }}
          style={[tw`bg-gray-200/30`]}
          keyboardType="email-address"
        />
        <PickemsTextInput
          label={{ text: "Password", style: [tw`text-black`] }}
          value={loginState.password}
          secureTextEntry={true}
          style={[tw`bg-gray-200/30`]}
          onChangeText={(val) => {
            setLoginState((prev) => ({ ...prev, password: val }));
          }}
        />
        <PickemsButton
          onPress={() => {
            props.onLogin(loginState);
          }}
          buttonLabel="Login"
          style={[tw`bg-[#0000FF]`]}
          textStyle={[tw`text-white`]}
        />
      </View>
    </>
  );
  return;
}
