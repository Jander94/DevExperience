// apaga todos as RTRs salva na memoria do aparelho
const apagarArquivos = async () => {
  try {
    const diretorio = await FileSystem.readDirectoryAsync(
      `${FileSystem.documentDirectory}rtr/`
    );
    await Promise.all(
      diretorio.map(async (nomeArquivo) => {
        await FileSystem.deleteAsync(
          `${FileSystem.documentDirectory}rtr/${nomeArquivo}`
        );
      })
    );
    console.log("Arquivo apagado.");
  } catch (error) {
    console.error(
      "Erro ao apagar arquivos > componente: Sincronia > função: apagarArquivos > ",
      error
    );
  }
};

// ---------------------------------------------------------------------------------------

//   todos os arquivos dentro do diretório
const diretorio = await FileSystem.readDirectoryAsync(
  `${FileSystem.documentDirectory}rtr/`
);
console.log("try1:  Arquivos dentro do diretório rtr  :>> ", diretorio);

//   Apaga os arquivos
diretorio.map(async (arq) => {
  const arquivo = `${FileSystem.documentDirectory}rtr/${arq}`;
  await FileSystem.deleteAsync(arquivo);
  console.log("Arquivo excluído com sucesso!");
});
