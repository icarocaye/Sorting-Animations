// components/RadixSortVisualizer.js
import { useState, useEffect } from "react";
import BarContainer from "./BarContainer";
import { useRadixSort } from "../hooks/useRadixSort";

export default function RadixSortVisualizer({ baseArray, speed, globalSortSignal, onFinish }) {
  const [array, setArray] = useState([]);
  const [active, setActive] = useState(new Set());
  const [swap, setSwap] = useState(new Set());
  const [sorted, setSorted] = useState(new Set());

  const radixSort = useRadixSort(
    array,
    setArray,
    setActive,
    setSwap,
    setSorted
  );

  useEffect(() => {
    if (baseArray && baseArray.length > 0) {
      setArray([...baseArray]);
      setActive(new Set());
      setSwap(new Set());
      setSorted(new Set());
    }
  }, [baseArray]);

  useEffect(() => {
    if (baseArray && baseArray.length > 0) {
      radixSort(speed, onFinish);
    }
  }, [globalSortSignal]);

  return (
    <div className="container">
      <h2>Radix Sort</h2>
      <BarContainer
        array={array}
        activeIndices={active}
        swappingIndices={swap}
        sortedIndices={sorted}
      />
    </div>
  );
}
