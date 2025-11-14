import './App.css';
import { useEffect, useState } from "react";

function Bar({ value }) {
  return (
    <div
      style={{
        height: `${value * 100}%`,
        width: "1vw",
        backgroundColor: "aqua",
        margin: "1px"
      }}
    />
  );
}

function BarContainer({ array }) {
  return (
    <div style={{height: "25vh", margin: "5%", display: "flex", alignItems: "flex-end" }}>
      {array.map((value, idx) => (
        <Bar key={idx} value={value} />
      ))}
    </div>
  );
}

export default function App() {
  const [array, setArray] = useState([]);

  useEffect(() => {
    generateArray();
  }, []);

  function generateArray() {
    const size = 10; /* TAMANHO DO VETOR */
    const newArr = Array.from({ length: size }, () => Math.random());
    setArray(newArr);
  }

  return (
    <div id='app'>
      <h1>Visualizador de Ordenação</h1>

      <BarContainer array={array} />

      <button onClick={generateArray}>Gerar Novo Array</button>
    </div>
  );
}
