# Animações de Algoritmos de Ordenação

Este projeto foi desenvolvido com React para ser exibido na feira ICMC de Portas Abertas de 2025 e consiste em um aplicativo web que mostra, por meio de animações sobre arrays genéricos, o funcionamento de alguns dos algoritmos de ordenação mais conhecidos. O programa permite ao usuário gerar arrays aleatórios ou gerar arrays invertidos (para testar o pior caso de ordenação), bem como regular a velocidade da simulação na parte inferior da página e disparar o processo de ordenação. Vale ressaltar que, para dar foco na comparação entre os algoritmos, todos eles recebem arrays iguais todas vez que o usuário os gera e começam a ordenar ao mesmo tempo.

Os algoritmos incluídos na aplicação foram decididos com o intuito em variar as complexidades presentes. Com base nisso, são eles:
- Complexidade O(n²): Bubble Sort, Insertion Sort
- Complexidade O(n): Radix Sort
- Complexidade O(n log n): Quick Sort, Merge Sort, Heap Sort

## Como executar

No diretório deste projeto, você pode rodar:

### `npm start`

Executa o app em modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no navegador.

A página recarrega quando você faz mudanças.\
Você também pode ver erros no console.

### `npm test`

Inicia o test runner no modo interativo de vigia.\
Veja a seção [running tests](https://facebook.github.io/create-react-app/docs/running-tests) para mais informações.

### `npm run build`

Constrói a versão final do app na pasta `build`.\
Agrupa corretamente o React no modo de produção e otimiza a build para melhor performance.

A build é minimizada e os nomes dos arquivos incluem hashes.\
O app fica pronto para ser entregue!

Veja a seção [deployment](https://facebook.github.io/create-react-app/docs/deployment) para mais informações.

OBS: no repositório, não inclui uma versão finalizada do projeto com `npm build`.
