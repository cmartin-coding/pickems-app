import * as React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";
const StandingsIcon = (props: SvgProps) => (
  <Svg
    width="800px"
    height="800px"
    viewBox="0 0 32 32"
    enableBackground="new 0 0 32 32"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    {/* <G id="ball" />
    <G id="wistle" />
    <G id="pitch" />
    <G id="goal" />
    <G id="socks" />
    <G id="shoe" />
    <G id="jersey" /> */}
    {/* <G id="bottle" />
    <G id="shorts" />
    <G id="corner" /> */}
    <G id="winner">
      <Path
        d="M30,17h-8v-3c0-0.552-0.447-1-1-1H11c-0.553,0-1,0.448-1,1v5H2c-0.553,0-1,0.448-1,1v6c0,0.552,0.447,1,1,1   h28c0.553,0,1-0.448,1-1v-8C31,17.448,30.553,17,30,17z M29,25H3v-4h8c0.553,0,1-0.448,1-1v-5h8v3c0,0.552,0.447,1,1,1h8V25z"
        // fill="#FF911C"
      />
      <Path
        d="M15,10V2c0-0.552,0.447-1,1-1c0.553,0,1,0.448,1,1v8c0,0.552-0.447,1-1,1C15.447,11,15,10.552,15,10z    M25,15h4c0.553,0,1-0.448,1-1s-0.447-1-1-1h-3v-2h3c0.553,0,1-0.448,1-1V6c0-0.552-0.447-1-1-1h-4c-0.553,0-1,0.448-1,1   s0.447,1,1,1h3v2h-3c-0.553,0-1,0.448-1,1v4C24,14.552,24.447,15,25,15z M3,15c-0.553,0-1,0.448-1,1s0.447,1,1,1h4   c0.553,0,1-0.448,1-1V8c0-0.552-0.447-1-1-1H3C2.447,7,2,7.448,2,8s0.447,1,1,1h3v2H3c-0.553,0-1,0.448-1,1s0.447,1,1,1h3v2H3z"
        // fill="#FFCC2F"
      />
      <Path
        d="M31,30c0,0.552-0.447,1-1,1h-8c-0.553,0-1-0.448-1-1s0.447-1,1-1h8C30.553,29,31,29.448,31,30z M19,29h-2   c-0.553,0-1,0.448-1,1s0.447,1,1,1h2c0.553,0,1-0.448,1-1S19.553,29,19,29z M14,29H2c-0.553,0-1,0.448-1,1s0.447,1,1,1h12   c0.553,0,1-0.448,1-1S14.553,29,14,29z"
        // fill="#FFCC2F"
      />
    </G>
    <G id="trophy" />
    <G id="substitution" />
    <G id="medal_award" />
    <G id="strategy" />
    <G id="card" />
    <G id="gloves" />
    <G id="stadium" />
    <G id="keeper" />
    <G id="time" />
    <G id="horns" />
    <G id="flag" />
    <G id="referee" />
    <G id="player" />
    <G id="injury" />
    <G id="supporter" />
    <G id="coach" />
    <G id="cone" />
    <G id="captain" />
    <G id="match" />
    <G id="score" />
    <G id="celender" />
    <G id="grass" />
    <G id="game" />
    <G id="subsitutions" />
    <G id="bench" />
  </Svg>
);
export default StandingsIcon;
