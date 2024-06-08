import { useState } from "react";
import { PickemsText } from "../PickemsText";
import { tw } from "@/tailwind";
import { PickemsTextInput } from "../PickemsTextInput";
import { TouchableOpacity, View } from "react-native";
import { PickemsButton } from "../PickemsButton";
import { router } from "expo-router";
import { PickemsSelectList } from "../PickemsSelectList";
import { NflTeams } from "@/src/constants/nfl_teams";
type SignUpState = {
  email: string;
  password: string;
  name: string;
  favorite_team: string;
};
type SignUpProps = {
  onSignUp: (param: SignUpState) => void;
};
export function SignUpScreen(props: SignUpProps) {
  const [signUpState, setSignUpState] = useState<{
    email: string;
    password: string;
    name: string;
    favorite_team: string;
  }>({ email: "", name: "", password: "", favorite_team: "" });

  const teamOptions = ["I don't have a favorite team", ...NflTeams.sort()].map(
    (option) => ({ value: option, key: option })
  );
  return (
    <>
      <View style={[tw`flex flex-col gap-4`]}>
        <PickemsTextInput
          label="Name"
          value={signUpState.name}
          onChangeText={(val) => {
            setSignUpState((prev) => ({ ...prev, name: val }));
          }}
        />

        <PickemsTextInput
          label="Email"
          value={signUpState.email}
          onChangeText={(val) => {
            setSignUpState((prev) => ({ ...prev, email: val }));
          }}
          keyboardType="email-address"
        />
        <View style={[tw`flex flex-col gap-1`]}>
          <PickemsText>Favorite Team</PickemsText>
          <PickemsSelectList
            data={teamOptions}
            setSelected={(val) => {
              setSignUpState((prev) => ({ ...prev, favorite_team: val }));
            }}
            boxStyle={{
              borderRadius: 10,
              height: 45,
              borderColor: "rgb(212 212 212)",
            }}
          />
        </View>
        {/* <PickemsTextInput
          label="Favorite Team"
          value={signUpState.email}
          onChangeText={(val) => {
            setSignUpState((prev) => ({ ...prev, email: val }));
          }}
        /> */}
        <PickemsTextInput
          label="Password"
          value={signUpState.password}
          secureTextEntry={true}
          onChangeText={(val) => {
            setSignUpState((prev) => ({ ...prev, password: val }));
          }}
        />
        <PickemsButton
          onPress={() => {
            props.onSignUp(signUpState);
          }}
          buttonLabel="Sign Up"
        />
      </View>
    </>
  );
}
