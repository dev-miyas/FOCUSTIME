import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from "expo-status-bar";
import { useColor } from "../../contexts/colorContext";

export default function TabsLayout() {
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
}