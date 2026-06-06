import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

import { Linking } from "react-native";

import { COLORS } from "../theme";

const API_URL = "http://192.168.0.45/api.php";

export default function AgendamentoScreen() {

  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  async function consultar() {

    try {

      await fetch(API_URL,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          nome,
          whatsapp
        })
      });

      Alert.alert(
        "Sucesso",
        "Dados enviados com sucesso."
      );

    } catch(error){

      Alert.alert(
        "Erro",
        "Não foi possível conectar ao servidor."
      );
    }
  }

  async function abrirWhatsApp() {

    const mensagem =
`Olá, meu nome é ${nome}.
Gostaria de agendar uma consulta.`;

    const url =
`https://wa.me/5521979072363?text=${encodeURIComponent(mensagem)}`;

    const supported =
      await Linking.canOpenURL(url);

    if(supported){
      await Linking.openURL(url);
    }
  }

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Solicitar Atendimento
      </Text>

      <TextInput
        placeholder="Seu nome"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Seu WhatsApp"
        style={styles.input}
        value={whatsapp}
        onChangeText={setWhatsapp}
      />

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={consultar}
      >
        <Text style={styles.buttonText}>
          Enviar Dados
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.whatsappButton}
        onPress={abrirWhatsApp}
      >
        <Text style={styles.buttonText}>
          Agendar pelo WhatsApp
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    backgroundColor:COLORS.background
  },

  title:{
    fontSize:28,
    fontWeight:"bold",
    marginBottom:25,
    color:COLORS.text
  },

  input:{
    backgroundColor:"#fff",
    padding:18,
    borderRadius:20,
    marginBottom:15
  },

  primaryButton:{
    backgroundColor:COLORS.primary,
    padding:18,
    borderRadius:20,
    marginBottom:15
  },

  whatsappButton:{
    backgroundColor:COLORS.whatsapp,
    padding:18,
    borderRadius:20
  },

  buttonText:{
    color:"#fff",
    textAlign:"center",
    fontWeight:"bold"
  }
});