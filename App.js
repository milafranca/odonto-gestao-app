import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  ActivityIndicator
} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

import {
  Ionicons,
  Feather,
  MaterialCommunityIcons
} from '@expo/vector-icons';

import { COLORS, SHADOW } from './theme';

export default function App() {

  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [dadosOrcamento, setDadosOrcamento] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://192.168.0.45';

  const enviarLead = async () => {

    if (!nome.trim() || !whatsapp.trim()) {
      Alert.alert('Aviso', 'Preencha nome e WhatsApp.');
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome_paciente: nome,
          whatsapp: whatsapp
        })
      });

      const json = await response.json();

      if (response.ok) {
        setDadosOrcamento(json);
      } else {
        Alert.alert('Erro', 'Falha ao processar.');
      }

    } catch (error) {

      setDadosOrcamento({
        procedimento: 'Avaliação Geral + Limpeza',
        valor: 150,
        parcelas: 2,
        valor_parcela: 75
      });

    } finally {
      setLoading(false);
    }
  };

  const abrirWhatsapp = () => {

    const texto = `Olá Dra. Josiane! Meu nome é ${nome}. Quero agendar minha avaliação.`;

    const url =
      `whatsapp://send?phone=5521979072363&text=${encodeURIComponent(texto)}`;

    Linking.openURL(url).catch(() => {
      Alert.alert('Erro', 'WhatsApp não instalado.');
    });
  };

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <StatusBar style="dark" />

      {/* HERO */}

      <LinearGradient
        colors={['#3BA776', '#2F8F64']}
        style={styles.hero}
      >

        <View style={styles.logoCircle}>
          <MaterialCommunityIcons
            name="tooth-outline"
            size={42}
            color="#fff"
          />
        </View>

        <Text style={styles.heroTitle}>
          Dra. Josiane
        </Text>

        <Text style={styles.heroSub}>
          Odontologia Especializada
        </Text>

        <Text style={styles.heroText}>
          Seu sorriso merece cuidado imediato.
        </Text>

        <View style={styles.heroBadges}>

          <View style={styles.badge}>
            <Feather name="shield" size={18} color="#fff" />
            <Text style={styles.badgeText}>Seguro</Text>
          </View>

          <View style={styles.badge}>
            <Ionicons name="flash-outline" size={18} color="#fff" />
            <Text style={styles.badgeText}>Rápido</Text>
          </View>

          <View style={styles.badge}>
            <Feather name="heart" size={18} color="#fff" />
            <Text style={styles.badgeText}>Humanizado</Text>
          </View>

        </View>

      </LinearGradient>

      {/* FORM */}

      <View style={styles.formCard}>

        <Text style={styles.formTitle}>
          Agendar Consulta
        </Text>

        <Text style={styles.formDesc}>
          Preencha os dados para liberar o atendimento direto no WhatsApp.
        </Text>

        {/* INPUT NOME */}

        <View style={styles.inputContainer}>

          <Feather
            name="user"
            size={20}
            color={COLORS.gray}
          />

          <TextInput
            placeholder="Nome do paciente"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={nome}
            onChangeText={setNome}
          />

        </View>

        {/* INPUT WHATSAPP */}

        <View style={styles.inputContainer}>

          <Ionicons
            name="logo-whatsapp"
            size={20}
            color={COLORS.whatsapp}
          />

          <TextInput
            placeholder="WhatsApp com DDD"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            keyboardType="phone-pad"
            value={whatsapp}
            onChangeText={setWhatsapp}
          />

        </View>

        {/* BOTÃO */}

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={enviarLead}
        >

          <LinearGradient
            colors={['#3BA776', '#2F8F64']}
            style={styles.button}
          >

            {
              loading
                ? <ActivityIndicator color="#fff" />
                : (
                  <>
                    <Text style={styles.buttonText}>
                      Verificar Vagas
                    </Text>

                    <Ionicons
                      name="arrow-forward"
                      size={20}
                      color="#fff"
                    />
                  </>
                )
            }

          </LinearGradient>

        </TouchableOpacity>

      </View>

      {/* RESULTADO */}

      {
        dadosOrcamento && (

          <View style={styles.resultCard}>

            <View style={styles.successCircle}>
              <Ionicons
                name="checkmark"
                size={34}
                color="#fff"
              />
            </View>

            <Text style={styles.resultTitle}>
              Pré-agendamento liberado!
            </Text>

            <View style={styles.resultBox}>

              <Text style={styles.resultLabel}>
                Serviço recomendado
              </Text>

              <Text style={styles.resultValue}>
                {dadosOrcamento.procedimento}
              </Text>

            </View>

            <View style={styles.priceRow}>

              <View>

                <Text style={styles.resultLabel}>
                  Estimativa
                </Text>

                <Text style={styles.price}>
                  R$ {dadosOrcamento.valor}
                </Text>

              </View>

              <View>

                <Text style={styles.resultLabel}>
                  Condição
                </Text>

                <Text style={styles.price}>
                  {dadosOrcamento.parcelas}x
                </Text>

              </View>

            </View>

            <TouchableOpacity
              style={styles.whatsappButton}
              onPress={abrirWhatsapp}
            >

              <Ionicons
                name="logo-whatsapp"
                size={22}
                color="#fff"
              />

              <Text style={styles.whatsappText}>
                Chamar no WhatsApp
              </Text>

            </TouchableOpacity>

          </View>
        )
      }

      {/* BENEFÍCIOS */}

      <View style={styles.section}>

        <Text style={styles.sectionTitle}>
          Por que escolher?
        </Text>

        <View style={styles.benefitCard}>

          <Feather name="shield" size={28} color={COLORS.primary} />

          <Text style={styles.benefitTitle}>
            Segurança e Privacidade
          </Text>

          <Text style={styles.benefitText}>
            Seus dados protegidos conforme LGPD.
          </Text>

        </View>

        <View style={styles.benefitCard}>

          <Ionicons
            name="flash-outline"
            size={28}
            color={COLORS.primary}
          />

          <Text style={styles.benefitTitle}>
            Atendimento Ágil
          </Text>

          <Text style={styles.benefitText}>
            Contato rápido via WhatsApp.
          </Text>

        </View>

      </View>

      {/* DEPOIMENTO */}

      <View style={styles.testimonial}>

        <Text style={styles.testimonialText}>
          "Dra. Josiane resolve rápido e sem enrolação."
        </Text>

        <Text style={styles.testimonialName}>
          Marcos Lima ⭐⭐⭐⭐⭐
        </Text>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },

  hero: {
    paddingTop: 70,
    paddingBottom: 45,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35
  },

  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20
  },

  heroTitle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  heroSub: {
    color: '#E8FFF3',
    textAlign: 'center',
    marginTop: 5
  },

  heroText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 25,
    lineHeight: 38
  },

  heroBadges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30
  },

  badge: {
    alignItems: 'center'
  },

  badgeText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 12
  },

  formCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 24,
    padding: 22,
    marginTop: -30,
    ...SHADOW
  },

  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text
  },

  formDesc: {
    color: COLORS.gray,
    marginTop: 8,
    marginBottom: 20,
    lineHeight: 22
  },

  inputContainer: {
    height: 58,
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EEF2F7'
  },

  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.text
  },

  button: {
    height: 58,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10
  },

  resultCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
    ...SHADOW
  },

  successCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },

  resultTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 20
  },

  resultBox: {
    backgroundColor: '#F8FAFC',
    padding: 18,
    borderRadius: 18,
    marginTop: 20
  },

  resultLabel: {
    color: COLORS.gray,
    fontSize: 13
  },

  resultValue: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 6
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },

  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary
  },

  whatsappButton: {
    backgroundColor: COLORS.whatsapp,
    height: 56,
    borderRadius: 18,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },

  whatsappText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16
  },

  section: {
    paddingHorizontal: 20,
    marginTop: 10
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20
  },

  benefitCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 22,
    marginBottom: 15,
    ...SHADOW
  },

  benefitTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 12
  },

  benefitText: {
    color: COLORS.gray,
    marginTop: 8,
    lineHeight: 22
  },

  testimonial: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 22,
    padding: 22,
    marginBottom: 50,
    ...SHADOW
  },

  testimonialText: {
    color: COLORS.text,
    fontSize: 16,
    lineHeight: 26,
    fontStyle: 'italic'
  },

  testimonialName: {
    marginTop: 15,
    fontWeight: 'bold',
    color: COLORS.primary
  }

});