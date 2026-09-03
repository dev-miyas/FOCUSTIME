import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { setItems } from "../utils/storage";

export default function OnBoarding() {
  const handleDone = async () => {
    try {
      await setItems("onboardingCompleted", true);
      router.replace("/");
    } catch (error) {
      console.error("Error setting item in AsyncStorage:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <Onboarding
        onDone={handleDone}
        pages={[
          {
            backgroundColor: "#b80000",
            image: (
              <LottieView
                source={require("../../assets/animations/Teamwork productivy.json")}
                style={{ width: 200, height: 200 }}
                autoPlay
                loop
              />
            ),
            title: "Stay Organized",
            subtitle: "Manage your tasks ",
          },
          {
            backgroundColor: "#1c7600",
            image: (
              <LottieView
                source={require("../../assets/animations/timer.json")}
                style={{ width: 200, height: 200 }}
                autoPlay
                loop
              />
            ),
            title: "Stay Organized",
            subtitle: "Manage your tasks ",
          },
        ]}
      />
    </SafeAreaView>
  );
}