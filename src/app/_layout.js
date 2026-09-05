import { Drawer } from 'expo-router/drawer';
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import TaskProvider from "../contexts/taskContext";
import ColorProvider, { useColor } from "../contexts/colorContext";
import { getItems, removeItems } from "../utils/storage";
import OnBoarding from "../components/onBoarding";

function DrawerContent() {
  const { colors, statusBarStyle } = useColor();

  return (
    <>
      
      <Drawer
  screenOptions={{
    drawerStyle: {
      backgroundColor: colors.background,
    },

    headerStyle: {
      backgroundColor: colors.background,
    },

    headerShadowVisible: false,

    headerTintColor: colors.textPrimary,
  }}
>
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: 'Home',
            title: 'Focus Timer',
          }}
        />
      </Drawer>
    </>
  );
}

export default function Layout() {
  const [showOnboarding, setShowOnboarding] = useState(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const value = await getItems("onboardingCompleted");
        setShowOnboarding(value !== true);
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      }
    };
    checkOnboardingStatus();
  }, []);

  if (showOnboarding === null) return null;
  if (showOnboarding) return <OnBoarding onDone={() => setShowOnboarding(false)} />;

  return (
    <ColorProvider>
      <TaskProvider>
        <DrawerContent />
      </TaskProvider>
    </ColorProvider>
  );
}