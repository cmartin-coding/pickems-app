import tw from "@/tailwind";
import Svg, { Path } from "react-native-svg";
import { useAppColorScheme } from "twrnc/dist/esm/hooks";

export function BlueSVGBackground() {
  const [colorScheme, toggleColorScheme, setColorScheme] =
    useAppColorScheme(tw);
  const isLightScheme = colorScheme === "light";
  return (
    <>
      <Svg
        style={[tw` absolute bottom-0`]}
        width={800}
        height={800}
        viewBox="0 0 100 100"
      >
        <Path
          y={"0"}
          // y={"-200"}
          fill={
            isLightScheme
              ? tw.color("pickems-base-blue")
              : tw.color("pickems-dark-blue")
          }
          d="M0,192L10.4,202.7C20.9,213,42,235,63,202.7C83.5,171,104,85,125,96C146.1,107,167,213,188,218.7C208.7,224,230,128,250,80C271.3,32,292,32,313,37.3C333.9,43,355,53,376,74.7C396.5,96,417,128,438,165.3C459.1,203,480,245,501,272C521.7,299,543,309,563,298.7C584.3,288,605,256,626,218.7C647,181,668,139,689,138.7C709.6,139,730,181,751,186.7C772.2,192,793,160,814,149.3C834.8,139,856,149,877,133.3C897.4,117,918,75,939,53.3C960,32,981,32,1002,42.7C1022.6,53,1043,75,1064,74.7C1085.2,75,1106,53,1127,48C1147.8,43,1169,53,1190,80C1210.4,107,1231,149,1252,170.7C1273,192,1294,192,1315,160C1335.7,128,1357,64,1377,69.3C1398.3,75,1419,149,1430,186.7L1440,224L1440,0L1429.6,0C1419.1,0,1398,0,1377,0C1356.5,0,1336,0,1315,0C1293.9,0,1273,0,1252,0C1231.3,0,1210,0,1190,0C1168.7,0,1148,0,1127,0C1106.1,0,1085,0,1064,0C1043.5,0,1023,0,1002,0C980.9,0,960,0,939,0C918.3,0,897,0,877,0C855.7,0,835,0,814,0C793,0,772,0,751,0C730.4,0,710,0,689,0C667.8,0,647,0,626,0C605.2,0,584,0,563,0C542.6,0,522,0,501,0C480,0,459,0,438,0C417.4,0,397,0,376,0C354.8,0,334,0,313,0C292.2,0,271,0,250,0C229.6,0,209,0,188,0C167,0,146,0,125,0C104.3,0,83,0,63,0C41.7,0,21,0,10,0L0,0Z"
        />
      </Svg>
      <Svg
        style={[tw` absolute `]}
        width={800}
        height={800}
        viewBox="0 0 250 250"
      >
        <Path
          y={"0"}
          // y={"-200"}
          fill={
            isLightScheme
              ? tw.color("pickems-light-blue")
              : tw.color("blue-600")
          }
          d="M0,192L10.4,202.7C20.9,213,42,235,63,202.7C83.5,171,104,85,125,96C146.1,107,167,213,188,218.7C208.7,224,230,128,250,80C271.3,32,292,32,313,37.3C333.9,43,355,53,376,74.7C396.5,96,417,128,438,165.3C459.1,203,480,245,501,272C521.7,299,543,309,563,298.7C584.3,288,605,256,626,218.7C647,181,668,139,689,138.7C709.6,139,730,181,751,186.7C772.2,192,793,160,814,149.3C834.8,139,856,149,877,133.3C897.4,117,918,75,939,53.3C960,32,981,32,1002,42.7C1022.6,53,1043,75,1064,74.7C1085.2,75,1106,53,1127,48C1147.8,43,1169,53,1190,80C1210.4,107,1231,149,1252,170.7C1273,192,1294,192,1315,160C1335.7,128,1357,64,1377,69.3C1398.3,75,1419,149,1430,186.7L1440,224L1440,0L1429.6,0C1419.1,0,1398,0,1377,0C1356.5,0,1336,0,1315,0C1293.9,0,1273,0,1252,0C1231.3,0,1210,0,1190,0C1168.7,0,1148,0,1127,0C1106.1,0,1085,0,1064,0C1043.5,0,1023,0,1002,0C980.9,0,960,0,939,0C918.3,0,897,0,877,0C855.7,0,835,0,814,0C793,0,772,0,751,0C730.4,0,710,0,689,0C667.8,0,647,0,626,0C605.2,0,584,0,563,0C542.6,0,522,0,501,0C480,0,459,0,438,0C417.4,0,397,0,376,0C354.8,0,334,0,313,0C292.2,0,271,0,250,0C229.6,0,209,0,188,0C167,0,146,0,125,0C104.3,0,83,0,63,0C41.7,0,21,0,10,0L0,0Z"
        />
      </Svg>
      <Svg
        style={[tw` absolute `]}
        width={800}
        height={800}
        viewBox="0 0 550 550"
      >
        <Path
          // y={"-200"}

          fill={
            isLightScheme
              ? tw.color("pickems-blue")
              : tw.color("pickems-dark-blue")
          }
          d="M0,192L10.4,202.7C20.9,213,42,235,63,202.7C83.5,171,104,85,125,96C146.1,107,167,213,188,218.7C208.7,224,230,128,250,80C271.3,32,292,32,313,37.3C333.9,43,355,53,376,74.7C396.5,96,417,128,438,165.3C459.1,203,480,245,501,272C521.7,299,543,309,563,298.7C584.3,288,605,256,626,218.7C647,181,668,139,689,138.7C709.6,139,730,181,751,186.7C772.2,192,793,160,814,149.3C834.8,139,856,149,877,133.3C897.4,117,918,75,939,53.3C960,32,981,32,1002,42.7C1022.6,53,1043,75,1064,74.7C1085.2,75,1106,53,1127,48C1147.8,43,1169,53,1190,80C1210.4,107,1231,149,1252,170.7C1273,192,1294,192,1315,160C1335.7,128,1357,64,1377,69.3C1398.3,75,1419,149,1430,186.7L 400,224L1440,0L1429.6,0C1419.1,0,1398,0,1377,0C1356.5,0,1336,0,1315,0C1293.9,0,1273,0,1252,0C1231.3,0,1210,0,1190,0C1168.7,0,1148,0,1127,0C1106.1,0,1085,0,1064,0C1043.5,0,1023,0,1002,0C980.9,0,960,0,939,0C918.3,0,897,0,877,0C855.7,0,835,0,814,0C793,0,772,0,751,0C730.4,0,710,0,689,0C667.8,0,647,0,626,0C605.2,0,584,0,563,0C542.6,0,522,0,501,0C480,0,459,0,438,0C417.4,0,397,0,376,0C354.8,0,334,0,313,0C292.2,0,271,0,250,0C229.6,0,209,0,188,0C167,0,146,0,125,0C104.3,0,83,0,63,0C41.7,0,21,0,10,0L0,0Z"
        />
      </Svg>
    </>
  );
}
