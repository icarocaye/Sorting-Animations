import './App.css';
import { useEffect, useState } from "react";

/* utilitário sleep */
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

function Bar({ value, state, width }) {
  const baseStyle = {
    height: `${value * 100}%`,
    width: width,
    flexShrink: 0,
    display: "inline-block",
    alignSelf: "flexend",
  }

  let backgroundColor = "aqua";
  if (state === "comparing") backgroundColor = "orange";
  if (state === "swapping") backgroundColor = "red";
  if (state === "sorted") backgroundColor = "limegreen";

  return (
    <div
      style={{ ...baseStyle, backgroundColor }}
    />
  );
}

function BarContainer({ array, activeIndices, swappingIndices, sortedIndices }) {
  const larguraIndividual = `clamp(1px, ${100 / array.length}%, 100px)`;

  return (
    <div style={{height: "25vh", width: "15vw", margin: "3%", display: "flex", gap: `min(1%, ${larguraIndividual})`, alignItems: "flex-end", justifyContent: "center" }}>
      {array.map((value, idx) => {
        let estado = "default";
        //essa ordem de prioridade dos ifs é importante
        if (sortedIndices.has(idx)) estado = "sorted";
        else if (swappingIndices.has(idx)) estado = "swapping";
        else if (activeIndices.has(idx)) estado = "comparing";
        return <Bar key={idx} value={value} state={estado} width={larguraIndividual}/>
    })}
    </div>
  );
}

export default function App() {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState(new Set());
  const [swappingIndices, setSwappingIndices] = useState(new Set());
  const [sortedIndices, setSortedIndices] = useState(new Set());
  const [speed, setSpeed] = useState(200); //delay entre swaps em ms
  const SIZE = 50;

  useEffect(() => {
    generateArray();
  }, []);

  function generateArray() {
    const newArr = Array.from({ length: SIZE }, () => 0.05 + Math.random() *0.95);
    setArray(newArr);
    setActiveIndices(new Set());
    setSwappingIndices(new Set());
    setSortedIndices(new Set());
    setIsSorting(false);
  }

  async function bubbleSort() {
    setIsSorting(true);
    const arr = [...array]; //cópia mutável do array
    const size = arr.length;
    const sorted = new Set();

    for (let i = size-1; i > 0; i--) {
      let swappedThisTime = false;
      for (let j = 0; j < i; j++) {
        // marcar comparação
        setActiveIndices(new Set([j, j + 1]));
        await sleep(speed);

        if (arr[j] > arr[j+1]) {
          // marcar swapping
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setSwappingIndices(new Set([j, j + 1]));
          setArray([...arr]); // atualiza visual após swap
          swappedThisTime = true;

          await sleep(speed); // pausa para ver a troca
          setSwappingIndices(new Set()); // limpa o highlight do swap
        }
        // limpar highlight da comparação
        setActiveIndices(new Set());
      }
      //o elemento i agora está na posição correta (no final)
      sorted.add(i);
      setSortedIndices(new Set(sorted));

      // se não houve trocas nesta passada, vetor já está ordenado
      if (!swappedThisTime) {
        // marcar todo restante como sorted
        for (let k = 0; k <= i; k++) sorted.add(k);
        setSortedIndices(new Set(sorted));
        break;
      }
    }

    // garantir que 0 também fique marcado como sorted
    sorted.add(0);
    setSortedIndices(new Set(sorted));

    //resetar os "controles"
    setActiveIndices(new Set());
    setSwappingIndices(new Set());
    setIsSorting(false);
  }  

  return (
    <div id='app'>
      <h1>Visualizador de Ordenação</h1>

      <div >
        <button onClick={generateArray} disabled={isSorting}>Gerar Novo Array</button>
        <button onClick={bubbleSort} disabled={isSorting}>Ordenar</button>

        <label style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "1rem" }}>
          Velocidade:
          <input
            type="range"
            min="1"
            max="800"
            value={speed}
            disabled={isSorting}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
          <span>{speed} ms</span>
        </label>
      </div>

      <BarContainer array={array} activeIndices={activeIndices} swappingIndices={swappingIndices} sortedIndices={sortedIndices}/>
    </div>
  );
}
