import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import SignatureScreen from "react-native-signature-canvas";
import * as ScreenOrientation from "expo-screen-orientation";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AuthContext from "../contexts/auth";
import { AlertDialog, Button } from "native-base";
import Icon3 from "react-native-vector-icons/FontAwesome";

export const Assinatura = ({ lidarConclusao }) => {
  const signatureRef = useRef(null);
  const isFocused = useIsFocused();
  const { tema, i18n } = useContext(AuthContext);
  const navigation = useNavigation();
  const [openSemAssinatura, setOpenSemAssinatura] = useState(false);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: 250,
      padding: 10,
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      alignItems: "center",
    },
    botaoConcluir: {
      padding: 10,
      backgroundColor: tema.corBotaoIncluir,
      borderRadius: 5,
      paddingHorizontal: "13%",
    },
    botaoVoltar: {
      padding: 10,
      backgroundColor: tema.white,
      borderWidth: 1,
      borderColor: tema.corBotaoIncluir,
      borderRadius: 5,
      paddingHorizontal: "13%",
    },
    textoBotao: {
      color: tema.corBotaoIncluir,
      fontFamily: tema.fontName,
    },
    conteinerTexto: {
      marginTop: 40,
      marginBottom: 5,
      alignItems: "flex-start",
      width: "100%",
    },
    containerCenter: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 15,
    },
    info: {
      marginVertical: 20,
    },
  });

  // ****************** Essa função "concluir" é recebida no parametro "lidarConclusao" ************************

  //   const concluir = async texto => {
  //     await salvarAssinaturaVistoria({
  //       etapaVistoriaId: etapa.id,
  //       assinatura: texto,
  //     });
  //     navigation.navigate('ResumoEtapaVistoria', {
  //       etapa,
  //       tipoAbertura: 'visualizacao',
  //     });
  //   };

  useEffect(() => {
    lockOrientation();
    if (!isFocused) {
      lockOrientationleft();
      limparCampo();
    }
  }, [isFocused]);
  const lockOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
  };

  const lockOrientationleft = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  };

  const handleOK = (s) => {
    lidarConclusao(s);
  };

  const limparCampo = () => {
    if (signatureRef.current) {
      signatureRef.current.clearSignature();
    }
  };

  const handleEnd = () => {
    signatureRef.current.readSignature();
  };

  const style = `.m-signature-pad {box-shadow: none; border: none; position: fixed; margin:auto;  top: 0; width:100%; } 
              .m-signature-pad--body {border: none; }
              .m-signature-pad--footer {display: none; margin: 0px;}
              body,html {
              width: '100%'; padding: 0px}`;

  return (
    <View style={{ flex: 1, marginHorizontal: 15, marginBottom: 15 }}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.conteinerTexto}>
        <Text style={{ fontFamily: tema.fontNameBold, fontSize: 16 }}>
          {i18n.t("assinatura")}:
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: tema.white,
          borderRadius: 10,
          padding: 10,
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <SignatureScreen
          ref={signatureRef}
          onOK={handleOK}
          onEmpty={() => {
            setOpenSemAssinatura(true);
          }}
          webStyle={style}
          style={{
            marginTop: 0,
            backgroundColor: tema.white,
          }}
        />
        <Text style={{ fontFamily: tema.fontNameBold }}>
          {i18n.t("assinaturaBloco")}
        </Text>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => {
            limparCampo();
            navigation.goBack();
          }}
        >
          <Text style={styles.textoBotao}> {i18n.t("voltar")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoVoltar} onPress={limparCampo}>
          <Text style={styles.textoBotao}> {i18n.t("limpar")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoConcluir} onPress={handleEnd}>
          <Text style={{ color: tema.white }}> {i18n.t("concluir")}</Text>
        </TouchableOpacity>
      </View>

      <AlertDialog
        isOpen={openSemAssinatura}
        onClose={() => setOpenSemAssinatura(false)}
      >
        <AlertDialog.Content>
          <View style={styles.containerCenter}>
            <Icon3 name="warning" size={40} style={{ color: "orange" }} />
            <Text style={styles.info}>{i18n.t("necessarioAssinatura")}</Text>
            <Button
              style={styles.botaoConcluir}
              onPress={() => setOpenSemAssinatura(false)}
            >
              {i18n.t("fechar")}
            </Button>
          </View>
        </AlertDialog.Content>
      </AlertDialog>
    </View>
  );
};
