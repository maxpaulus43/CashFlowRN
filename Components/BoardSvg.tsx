import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

function BoardSvg(props: SvgProps) {
  return (
    <Svg width={612} height={612} viewBox="0 0 612 612" fill="none" {...props}>
      <Path
        d="M612 306a306 306 0 01-10.423 79.186l-121.612-32.58A180.113 180.113 0 00486.1 306H612z"
        fill="#7998C6"
      />
      <Path
        d="M601.573 385.199a305.99 305.99 0 01-30.563 73.79l-109.035-62.946a180.07 180.07 0 0017.988-43.43l121.61 32.586z"
        fill="#83C878"
      />
      <Path
        d="M571.004 459a306.034 306.034 0 01-48.62 63.366l-89.029-89.021a180.103 180.103 0 0028.616-37.295L571.004 459z"
        fill="#DF8A8A"
      />
      <Path
        d="M522.375 522.375a305.997 305.997 0 01-63.364 48.622l-62.954-109.03a180.13 180.13 0 0037.293-28.617l89.025 89.025zM385.199 601.573A306.01 306.01 0 01306.013 612l-.005-125.9a180.108 180.108 0 0046.605-6.137l32.586 121.61z"
        fill="#83C878"
      />
      <Path
        d="M459 571.004a306.015 306.015 0 01-73.789 30.566l-32.59-121.609a180.085 180.085 0 0043.429-17.99L459 571.004z"
        fill="#CF8FDA"
      />
      <Path
        d="M0 306c0 26.737 3.504 53.36 10.423 79.186l121.612-32.58A180.113 180.113 0 01125.9 306H0z"
        fill="#83C878"
      />
      <Path
        d="M10.427 385.199a306.01 306.01 0 0030.563 73.79l109.035-62.946a180.07 180.07 0 01-17.988-43.43l-121.61 32.586z"
        fill="#DF8A8A"
      />
      <Path
        d="M40.996 459a306.007 306.007 0 0048.62 63.366l89.029-89.021a180.103 180.103 0 01-28.616-37.295L40.996 459z"
        fill="#83C878"
      />
      <Path
        d="M89.625 522.375a305.987 305.987 0 0063.364 48.622l62.954-109.03a180.13 180.13 0 01-37.293-28.617l-89.025 89.025z"
        fill="#7998C6"
      />
      <Path
        d="M226.801 601.573A306.01 306.01 0 00305.987 612l.005-125.9a180.108 180.108 0 01-46.605-6.137l-32.586 121.61z"
        fill="#FFDE8A"
      />
      <Path
        d="M153 571.004a306.015 306.015 0 0073.789 30.566l32.59-121.609a180.085 180.085 0 01-43.429-17.99L153 571.004z"
        fill="#83C878"
      />
      <Path
        d="M0 306c0-26.737 3.504-53.36 10.423-79.186l121.612 32.58A180.113 180.113 0 00125.9 306H0z"
        fill="#D37641"
      />
      <Path
        d="M10.427 226.801a306.01 306.01 0 0130.563-73.79l109.035 62.946a180.07 180.07 0 00-17.988 43.43l-121.61-32.586z"
        fill="#83C878"
      />
      <Path
        d="M40.996 153a305.994 305.994 0 0148.62-63.366l89.029 89.021a180.103 180.103 0 00-28.616 37.295L40.996 153z"
        fill="#FFDE8A"
      />
      <Path
        d="M89.625 89.625a306.008 306.008 0 0163.364-48.622l62.954 109.03a180.13 180.13 0 00-37.293 28.617L89.625 89.625zM226.801 10.427A306.007 306.007 0 01305.987 0l.005 125.9a180.108 180.108 0 00-46.605 6.137l-32.586-121.61z"
        fill="#83C878"
      />
      <Path
        d="M153 40.996a306 306 0 0173.789-30.566l32.59 121.609a180.085 180.085 0 00-43.429 17.99L153 40.996z"
        fill="#7998C6"
      />
      <Path
        d="M612 306a306 306 0 00-10.423-79.186l-121.612 32.58A180.113 180.113 0 01486.1 306H612z"
        fill="#83C878"
      />
      <Path
        d="M601.573 226.801a305.99 305.99 0 00-30.563-73.79l-109.035 62.946a180.07 180.07 0 0117.988 43.43l121.61-32.586z"
        fill="#FFDE8A"
      />
      <Path
        d="M571.004 153a306.021 306.021 0 00-48.62-63.366l-89.029 89.021a180.103 180.103 0 0128.616 37.295L571.004 153z"
        fill="#83C878"
      />
      <Path
        d="M522.375 89.625a306.018 306.018 0 00-63.364-48.622l-62.954 109.03a180.13 180.13 0 0137.293 28.617l89.025-89.025z"
        fill="url(#prefix__paint0_linear)"
      />
      <Path
        d="M385.199 10.427A306.007 306.007 0 00306.013 0l-.005 125.9a180.108 180.108 0 0146.605 6.137l32.586-121.61z"
        fill="#DF8A8A"
      />
      <Path
        d="M459 40.996a306 306 0 00-73.789-30.566l-32.59 121.609a180.085 180.085 0 0143.429 17.99L459 40.996z"
        fill="#83C878"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={500.5}
          y1={251}
          x2={377}
          y2={49.5}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.508} stopColor="#FFCCF4" />
          <Stop offset={0.679} stopColor="#BAE3FB" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default BoardSvg;
