import FocusTime from "./Components/FocusTime";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { useState } from "react";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState("");
  const [switchScreen, setSwitchScreen] = useState(false);
  const changeScreen = () => {
    setSwitchScreen(!switchScreen);
  };
  const addTask = () => {
    const trimmedTask = task.trim();
    if (trimmedTask.length > 0) {
      setTasks([...tasks, trimmedTask]);
      setTask("");
      setSelectedTasks(trimmedTask);
    }
  };
  if (switchScreen) {
    return <FocusTime focusTask={selectedTasks} onBack={changeScreen} />;
  }
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
        <Text style={styles.focusedTitle}>THhings we have focused on</Text>
        {tasks.map((task, index) => (
          <Text key={index} style={styles.taskText}>
            {task}
          </Text>
        ))}
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
    width: "80%",
  },
  fabButton: {
    backgroundColor: "#241b9a",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
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
    marginBottom: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#dbd5e7",
  },
});
