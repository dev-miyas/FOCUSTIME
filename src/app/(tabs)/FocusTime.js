import { View, Text, StyleSheet, TouchableOpacity,Alert,ImageBackground} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import Ionicons from '@expo/vector-icons/Ionicons';
import { router,useLocalSearchParams} from 'expo-router';
import { useTasks } from "../../contexts/taskContext";
import { useColor } from "../../contexts/colorContext";


export default function FocusTime() {

  const {
  selectedTask,
  setSelectedTask,
  setTasks,
} = useTasks();

  const { colors, statusBarStyle } = useColor();
  const styles = getStyles(colors);

const focusTask = selectedTask;

const [isRunning, setIsRunning] = useState(false);
const [selectTime, setSelectTime] = useState(null);
const [selectedTime, setSelectedTime] = useState();
const [timeLeft, setTimeLeft] = useState(0);

const times = [6, 900, 1200];

const timeFormatter = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const showToast = () => {
  Toast.show({
    type: "success",
    text1: `you have successfully completed your ${focusTask}`,
  });
};

useEffect(() => {
  if (!isRunning || timeLeft === null) return;

  if (timeLeft === 0) {
    showToast();

    if (selectedTask) {
      setTasks((prevTasks) => [...prevTasks, selectedTask]);
    }

    setIsRunning(false);
    return;
  }

  const interval = setInterval(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [isRunning, timeLeft]);
  return (
      
  <SafeAreaView style={styles.container}       edges={["top"]}>
{/* <ImageBackground
    source={require("../../../assets/Background.jpg")}
    style={styles.background}
    resizeMode="cover"
  > */}
    
    <TouchableOpacity style={styles.backButton} onPress={()=>{router.back()
                                                    setSelectedTask(null)}}>
      <Ionicons style={styles.backIcon} name="chevron-back" size={24} color={colors.textPrimary} backgroundColor={colors.surface} />
      <Text style={{ color: colors.textPrimary }}>Focus Session</Text>
    </TouchableOpacity>

    <StatusBar style={statusBarStyle} />

    <Text style={styles.timeText}>
      {timeFormatter(timeLeft)}
    </Text>

    <Text style={styles.focusText}>
      Focusing on
    </Text>

    <Text style={styles.focusTask}>
      {focusTask}
    </Text>

    <View
      style={{
        height: 5,
        width: "100%",
        backgroundColor: colors.secondaryContainer,
        marginTop: 70,
      }}
    />

    <View style={styles.timeContainer}>
      {times.map((time, index) => (
        <TouchableOpacity
          key={index}
          style={styles.timeButton}
          onPress={() => {
            setSelectedTime(time);
            setTimeLeft(time);
          }}
        >
          <Text style={styles.timeButtonText}>
            {timeFormatter(time)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>

    <TouchableOpacity
      style={styles.startFab}
      onPress={() => setIsRunning(!isRunning)}
    >
      <Text style={{ color: colors.textPrimary }}>
        {isRunning ? "Pause" : "Start"}
      </Text>
    </TouchableOpacity>

    <Toast />
  {/* </ImageBackground> */}
    </SafeAreaView>
  );
}

const getStyles = (colors) => StyleSheet.create({
  container: {
   flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  background: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },

  timeText: {
    fontSize: 40,
    color: colors.textPrimary,
    marginTop: 50,
    fontWeight: "bold",
  },

  focusText: {
    fontSize: 20,
    color: colors.textPrimary,
    marginTop: 20,
  },

  focusTask: {
    fontSize: 25,
    color: colors.textPrimary,
    marginTop: 20,
    fontWeight: "bold",
  },

  timeContainer: {
    flexDirection: "row",
    marginTop: 30,
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
  },

  timeButton: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.outline,
  },

  timeButtonText: {
    color: colors.textPrimary,
    fontSize: 25,
    fontWeight:"500"
  },

  startFab: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.outline,
    marginTop: 50,
  },
  backIcon:{
        height: 30,
    width: 30,
    borderRadius: 15,
  },
  /*
  header: {
  width: "100%",
  paddingHorizontal: 20,
  paddingTop: 10,
},*/
backButton: {
  position: "absolute",
  top: 10,   
  left: 20,
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
      
},

/*  backButton: {
    position: "absolute",
    top: 40,
    left: 25,
    flexDirection: "row",
    alignItems: "center",
  },*/
});