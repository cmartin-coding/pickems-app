import { Svg, Path, G } from "react-native-svg";
export const DAL = (props: { size: number }) => {
  const { size } = props;
  return (
    <Svg
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid slice"
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="1.41421"
      viewBox="0 0 560 400"
    >
      <G
        fillRule="nonzero"
        transform="matrix(.628872 0 0 .628872 144.164 70.8008)"
      >
        <Path
          d="m216 1.282 132.674 408.328-347.344-252.36h429.34l-347.344 252.36z"
          fill="#024"
        />
        <Path
          d="m216 38.987 110.511 340.119-289.322-210.205h357.622l-289.322 210.205z"
          fill="#fff"
        />
        <Path
          d="m216 68.272 93.298 287.142-244.257-177.464h301.918l-244.257 177.464z"
          fill="#024"
        />
      </G>
    </Svg>
  );
};
