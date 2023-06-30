async function saveToMemory(relatorio) {
  // exemplo do arquivo recebido como parametro
  // const relatorio = {
  //   reason: text,
  //   date: moment().subtract(3, 'hour'),
  //   idFazenda: fazenda?.idFazenda,
  //   idProdutor: clienteSelecionado,
  //   midias: arquivos?.map(a => `${a.mimeType},${a.base64}`),
  //   idCtv: usuario.ctvId,
  //   id: visita.id || null,
  // };

  try {
    const nome = `${new Date().getTime()}`;

    // Criar diretorio com nome rtr na memoria do aparelho
    const diretorio = FileSystem.documentDirectory + "rtr";

    // Testa se o diretório existe
    FileSystem.getInfoAsync(diretorio)
      .then((info) => {
        // Se o diretório não existir, ele cria.
        if (!info.exists) {
          FileSystem.makeDirectoryAsync(diretorio)
            .then(() => {
              console.log("Pasta criada com sucesso!");
            })
            .catch((error) => {
              console.log("Erro ao criar a pasta: " + error);
            });
        } else {
          console.log("A pasta rtr já existe!");
        }
      })
      .catch((e) => {
        console.log("Erro ao obter informações da pasta! >> ", e);
      });

    const caminho = `${FileSystem.documentDirectory}rtr/${nome}.json`;
    // Salva o arquivo na memória interna do aparelho
    await FileSystem.writeAsStringAsync(caminho, JSON.stringify(relatorio));
    console.log("Objeto salvo com sucesso!");
  } catch (error) {
    console.log(
      "Erro ao salvar arquivo na memoria. (componente: Relatorio) >>",
      error
    );
  }
}
