import Onboarding from "react-native-onboarding-swiper";
import { Image } from "react-native";
import LottieView from "lottie-react-native";

export default function OnBoarding() {
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <LottieView
              source={require("../../assets/animations/Teamwork productivy.json")}
             style={{ width: 200, height: 200 }}
              autoPlay
              loop
            />
          ),
          title: "Onboarding",
          subtitle: "Done with React Native Onboarding Swiper",
        },
         {
          backgroundColor: "#fff",
          image: (
            <LottieView
              source={require("../../assets//animations/Teamwork productivy.json")}
                style={{ width: 200, height: 200 }}
              autoPlay
              loop
            />
          ),
          title: "Onboarding",
          subtitle: "Done with React Native Onboarding Swiper",
        },
         {
          backgroundColor: "#fff",
          image: (
            <LottieView
              source={require("../../assets/animations/Teamwork productivy.json")}
              style={{ width: 200, height: 200 }}
              autoPlay
              loop
            />
          ),
          title: "Onboarding",
          subtitle: "Done with React Native Onboarding Swiper",
        },
      ]}
    />
  );
}