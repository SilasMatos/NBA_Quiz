import React from "react";
import { StyleSheet, Text, SafeAreaView, View, Pressable, Dimensions } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import ConfettiCannon from 'react-native-confetti-cannon';

const VictoryScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { points, answers } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <ConfettiCannon
        count={200}
        explosionSpeed={300}
        fallSpeed={3000}
        origin={{ x: -10, y: -10 }}
        colors={['#ff0000', '#00ff00', '#0000ff']}
        canvasStyle={{ height: Dimensions.get('window').height }}
      />
      <Text style={styles.title}>Vitória!</Text>
      
      <Pressable
        onPress={() => navigation.navigate("Results", { answers })}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Ver Resultados</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  points: {
    fontSize: 18,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
  },
  resultsContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  result: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 6,
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default VictoryScreen;
