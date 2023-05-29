import { StyleSheet, Text, SafeAreaView, View, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import questions from "../data/questions";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const QuizScreen = () => {
  const navigation = useNavigation();
  const data = questions;
  const totalQuestions = data.length;
  const minimumCorrectAnswers = 10;
  const incorrectAnswerLimit = 10;
  const correctAnswerLimit = 15;
  const [points, setPoints] = useState(0);
  const [index, setIndex] = useState(0);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [counter, setCounter] = useState(15);
  let interval = null;
  const progressPercentage = Math.floor((index / totalQuestions) * 100);
  
  useEffect(() => {
    if (points < minimumCorrectAnswers && (index + 1 - points) > incorrectAnswerLimit) {
      clearTimeout(interval);
      navigation.navigate("Defeat");
    } else if (index + 1 > correctAnswerLimit) {
      clearTimeout(interval);
      navigation.navigate("Victory");
    }
  }, [index, points]);  

  useEffect(() => {
    if (selectedAnswerIndex !== null) {
      if (selectedAnswerIndex === data[index]?.correctAnswerIndex) {
        setPoints((points) => points + 10);
        setAnswerStatus(true);
        setAnswers((prevAnswers) => [...prevAnswers, { question: index + 1, answer: true }]);
      } else {
        setAnswerStatus(false);
        setAnswers((prevAnswers) => [...prevAnswers, { question: index + 1, answer: false }]);
      }
    }
  }, [selectedAnswerIndex]);

  useEffect(() => {
    setSelectedAnswerIndex(null);
    setAnswerStatus(null);
  }, [index]);

  useEffect(() => {
    const myInterval = () => {
      if (counter >= 1) {
        setCounter((state) => state - 1);
      }
      if (counter === 0) {
        setIndex(index + 1);
        setCounter(15);
      }
    };
    interval = setTimeout(myInterval, 1000);
    return () => {
      clearTimeout(interval);
    };
  }, [counter]);

  useEffect(() => {
    if (index + 1 > totalQuestions) {
      clearTimeout(interval)
      navigation.navigate("Results", {
        answers: answers,
        points: points,
      });
    }
  }, [index]);

  useEffect(() => {
    if (!interval) {
      setCounter(15);
    }
  }, [index]);

  const currentQuestion = data[index];
  console.log(answerStatus)
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <Text>Quiz Desafio</Text>
        <Pressable
          style={{ padding: 10, backgroundColor: "#2586f5", borderRadius: 20 }}
        >
          <Text
            style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
          >
            {counter}
          </Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 10,
        }}
      >
        <Text>Seu Progresso</Text>
        <Text>
          ({index}/{totalQuestions}) Questões Totais
        </Text>
      </View>

      {/* Progress Bar */}
      <View
          style={{
            backgroundColor: "white",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            height: 10,
            borderRadius: 20,
            justifyContent: "center",
            marginTop: 20,
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              backgroundColor: "red",
              borderRadius: 12,
              position: "absolute",
              left: 0,
              height: 10,
              right: 0,
              width: `${progressPercentage}%`,
              marginTop: 20,
            }}
          />
        </View>

      <View
        style={{
          marginTop: 30,
          backgroundColor: "#F0F8FF",
          padding: 10,
          borderRadius: 6,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {currentQuestion?.question}
        </Text>
        <View style={{ marginTop: 12 }}>
          {currentQuestion?.options.map((item, index) => (

            <Pressable
            key={index}
              onPress={() =>
                selectedAnswerIndex === null && setSelectedAnswerIndex(index)
              }
              style={
                selectedAnswerIndex === index &&
              index === currentQuestion.correctAnswerIndex
                  ? {
                      flexDirection: "row",
                      alignItems: "center",
                      borderWidth: 0.5,
                      borderColor: "#00FFFF",
                      marginVertical: 10,
                      backgroundColor: "green",
                      borderRadius: 20,
                    }
                  : selectedAnswerIndex != null && selectedAnswerIndex === index
                  ? {
                      flexDirection: "row",
                      alignItems: "center",
                      borderWidth: 0.5,
                      borderColor: "#00FFFF",
                      marginVertical: 10,
                      backgroundColor: "red",
                      borderRadius: 20,
                    }
                  : {
                      flexDirection: "row",
                      alignItems: "center",
                      borderWidth: 0.5,
                      borderColor: "#00FFFF",
                      marginVertical: 10,
                      borderRadius: 20,
                    }
              }
            >
              {selectedAnswerIndex === index &&
            index === currentQuestion.correctAnswerIndex ? (
              <AntDesign
              style={{
                borderColor: "#00FFFF",
                textAlign: "center",
                borderWidth: 0.5,
                width: 40,
                height: 40,
                borderRadius: 20,
                padding: 10,
              }}
              name="check"
              size={20}
              color="white"
            />
              ) : selectedAnswerIndex != null &&
                selectedAnswerIndex === index ? (
                <AntDesign
                  style={{
                    borderColor: "#00FFFF",
                    textAlign: "center",
                    borderWidth: 0.5,
                    width: 40,
                    height: 40,

                    padding: 10,
                    borderRadius: 20,
                  }}
                  name="closecircle"
                  size={20}
                  color="white"
                />
              ) : (
                <Text
                  style={{
                    borderColor: "#00FFFF",
                    textAlign: "center",
                    borderWidth: 0.5,
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    padding: 10,
                  }}
                >
                  {item.options}
                </Text>
              )}

              <Text style={{ marginLeft: 10 }}>{item.answer}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View
        style={
          answerStatus === null
            ? null
            : {
                marginTop: 45,
                backgroundColor: "#F0F8FF",
                padding: 10,
                borderRadius: 7,
                height: 120,
              }
        }
      >
        {answerStatus === null ? null : (
          <Text
            style={
              answerStatus == null
                ? null
                : { fontSize: 17, textAlign: "center", fontWeight: "bold" }
            }
          >
            {!!answerStatus ? "Correto" : "Errado"}
          </Text>
        )}
        {index + 1 >= questions.length ? (
          <Pressable
            onPress={() =>
              navigation.navigate("Victory", {
                points: points,
                answers: answers,
              })
            }
            style={{
              backgroundColor: "green",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 20,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "white" }}>Próxima Questão</Text>
          </Pressable>
        ) : answerStatus === null ? null : (
          <Pressable
            onPress={() => setIndex(index + 1)}
            style={{
              backgroundColor: "green",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 20,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "white" }}>Próxima Questão</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({});
