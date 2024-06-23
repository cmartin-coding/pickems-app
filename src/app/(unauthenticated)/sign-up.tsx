import { PickemsButton } from "@/src/components/PickemsButton";
import { PickemsHeader } from "@/src/components/PickemsHeader";
import { PickemsOptionSlider } from "@/src/components/PickemsOptionSlider";
import { PickemsText } from "@/src/components/PickemsText";
import { PickemsTextInput } from "@/src/components/PickemsTextInput";
import { PickemsPage } from "@/src/components/core/PickemsPage";
import { LoginScreen } from "@/src/components/screens/LoginScreen";
import { SignUpScreen } from "@/src/components/screens/SignUpScreen";
import { useAddUserMutation } from "@/src/services/user";
import { useAppSelector } from "@/src/store";
import { supabase } from "@/src/supabase";
import { useAuthContext } from "@/src/utils";
import { tw } from "@/tailwind";
import { Ionicons } from "@expo/vector-icons";
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
import { useDispatch, useSelector } from "react-redux";

export default function SignUp() {
  const authCtx = useAuthContext();
  const dispatch = useDispatch();

  const [addUser, { isLoading, isSuccess, error }] = useAddUserMutation();
  const [signUpState, setSignUpState] = useState<{
    email: string;
    password: string;
    name: string;
    favorite_team: string;
  }>({ email: "", name: "", password: "", favorite_team: "" });
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <PickemsPage showBackButton={true}>
      <View style={[tw`flex flex-col items-center mt-2 gap-2 mb-6`]}>
        <Ionicons name="person" size={34} color={"#0000FF"} />
        <PickemsHeader style={[tw` text-black text-center text-lg `]}>
          Login or Sign Up Today
        </PickemsHeader>
        <PickemsText style={[tw`text-gray-700 text-center`]}>
          Play with your friends and see who really knows their football
          knowledge!
        </PickemsText>
      </View>
      <View style={[tw`flex flex-col gap-4`]}>
        <View style={[tw`flex flex-row justify-center`]}>
          <PickemsOptionSlider
            highlightColor="bg-white"
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
                console.log(user);
                const result = await addUser({
                  id: user.user.id,
                  email: param.email,
                  favorite_team: param.favorite_team,
                  name: param.name,
                }).unwrap();

                console.log(result);
              } catch (ex) {
                console.log("HERE", ex);
              }
            }}
          />
        ) : (
          <LoginScreen
            onLogin={async (param) => {
              await authCtx.signIn(param.email, param.password);
            }}
          />
        )}
      </View>
    </PickemsPage>
  );
}
