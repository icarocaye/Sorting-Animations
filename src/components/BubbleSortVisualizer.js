import { useState } from "react";
import BarContainer from "./BarContainer";
import { useBubbleSort } from "../hooks/useBubbleSort";

export default function BubbleSortVisualizer({ speed }) {
  const [isSorting, setIsSorting] = useState(false);

  const [array, setArray] = useState([]);
  const [active, setActive] = useState(new Set());
  const [swap, setSwap] = useState(new Set());
  const [sorted, setSorted] = useState(new Set());

  const bubbleSort = useBubbleSort(
    array,
    setArray,
    setActive,
    setSwap,
    setSorted,
    setIsSorting
  );

  return (
    <div className="container">
      <h2>Bubble Sort</h2>

      <BarContainer
        array={array}
        activeIndices={active}
        swappingIndices={swap}
        sortedIndices={sorted}
      />

      <button
        onClick={() => {
          const arr = Array.from({ length: 40 }, () => Math.random());
          setArray(arr);
          setActive(new Set());
          setSwap(new Set());
          setSorted(new Set());
        }}
        disabled={isSorting}
      >
        Novo Array
      </button>

      <button
        onClick={() => bubbleSort(speed)}
        disabled={isSorting || array.length === 0}
      >
        Ordenar
      </button>
    </div>
  );
}
