import { View, Text, StyleSheet, TouchableOpacity,Alert,ImageBackground} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import Ionicons from '@expo/vector-icons/Ionicons';
export default function FocusTime({ focusTask, onBack }) {
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
  const showToast=()=>{
    Toast.show({
      type:"success",
      text1:`you have successfully completed your ${focusTask}`
    })
  }
  useEffect(() => {
  if (!isRunning || timeLeft === null) return;

  if (timeLeft === 0) {
    showToast();
    setIsRunning(false);
    return;
  }

  const interval = setInterval(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [isRunning, timeLeft]);
  return (
  <SafeAreaView style={styles.container}>
  <ImageBackground
    source={require("../assets/Background.jpg")}
    style={styles.background}
    resizeMode="cover"
  >
    <TouchableOpacity style={styles.backButton} onPress={onBack}>
      <Ionicons name="chevron-back" size={24} color="black" />
      <Text style={{ color: "#000" }}>Back</Text>
    </TouchableOpacity>

    <StatusBar style="dark" />

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
        height: 11,
        width: "100%",
        backgroundColor: "#241b9a",
        marginTop: 20,
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
      <Text style={{ color: "#000" }}>
        {isRunning ? "Pause" : "Start"}
      </Text>
    </TouchableOpacity>

    <Toast />
  </ImageBackground>
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dbd5e7",
  },

  background: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },

  timeText: {
    fontSize: 30,
    color: "#000",
    marginTop: 50,
    fontWeight: "bold",
  },

  focusText: {
    fontSize: 20,
    color: "#000",
    marginTop: 20,
  },

  focusTask: {
    fontSize: 25,
    color: "#000",
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
    borderColor: "#fff",
  },

  timeButtonText: {
    color: "#000",
    fontSize: 18,
  },

  startFab: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    marginTop: 50,
  },

  backButton: {
    position: "absolute",
    top: 40,
    left: 25,
    flexDirection: "row",
    alignItems: "center",
  },
});