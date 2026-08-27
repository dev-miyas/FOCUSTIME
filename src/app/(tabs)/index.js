import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  ImageBackground,
  Pressable
} from "react-native";
import { useState } from "react";
import { router } from 'expo-router';
import { useTasks } from "../../contexts/taskContext";
import { useColor } from "../../contexts/colorContext";
import Ionicons from '@expo/vector-icons/Ionicons';
export default function Home() {
    const {
  task,
  setTask,
  tasks,
  setTasks,
  selectedTask,
  setSelectedTask,
} = useTasks();
  // const [switchScreen, setSwitchScreen] = useState(false);
  const { colors, statusBarStyle } = useColor();
  const styles = getStyles(colors);



  // const changeScreen = () => {
  //   setSwitchScreen(!switchScreen);
  // };
const addTask = () => {
  const trimmedTask = task.trim();

  if (trimmedTask.length > 0) {
    setTask("");
    setSelectedTask(trimmedTask);

    router.push({
      pathname: "/FocusTime",
    });
  }
};
  
  return (
  <SafeAreaView style={styles.container}>
    <View>
      <TextInput
        placeholder="what would you like to focus on...."
        mode={"outlined"}
        value={task}
        label="focus"
        style={styles.InputText}
        placeholderTextColor={colors.textSecondary}
        onChangeText={(text) => setTask(text)}
      />

      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => {
          addTask();
          // changeScreen();
        }}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.focusedTasks}>
      <Text style={styles.focusedTitle}>
        Things we have focused on
      </Text>
{/* 
      <ImageBackground
  source={require("../../../assets/Background.jpg")}
  style={styles.background}
  resizeMode="cover"
> */}
  <ScrollView contentContainerStyle={{ gap: 10 }}>
    {tasks.map((task, index) => (
      <Pressable
      style={{
    flexDirection: "row",   
    alignItems: "center",
    gap: 8,
      }}
        key={index}
        onPress={() => {
  setSelectedTask(task);
  router.push("/FocusTime");
}}
      >
         <Ionicons name="ellipse" size={10} color={colors.textPrimary} />
        <Text style={styles.taskText}>
          {task}
        </Text>
      </Pressable>
    ))} 
  </ScrollView>
{/* </ImageBackground> */}
    </View>
  </SafeAreaView>
);
}

const getStyles = (colors) => StyleSheet.create({
  InputText: {
    borderWidth: 1,
    borderColor: colors.outline,
    color: colors.textPrimary,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: "81%",
  },

  fabButton: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    width: 47,
    height: 47,
    borderRadius: 25,
    position: "absolute",
    bottom: 10,
    right: 10,
  },

  fabText: {
    color: colors.onPrimary,
    fontSize: 30,
  },

  focusedTasks: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  focusedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.textPrimary,
  },

  taskText: {
    fontSize: 16,
    margin: 7,
    color: colors.textPrimary,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  background: {
  height: 600,
  borderRadius: 20,
  overflow: "hidden",
  marginTop: 10,
},
});