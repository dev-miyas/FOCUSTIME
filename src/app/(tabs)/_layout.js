import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import TaskProvider from "../../contexts/taskContext";
import ColorProvider, { useColor } from "../../contexts/colorContext";
import { getItems, removeItems } from "../../utils/storage";
import OnBoarding from "../../components/onBoarding";

export default function TabsLayout() {
  const [showOnboarding, setShowOnboarding] = useState(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        // await removeItems("onboardingCompleted");

        const value = await getItems("onboardingCompleted");
        setShowOnboarding(value !== true);
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      }
    };
    checkOnboardingStatus();
  }, []);

  const TabLayout = () => {
    const { colors, statusBarStyle } = useColor();
    return (
      <>
        <StatusBar style={statusBarStyle} />
        <Tabs
          screenOptions={{
            tabBarStyle: {
              backgroundColor: colors.surface,
              borderTopWidth: 1,
              borderTopColor: colors.outline,
            },
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textSecondary,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <Ionicons name={focused ? "home" : "home-outline"} size={24} color={focused ? colors.primary : colors.textSecondary} />
              ),
            }}
          />
          <Tabs.Screen
            name="FocusTime"
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <Ionicons name={focused ? "timer" : "timer-outline"} size={24} color={focused ? colors.primary : colors.textSecondary} />
              ),
            }}
          />
        </Tabs>
      </>
    );
  };

  if (showOnboarding === null) return null;
  if (showOnboarding) return <OnBoarding onDone={() => setShowOnboarding(false)} />;

  return (
    <ColorProvider>
      <TaskProvider>
        <TabLayout />
      </TaskProvider>
    </ColorProvider>
  );
}