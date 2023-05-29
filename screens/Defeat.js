import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/native";
const DerrotaScreen = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Derrota</Text>
      <Pressable
      onPress={() => navigation.navigate("Home")}
        style={{
          backgroundColor: "#2586f5",
          padding: 14,
          width:120,
          borderRadius: 25,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 30,
        }}
      >
        <Text style={{color:"white",fontWeight:"600",textAlign:"center"}}>Tente Novamente</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default DerrotaScreen;
