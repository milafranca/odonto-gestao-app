import React from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";

export default function LocalizacaoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Localização
      </Text>

      <Text style={styles.texto}>
        O endereço da clínica será
        disponibilizado em breve.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold"
  },

  texto: {
    marginTop: 15,
    textAlign: "center"
  }
});