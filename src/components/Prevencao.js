import { View, Text, ScrollView, StyleSheet } from 'react-native';


export default  function Prevencao(){

    return (
        <ScrollView style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.heading}>Prevenção contra Aedes aegypti</Text>
            <Text style={styles.paragraph}>
              Aqui estão algumas dicas para prevenir a propagação do mosquito Aedes aegypti e proteger-se contra doenças transmitidas por ele, como dengue, zika e chikungunya.
            </Text>
          </View>
    
          <View style={styles.section}>
            <Text style={styles.subHeading}>Dicas de Prevenção</Text>
            <Text style={styles.paragraph}>
              1. Elimine recipientes que acumulam água, como pneus velhos, garrafas e vasos.
            </Text>
            <Text style={styles.paragraph}>
              2. Mantenha caixas d'água e piscinas sempre tampadas.
            </Text>
            <Text style={styles.paragraph}>
              3. Use repelentes e roupas adequadas, principalmente durante o amanhecer e o anoitecer.
            </Text>
            <Text style={styles.paragraph}>
              4. Instale telas em portas e janelas para evitar a entrada do mosquito.
            </Text>
            <Text style={styles.paragraph}>
              5. Colabore com a limpeza de terrenos baldios próximos à sua residência.
            </Text>
          </View>
    
          <View style={styles.section}>
            <Text style={styles.subHeading}>Sintomas das Doenças</Text>
            <Text style={styles.paragraph}>
              Fique atento aos seguintes sintomas que podem indicar infecção por dengue, zika ou chikungunya:
            </Text>
            <Text style={styles.paragraph}>
              - Febre alta
            </Text>
            <Text style={styles.paragraph}>
              - Dores musculares e nas articulações
            </Text>
            <Text style={styles.paragraph}>
              - Manchas vermelhas na pele
            </Text>
            <Text style={styles.paragraph}>
              - Dor de cabeça intensa
            </Text>
            <Text style={styles.paragraph}>
              - Náuseas e vômitos
            </Text>
          </View>
    
          <View style={styles.section}>
            <Text style={styles.subHeading}>Tratamento</Text>
            <Text style={styles.paragraph}>
              Caso apresente sintomas, procure atendimento médico. O tratamento geralmente envolve repouso, hidratação e medicamentos para aliviar os sintomas.
            </Text>
          </View>
    
          <View style={styles.section}>
            <Text style={styles.subHeading}>Campanhas de Conscientização</Text>
            <Text style={styles.paragraph}>
              Participe de campanhas locais de conscientização sobre a prevenção do Aedes aegypti. Informe-se sobre eventos e ações comunitárias.
            </Text>
          </View>
    
          <View style={styles.section}>
            <Text style={styles.subHeading}>Viagens para Áreas Endêmicas</Text>
            <Text style={styles.paragraph}>
              Se você viajar para áreas onde as doenças transmitidas pelo Aedes aegypti são endêmicas, tome precauções extras e consulte um médico antes da viagem.
            </Text>
          </View>
    
          <View style={styles.section}>
            <Text style={styles.subHeading}>Gestantes e Cuidados Especiais</Text>
            <Text style={styles.paragraph}>
              Gestantes devem ter cuidado especial, pois o vírus da zika pode causar complicações para o feto. Consulte um obstetra regularmente.
            </Text>
          </View>
    
          <View style={styles.section}>
            <Text style={styles.subHeading}>Proteção em Ambientes Fechados</Text>
            <Text style={styles.paragraph}>
              Use mosquiteiros em berços e camas para proteger crianças e adultos durante o sono.
            </Text>
          </View>
    
          <View style={styles.section}>
            <Text style={styles.subHeading}>Cuidados com Animais de Estimação</Text>
            <Text style={styles.paragraph}>
              Mantenha recipientes de água dos animais sempre limpos e evite locais com acúmulo de água onde mosquitos possam se reproduzir.
            </Text>
          </View>
    
          <View style={styles.section}>
            <Text style={styles.subHeading}>Uso de Larvicidas</Text>
            <Text style={styles.paragraph}>
              Em áreas propensas à proliferação de mosquitos, o uso de larvicidas específicos pode ser uma medida preventiva eficaz.
            </Text>
          </View>
    
          <View style={styles.section}>
            <Text style={styles.subHeading}>Ações Comunitárias</Text>
            <Text style={styles.paragraph}>
              Envolver a comunidade na prevenção é crucial. Organize mutirões de limpeza e informe os vizinhos sobre as práticas adequadas.
            </Text>
          </View>
    
        </ScrollView>
      );
    };
    

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
      },
      section: {
        marginBottom: 20,
      },
      heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3498db',
        marginBottom: 10,
      },
      subHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3498db',
        marginBottom: 10,
      },
      paragraph: {
        fontSize: 16,
        marginBottom: 8,
      },
    });