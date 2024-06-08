import { Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return <Redirect href={"/sign-up"} />;
  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //       justifyContent: "center",
  //       alignItems: "center",
  //     }}
  //   >
  //     <Text>Edit app/index.tsx to edit this screen.</Text>
  //   </View>
  // );
}
