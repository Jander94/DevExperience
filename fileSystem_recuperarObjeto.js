
 async function recuperarObjeto() {
    try {
        // mostra todos os arquivos dentro do diretório
        const diretorio = await FileSystem.readDirectoryAsync(
          `${FileSystem.documentDirectory}rtr/`,
        );
        // console.log('Arquivos na pasta /rtr :>> ', diretorio);

        const memoria = [];
        // monta cada RTR no 'objeto', salva em um array e seta na state memoriaRelatorio
        for (const nome of diretorio) {
          const caminho = `${FileSystem.documentDirectory}rtr/${nome}`;
          const objeto = await FileSystem.readAsStringAsync(caminho);
          memoria.push(JSON.parse(objeto));
        }
        setMemoriaRelatorio(memoria);

        // Se o diretório estiver vazio para a busca
        if (diretorio.length === 0) {
          setBuscaRtrMemoria(false);
        }
      } catch (error) {
        console.log(
          'Erro ao buscar RTR na memoria. componente: Sincronia >',
          error,
        );
      }
 };