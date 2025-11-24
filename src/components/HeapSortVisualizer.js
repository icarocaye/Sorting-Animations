import { useState, useEffect } from "react";
import BarContainer from "./BarContainer";
import { useHeapSort } from "../hooks/useHeapSort";

export default function HeapSortVisualizer({ baseArray, speed, globalSortSignal, onFinish }) {
  const [array, setArray] = useState([]);
  const [active, setActive] = useState(new Set());
  const [swap, setSwap] = useState(new Set());
  const [sorted, setSorted] = useState(new Set());

  const heapSort = useHeapSort(
    array,
    setArray,
    setActive,
    setSwap,
    setSorted
  );

  // reset visuals on new array
  useEffect(() => {
    if (baseArray.length > 0) {
      setArray([...baseArray]);
      setActive(new Set());
      setSwap(new Set());
      setSorted(new Set());
    }
  }, [baseArray]);

  // run sorting when global signal updates
  useEffect(() => {
    if (baseArray.length > 0) {
      heapSort(speed, onFinish);
    }
  }, [globalSortSignal]);

  return (
    <div className="container">
      <h2>Heap Sort</h2>

      <BarContainer
        array={array}
        activeIndices={active}
        swappingIndices={swap}
        sortedIndices={sorted}
      />
    </div>
  );
}
