import { useState, useEffect } from "react";
import BarContainer from "./BarContainer";
import { useMergeSort } from "../hooks/useMergeSort";

export default function MergeSortVisualizer({ baseArray, speed, globalSortSignal, onFinish }) {
  const [array, setArray] = useState([]);
  const [active, setActive] = useState(new Set());
  const [swap, setSwap] = useState(new Set());
  const [sorted, setSorted] = useState(new Set());

  const mergeSort = useMergeSort(
    array,
    setArray,
    setActive,
    setSwap,
    setSorted
  );

  useEffect(() => {
    if (baseArray.length > 0) {
      setArray([...baseArray]);
      setActive(new Set());
      setSwap(new Set());
      setSorted(new Set());
    }
  }, [baseArray]);

  useEffect(() => {
    if (baseArray.length > 0) {
      mergeSort(speed, onFinish);
    }
  }, [globalSortSignal]);

  return (
    <div className="container">
      <h2>Merge Sort</h2>

      <BarContainer
        array={array}
        activeIndices={active}
        swappingIndices={swap}
        sortedIndices={sorted}
      />
    </div>
  );
}
