import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { SignatureView } from "react-native-signature-capture-view";

export const Assinatura = () => {
  const [assinatura, setAssinatura] = useState(null);
  const signatureRef = useRef(null);

  useEffect(() => {
    console.log(assinatura);
  }, [assinatura]);

  return (
    <View style={{ height: "100%" }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <SignatureView
          style={{
            height: "90%",
          }}
          ref={signatureRef}
          onSave={(val) => {
            console.log("Assinatura salva");
            setAssinatura(val);
          }}
          onClear={() => {
            console.log("Assinatura apagada");
            setAssinatura(null);
          }}
        />

        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 30,
            marginTop: "5%",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: tema.verde,
              width: 130,
              height: 40,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
            }}
            onPress={() => {
              signatureRef.current.clearSignature();
            }}
          >
            <Text style={{ color: "white" }}>Limpar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: tema.verde,
              width: 130,
              height: 40,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
            }}
            onPress={() => {
              signatureRef.current.saveSignature();
            }}
          >
            <Text style={{ color: "white" }}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};
