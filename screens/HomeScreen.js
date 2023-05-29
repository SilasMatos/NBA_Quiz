import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        style={{ height: 400, width: "100%", resizeMode: "contain" }}
        source={require('../assets/bola-de-basquete.png')}
      />

      <View style={{ padding: 10 }}>
        <Text
          style={{
            textAlign: "center",
            color: "#000",
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          NBA Quiz
        </Text>

        <View
          style={{
            padding: 10,
            backgroundColor: "#e4e7ed",
            borderRadius: 6,
            marginTop: 20,
            borderWidth: 4,
            borderColor: "#00f",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <Text style={{ color: "white" }}>•</Text>
            <Text
              style={{
                marginLeft: 4,
                color: "#000",
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              Para cada resposta correta você ganha 5 pontos
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <Text style={{ color: "white" }}>•</Text>
            <Text
              style={{
                marginLeft: 4,
                color: "#000",
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              Cada pergunta tem um limite de tempo de 15 segundos
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <Text style={{ color: "white" }}>•</Text>
            <Text
              style={{
                marginLeft: 4,
                color: "#000",
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              Você deve responder a todas as perguntas obrigatoriamente
            </Text>
          </View>
        </View>
      </View>

      <Pressable
        onPress={() => navigation.navigate("Quiz")}
        style={{
          backgroundColor: "#2586f5",
          padding: 14,
          width: 120,
          borderRadius: 25,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 30,
        }}
      >
        <Text style={{ color: "white", fontWeight: "600", textAlign: "center" }}>
          Começar Quiz
        </Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
