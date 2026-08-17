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
export default function Home() {
    const {
  task,
  setTask,
  tasks,
  setTasks,
  selectedTask,
  setSelectedTask,
} = useTasks();
  const [switchScreen, setSwitchScreen] = useState(false);
  const changeScreen = () => {
    setSwitchScreen(!switchScreen);
  };
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
        onChangeText={(text) => setTask(text)}
      />

      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => {
          addTask();
          changeScreen();
        }}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.focusedTasks}>
      <Text style={styles.focusedTitle}>
        Things we have focused on
      </Text>

      <ImageBackground
  source={require("../../../assets/Background.jpg")}
  style={styles.background}
  resizeMode="cover"
>
  <ScrollView contentContainerStyle={{ gap: 10 }}>
    {tasks.map((task, index) => (
      <Pressable
        key={index}
        onPress={() => {
  setSelectedTask(task);
  router.push("/FocusTime");
}}
      >
        <Text style={styles.taskText}>
          {task}
        </Text>
      </Pressable>
    ))}
  </ScrollView>
</ImageBackground>
    </View>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  InputText: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: "81%",
  },

  fabButton: {
    backgroundColor: "#17171e",
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
    color: "#fff",
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
  },

  taskText: {
    fontSize: 16,
    margin: 7,
    
  },

  container: {
    flex: 1,
    backgroundColor: "#dbd5e7",
  },

  background: {
  height: 600,
  borderRadius: 20,
  overflow: "hidden",
  marginTop: 10,
},
});