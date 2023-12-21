import React from "react";
import LottieView from "lottie-react-native";
import splashW from "../assets/splash.json";

const Splash: React.FC = () => {
  return <LottieView source={splashW} autoPlay loop resizeMode="contain" />;
};

export default Splash;
