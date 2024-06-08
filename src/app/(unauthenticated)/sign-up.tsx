import { PickemsButton } from "@/src/components/PickemsButton";
import { PickemsOptionSlider } from "@/src/components/PickemsOptionSlider";
import { PickemsText } from "@/src/components/PickemsText";
import { PickemsTextInput } from "@/src/components/PickemsTextInput";
import { PickemsPage } from "@/src/components/core/PickemsPage";
import { LoginScreen } from "@/src/components/screens/LoginScreen";
import { SignUpScreen } from "@/src/components/screens/SignUpScreen";
import { useAppSelector } from "@/src/store";
import { supabase } from "@/src/supabase";
import { useAuthContext } from "@/src/utils";
import { tw } from "@/tailwind";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  LayoutAnimation,
} from "react-native";
import { useSelector } from "react-redux";

export default function SignUp() {
  const authCtx = useAuthContext();
  const [signUpState, setSignUpState] = useState<{
    email: string;
    password: string;
    name: string;
    favorite_team: string;
  }>({ email: "", name: "", password: "", favorite_team: "" });
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <PickemsPage showBackButton={true}>
      <PickemsText style={[tw` text-black text-center text-lg mb-6`]}>
        {isSignUp ? "Sign Up" : "Login"}
      </PickemsText>
      <View style={[tw`flex flex-row justify-center`]}>
        <PickemsOptionSlider
          onClickOption={(bool) => {
            setIsSignUp(bool);
          }}
          selectedOption={isSignUp}
          buttonOneLabel="Sign Up"
          buttonTwoLabel="Login"
        />
      </View>
      {isSignUp ? (
        <SignUpScreen
          onSignUp={async (param) => {
            try {
              const user = await authCtx.signUpWithEmail(
                param.email,
                param.password,
                param.name
              );

              await supabase.from("users").insert({
                email: param.email,
                name: param.name,
                favorite_team: param.favorite_team,
              });
            } catch (ex) {
              console.log(ex);
            }
          }}
        />
      ) : (
        <LoginScreen onLogin={(param) => {}} />
      )}
    </PickemsPage>
  );
}
