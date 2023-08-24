# DevExperience

# FileSystem (React Native)

Os códigos salvos foram utilizados para resolver problemas ao tentar salvar arquivos grandes no cache do aparelho.
RTR -> Relatório em tempo real

# Hook_appState (React Native)

Para detectar quando o aplicativo é minimizado e aberto novamente, você pode usar o hook useAppState do React Native.
Este hook retorna o estado atual do aplicativo, que pode ser "ativo", "inativo" ou "background". Quando o aplicativo é minimizado, ele é colocado em segundo plano e o estado é alterado para "background". Quando o aplicativo é aberto novamente, o estado é alterado para "ativo".

# RemoverAcentos

Função utilizada para realizar filtros. A função deve receber uma string lowerCase ou upperCase.

# TecladoCelular_openClose (React Native)

Utilizado para capturar evento de quando o teclado do celular é aberto ou fechado.
Instalar o "Keyboard" do react-native

# Capturar_Assinatura (React Native)

Adicionar a biblioteca: "react-native-signature-capture-view"
Pode ser necessário adicionar também a biblioteca: "react-native-webview"
https://snack.expo.dev/@khattakahmed/react-native-signature-capture-view?platform=android

# Capturar_Assinatura_2 (React Native)

Adicionar biblioteca: "react-native-signature-canva"
Para ajustar orientação: "expo-screen-orientation"
importações:

- import SignatureScreen from 'react-native-signature-canvas';
- import \* as ScreenOrientation from 'expo-screen-orientation'; (asterisco sem a barra);

# Regex_Valida_Email

1.  ^ - O início da linha/string. Isso indica que a correspondência deve começar no início da string.

2.  [\w-\.]+ - Isso corresponde a um ou mais caracteres de palavra, hífens ou pontos. Esses são os caracteres permitidos para o nome do usuário antes do símbolo "@" em um endereço de e-mail.

3.  @ - O caractere "@" literal.

4.  ([\w-]+\.)+ - Isso corresponde a uma sequência de uma ou mais ocorrências de caracteres de palavra e hífens, seguidos por um ponto. Essa sequência pode se repetir uma ou mais vezes. Isso corresponde aos subdomínios em um endereço de e-mail.

5.  [\w-]{2,4} - Isso corresponde a um domínio de nível superior (TLD) que consiste em dois a quatro caracteres de palavra ou hífens. Geralmente, os TLDs têm de 2 a 4 letras, como .com, .org, .net, etc.

6.  $ - O final da linha/string. Isso indica que a correspondência deve terminar no final da string.

- Em resumo, essa expressão regular busca validar um endereço de e-mail no seguinte formato:
  - Uma sequência de caracteres de palavra, hífens ou pontos antes do símbolo "@".
  - Seguido pelo símbolo "@".
  - Seguido por uma ou mais sequências de caracteres de palavra e hífens, seguidos por um ponto.
  - Terminando com um domínio de nível superior (TLD) que consiste em dois a quatro caracteres de palavra ou hífens.
