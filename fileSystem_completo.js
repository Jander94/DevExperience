import * as FileSystem from "expo-file-system";

//////////////////// FUNÇÕES BASE ///////////////////////////

export const criarDiretorioMemoria = async (nomeDiretorio) => {
  const pathDiretorio = FileSystem.documentDirectory + nomeDiretorio;
  // Testa se o diretório existe
  const info = await FileSystem.getInfoAsync(pathDiretorio);

  // Se o diretório não existir, ele cria.
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(pathDiretorio);
    // console.log(`Pasta ${nomeDiretorio} criada com sucesso!`);
  } else {
    // console.log(`A pasta ${nomeDiretorio} já existe!`);
  }
};

export const salvarDadosMemoria = async (nomeDiretorio, objeto) => {
  const nomeArquivo = `${Date.now()}.json`;
  const pathDiretorio = `${FileSystem.documentDirectory}${nomeDiretorio}/${nomeArquivo}`;
  await FileSystem.writeAsStringAsync(pathDiretorio, JSON.stringify(objeto));
};

export const buscarDadosMemoria = async (nomeDiretorio) => {
  // mostra todos os arquivos dentro do diretório
  const dadosDiretorio = await FileSystem.readDirectoryAsync(
    `${FileSystem.documentDirectory}${nomeDiretorio}/`
  );
  // console.log(`arquivos no diretorio ${nomeDiretorio}`, dadosDiretorio);
  const memoria = [];
  if (dadosDiretorio.length > 0) {
    for (const item of dadosDiretorio) {
      const caminho = `${FileSystem.documentDirectory}${nomeDiretorio}/${item}`;
      const objeto = await FileSystem.readAsStringAsync(caminho);
      memoria.push(JSON.parse(objeto));
    }
  }
  return memoria;
};

export const deletarArquivosMemoria = async (nomeDiretorio) => {
  try {
    const dadosDiretorio = await FileSystem.readDirectoryAsync(
      `${FileSystem.documentDirectory}${nomeDiretorio}/`
    );
    await Promise.all(
      dadosDiretorio.map(async (nomeArquivo) => {
        // console.log('Arquivo a ser apagado: ', nomeArquivo);
        await FileSystem.deleteAsync(
          `${FileSystem.documentDirectory}${nomeDiretorio}/${nomeArquivo}`
        );
      })
    );
    // console.log(`Arquivos do diretório ${nomeDiretorio} apagados.`);
  } catch (error) {
    console.error(
      `Erro ao apagar ${nomeDiretorio} > função: deletarArquivosMemoria >> `,
      error
    );
  }
};

/////////////////////////////////// KPIS //////////////////////////////
export const buscarDadosKpiMemoria = async (nomeDiretorio) => {
  // mostra todos os arquivos dentro do diretório
  const dadosDiretorio = await FileSystem.readDirectoryAsync(
    `${FileSystem.documentDirectory}${nomeDiretorio}/`
  );
  // console.log(`arquivos no diretorio ${nomeDiretorio}`, dadosDiretorio);

  const memoria = [];
  if (dadosDiretorio.length > 0) {
    for (const item of dadosDiretorio) {
      const caminho = `${FileSystem.documentDirectory}${nomeDiretorio}/${item}`;
      const objeto = await FileSystem.readAsStringAsync(caminho);
      memoria.push({
        nome: item,
        objeto: JSON.parse(objeto),
      });
    }
  }

  return memoria;
};

export const deletarArquivosKpiMemoria = async (nomeDiretorio, kpisDeletar) => {
  try {
    const dadosDiretorio = await FileSystem.readDirectoryAsync(
      `${FileSystem.documentDirectory}${nomeDiretorio}/`
    );
    await Promise.all(
      dadosDiretorio.map(async (nomeArquivo) => {
        if (kpisDeletar?.includes(nomeArquivo)) {
          console.log("Arquivo a ser apagado: ", nomeArquivo);
          await FileSystem.deleteAsync(
            `${FileSystem.documentDirectory}${nomeDiretorio}/${nomeArquivo}`
          );
        }
      })
    );
    console.log(`Arquivos do diretório ${nomeDiretorio} apagados.`);
  } catch (error) {
    console.error(
      `Erro ao apagar kpis [${JSON.stringify(
        kpisDeletar
      )}]. > função: deletarArquivosKpiMemoria >> `,
      error
    );
  }
};

////////////////////////////////// SINCRONIA ///////////////////////////

export const criarDiretorioSincroniaMemoria = async (nomeDiretorio) => {
  const pathDiretorio = FileSystem.documentDirectory + nomeDiretorio;

  const info = await FileSystem.getInfoAsync(pathDiretorio);
  // console.log(info);
  if (info.exists) {
    await FileSystem.deleteAsync(pathDiretorio);
    // console.log(`Pasta ${nomeDiretorio} deletada!`);
  }
  //  cria o diretório vazio
  await FileSystem.makeDirectoryAsync(pathDiretorio);

  // console.log(`Pasta ${nomeDiretorio} criada com sucesso!`);
};

export const criarDiretorioAninhadoMemoria = async (nomeDiretorio) => {
  const pathDiretorio = FileSystem.documentDirectory + nomeDiretorio;
  const diretorioParts = nomeDiretorio.split("/");
  let currentPath = FileSystem.documentDirectory;

  await excluirDiretorioRecursivamente(pathDiretorio);

  //  cria o diretório completo vazio
  for (const part of diretorioParts) {
    currentPath += part + "/";
    await FileSystem.makeDirectoryAsync(currentPath);
  }
  console.log(`Pasta ${currentPath} criada com sucesso!`);
};

const excluirDiretorioRecursivamente = async (caminho) => {
  try {
    const info = await FileSystem.getInfoAsync(caminho);

    if (info.exists) {
      // Exclui o diretório
      await FileSystem.deleteAsync(caminho);

      // Divide o caminho em partes
      const diretorioParts = caminho.split("/");
      diretorioParts.pop(); // Remove o último diretório

      // Recursivamente exclui o diretório pai
      if (diretorioParts.length > 0) {
        const caminhoPai = diretorioParts.join("/");
        await excluirDiretorioRecursivamente(caminhoPai);
      }
    }
  } catch (error) {
    console.error(`Erro ao excluir diretório: ${caminho}`, error);
  }
};
