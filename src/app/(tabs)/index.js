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
import Toast from "react-native-toast-message";
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
  const { colors, statusBarStyle, isDark, toggleTheme } = useColor();
  const styles = getStyles(colors);
  const[inputError, setInputError] = useState(false);


  // const changeScreen = () => {
  //   setSwitchScreen(!switchScreen);
  // };
const addTask = () => {
  const trimmedTask = task.trim();

  if (trimmedTask.length > 0) {
    setInputError(false);
    setTask("");
    setSelectedTask(trimmedTask);

    router.push({
      pathname: "/FocusTime",
    });
  } else {
    showToast();
  }
};
const showToast = () => {
  Toast.show({
    type: "error",
    text1: "Please enter a task to focus on.",
  });
};
  
  return (
  <View style={styles.container}>
    <View style={styles.header}>
      <View>
    <Text style={styles.headerTitle}>Focus</Text>
    <Text style={styles.headerSubTitle}>
      what do you want to focus on?
    </Text>
  </View>
      <TouchableOpacity
        style={styles.themeToggle}
        onPress={toggleTheme}
      >
        <Ionicons
          name={isDark ? "sunny" : "moon"}
          size={20}
          color={colors.textPrimary}
        />
      </TouchableOpacity>
    </View>

    <View style={{marginTop:10}}>
      <TextInput
        placeholder="what would you like to focus on...."
        
        value={task}
        
        style={styles.InputText}
        placeholderTextColor={colors.textSecondary}
        onChangeText={(text) => setTask(text)}
      />

      <TouchableOpacity
        style={[styles.fabButton,{backgroundColor:colors.background,borderColor:colors.outline}]}
        onPress={() => {
          addTask();

          // changeScreen();
        }}
      >
        <Text style={
        [styles.fabText,{color:colors.textPrimary}]}>+</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.focusedTasks}>
      <Text style={styles.focusedTitle}>
                  Previous Focused Tasks:
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
      style={[
    styles.tasksList,{backgroundColor:colors.surface}]}
        key={index}
        onPress={() => {
  setSelectedTask(task);
  router.push("/FocusTime");
}}
      >
        <Text style={[styles.taskText1],{color:colors.textSecondary}}>
          
          {index +1}.</Text>
         
        <Text style={[styles.taskText,{textDecorationLine:"line-through"}]}>
          {task}
        </Text>
      </Pressable>
    ))} 
  </ScrollView>
{/* </ImageBackground> */}
    </View>
  </View>
);
}

const getStyles = (colors) => StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.textPrimary,
    paddingBottom:7
  },
  headerSubTitle: {
    fontSize: 18,
    color: colors.textSecondary,
  },

  themeToggle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.outline,
  },

  InputText: {
    backgroundColor:colors.surface,
    color: colors.textPrimary,
    padding: 15,
    margin: 8,
    borderRadius: 10,
    width: "80%",
    paddingHorizontal:10
  },

  fabButton: {
 //   backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    width: 47,
    height: 47,
    borderRadius: 25,
    position: "absolute",
    bottom: 10,
    right: 10,
    borderWidth:1
  },

  fabText: {
  //color: colors.onPrimary,
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
    tasksList:{
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  }
  
});