import './App.css';
import { useState, useEffect } from 'react';
import BubbleSortVisualizer from './components/BubbleSortVisualizer';
import QuickSortVisualizer from './components/QuickSortVisualizer';
import InsertionSortVisualizer from './components/InsertionSortVisualizer';
import MergeSortVisualizer from './components/MergeSortVisualizer';
import HeapSortVisualizer from './components/HeapSortVisualizer';
import RadixSortVisualizer from './components/RadixSortVisualizer';

export default function App() {
  const TOTAL_ALGOS = 6; //quantidade de algoritmos no app
  const TOTAL_LENGTH = 100; //quantidade de elementos no array

  const [masterArray, setMasterArray] = useState([]);
  const [speed, setSpeed] = useState(200);
  const [isSorting, setIsSorting] = useState(false);
  const [sortSignal, setSortSignal] = useState(0);
  const [finished, setFinished] = useState(0);

  //gerar array aleatório
  function generateArray() {
    const arr = Array.from({ length: TOTAL_LENGTH }, () => Math.random());
    setMasterArray(arr);
  }

  //gerar array invertido
  function generateReversed() {
    const arr = [];
    for (let i = TOTAL_LENGTH; i >= 1; i--) {
      arr.push(i / TOTAL_LENGTH);
    }
    setMasterArray(arr);
  }

  function startSorting() {
    setIsSorting(true);
    setSortSignal(prev => prev + 1);  // avisa os filhos para começar
  }

  function finish() {
    setFinished(prev => prev + 1);
  }

  useEffect(() => {
    if (finished >= TOTAL_ALGOS) {
      setIsSorting(false);
    }
  }, [finished]);

  return (
    <div id='app'>
      <h1>Visualizador de Algoritmos de Ordenação</h1>

      <div style={{display: "flex", width: "30vw", justifyContent: "center"}}>
        <button onClick={generateArray} disabled={isSorting}>Novo Array</button>

        <button onClick={generateReversed} disabled={isSorting}>Arranjo Inverso</button>

        <button onClick={startSorting} disabled={isSorting}>Ordenar</button>
      </div>
      
      <div className='container'>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <BubbleSortVisualizer baseArray={masterArray} speed={speed} globalSortSignal={sortSignal} onFinish={finish}/>
          <InsertionSortVisualizer baseArray={masterArray} speed={speed} globalSortSignal={sortSignal} onFinish={finish}/>
          <RadixSortVisualizer baseArray={masterArray} speed={speed} globalSortSignal={sortSignal} onFinish={finish}/>
        </div>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <QuickSortVisualizer baseArray={masterArray} speed={speed} globalSortSignal={sortSignal} onFinish={finish}/>
          <MergeSortVisualizer baseArray={masterArray} speed={speed} globalSortSignal={sortSignal} onFinish={finish}/>
          <HeapSortVisualizer baseArray={masterArray} speed={speed} globalSortSignal={sortSignal} onFinish={finish}/>
        </div>
      </div>

      <label style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "1rem" }}>
          Velocidade:
          <input
            type="range"
            min="1"
            max="800"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isSorting}
          />
          <span>{speed} ms</span>
      </label>
    </div>
  );
}
