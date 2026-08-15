import {Tabs} from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
export default function TabsLayout(){
  return(
            <Tabs
          screenOptions={{
            tabBarStyle: {
              backgroundColor: "#dbd5e7",
              setOffset: 0,
              borderTopWidth: 1,
  borderTopColor: "#8a82a3c7"
            },
            tabBarActiveTintColor: "black",
            tabBarInactiveTintColor: "#8a82a3",
          }}
        >
    <Tabs.Screen name="index" options={{headerShown:false,                                     tabBarIcon:({focused})=>
      (<Ionicons name={focused ? "home" : "home-outline"} size={24} color="black" />)
                                       }}/>
      <Tabs.Screen name="FocusTime" options={{headerShown:false,
tabBarIcon:({focused})=>( <Ionicons name= {focused? "timer" : "timer-outline"} size={24} color="black" /> )                               }}/>
                                          
    </Tabs>
  )
}