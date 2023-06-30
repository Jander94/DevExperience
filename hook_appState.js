import React, { useEffect, useState } from "react";
import { AppState } from "react-native";

export default function App() {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const estado = AppState.addEventListener("change", (estadoAtual) => {
      setAppState(estadoAtual);
    });

    return () => {
      estado.remove();
    };
  }, []);

  if (appState === "background") {
    // o aplicativo foi minimizado
  } else {
    // o aplicativo está ativo
  }

  // o resto do código do aplicativo...
}
