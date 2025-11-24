import { useState, useEffect } from "react";
import BarContainer from "./BarContainer";
import { useInsertionSort } from "../hooks/useInsertionSort";

export default function InsertionSortVisualizer({
  baseArray,
  speed,
  globalSortSignal,
  onFinish
}) {
  const [array, setArray] = useState([]);
  const [active, setActive] = useState(new Set());
  const [swap, setSwap] = useState(new Set());
  const [sorted, setSorted] = useState(new Set());

  const insertionSort = useInsertionSort(
    array,
    setArray,
    setActive,
    setSwap,
    setSorted
  );

  // Quando clicar em Novo Array
  useEffect(() => {
    if (baseArray.length > 0) {
      setArray([...baseArray]);
      setActive(new Set());
      setSwap(new Set());
      setSorted(new Set());
    }
  }, [baseArray]);

  // Quando o sinal global for alterado → iniciar ordenação
  useEffect(() => {
    if (baseArray.length > 0) {
      insertionSort(speed, onFinish);
    }
  }, [globalSortSignal]);

  return (
    <div className="container">
      <h2>Insertion Sort</h2>

      <BarContainer
        array={array}
        activeIndices={active}
        swappingIndices={swap}
        sortedIndices={sorted}
      />
    </div>
  );
}
