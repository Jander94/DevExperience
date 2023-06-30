const keyboardDidShow = () => {
  console.log("Teclado aberto");
};

const keyboardDidHide = () => {
  console.log("Teclado fechado");
};

useEffect(() => {
  const keyboardDidShowListener = Keyboard.addListener(
    "keyboardDidShow",
    keyboardDidShow
  );
  const keyboardDidHideListener = Keyboard.addListener(
    "keyboardDidHide",
    keyboardDidHide
  );

  return () => {
    keyboardDidShowListener.remove();
    keyboardDidHideListener.remove();
  };
}, []);
