import { NFLTeamNames } from "@/src/types/types";
import { Arizona } from "./ari";
import { ATL } from "./atl";
import { BAL } from "./bal";
import { BUF } from "./buf";
import { CAR } from "./car";
import { CHI } from "./chi";
import { CIN } from "./cin";
import { CLE } from "./cle";
import { DAL } from "./dal";
import { DEN } from "./den";
import { DET } from "./det";
import { GB } from "./gb";
import { HOU } from "./hou";
import { IND } from "./ind";
import { JAX } from "./jax";
import { KC } from "./kc";
import { LAC } from "./lac";
import { LAR } from "./lar";
import { LV } from "./lv";
import { MIA } from "./mia";
import { MIN } from "./min";
import { NE } from "./ne";
import { NO } from "./no";
import { NYG } from "./nyg";
import { NYJ } from "./nyj";
import { PHI } from "./phi";
import { PIT } from "./pit";
import { SEA } from "./sea";
import { SF } from "./sf";
import { TB } from "./tb";
import { TEN } from "./ten";
import { WAS } from "./was";
import tw from "@/tailwind";
import { ImageStyle, ViewStyle } from "react-native";
import { NFL } from "./nfl";

export function TeamLogo(props: {
  team: NFLTeamNames;
  size: number;
  style?: ImageStyle[];
}) {
  if (props.team === "49ers") {
    return <SF size={props.size} />;
  }
  if (props.team === "Bears") {
    return <CHI size={props.size} />;
  }
  if (props.team === "Bengals") {
    return <CIN size={props.size} />;
  }
  if (props.team === "Bills") {
    return <BUF size={props.size} />;
  }
  if (props.team === "Broncos") {
    return <DEN size={props.size} />;
  }
  if (props.team === "Browns") {
    return <NFL size={props.size} />;
  }
  if (props.team === "Buccaneers") {
    return <TB size={props.size} />;
  }
  if (props.team === "Cardinals") {
    return <Arizona size={props.size} />;
  }
  if (props.team === "Chargers") {
    return <LAC size={props.size} />;
  }
  if (props.team === "Chiefs") {
    return <KC size={props.size} />;
  }
  if (props.team === "Colts") {
    return <IND size={props.size} />;
  }
  if (props.team === "Commanders") {
    return <NFL size={props.size} />;
  }
  if (props.team === "Cowboys") {
    return <DAL size={props.size} />;
  }
  if (props.team === "Dolphins") {
    return <MIA size={props.size} />;
  }
  if (props.team === "Eagles") {
    return <PHI size={props.size} />;
  }
  if (props.team === "Falcons") {
    return <ATL size={props.size} />;
  }
  if (props.team === "Giants") {
    return <NYG size={props.size} />;
  }
  if (props.team === "Jaguars") {
    return <JAX size={props.size} />;
  }
  if (props.team === "Jets") {
    return <NYJ size={props.size} />;
  }
  if (props.team === "Lions") {
    return <DET size={props.size} />;
  }
  if (props.team === "Packers") {
    return <GB size={props.size} />;
  }
  if (props.team === "Panthers") {
    return <CAR size={props.size} />;
  }
  if (props.team === "Patriots") {
    return <NE size={props.size} />;
  }
  if (props.team === "Raiders") {
    return <LV size={props.size} />;
  }
  if (props.team === "Rams") {
    return <LAR size={props.size} />;
  }
  if (props.team === "Ravens") {
    return <BAL size={props.size} />;
  }
  if (props.team === "Saints") {
    return <NO size={props.size} />;
  }
  if (props.team === "Seahawks") {
    return <SEA size={props.size} />;
  }
  if (props.team === "Steelers") {
    return <PIT size={props.size} />;
  }
  if (props.team === "Texans") {
    return <HOU size={props.size} />;
  }
  if (props.team === "Titans") {
    return <TEN size={props.size} />;
  }
  if (props.team === "Vikings") {
    return <MIN size={props.size} />;
  }
}
