// components/QuickSortVisualizer.js
import { useState, useEffect } from "react";
import BarContainer from "./BarContainer";
import { useQuickSort } from "../hooks/useQuickSort";

export default function QuickSortVisualizer({
  baseArray,
  speed,
  globalSortSignal,
  onFinish,
}) {
  const [array, setArray] = useState([]);
  const [pivot, setPivot] = useState(null);
  const [leftPtr, setLeftPtr] = useState(null);
  const [rightPtr, setRightPtr] = useState(null);
  const [swap, setSwap] = useState(new Set());
  const [sorted, setSorted] = useState(new Set());

  const quickSort = useQuickSort(
    array,
    setArray,
    setPivot,
    setLeftPtr,
    setRightPtr,
    setSwap,
    setSorted
  );

  useEffect(() => {
    if (baseArray.length > 0) {
      setArray([...baseArray]);
      setPivot(null);
      setLeftPtr(null);
      setRightPtr(null);
      setSwap(new Set());
      setSorted(new Set());
    }
  }, [baseArray]);

  useEffect(() => {
    if (baseArray.length > 0) {
      quickSort(speed, onFinish);
    }
  }, [globalSortSignal]);

  return (
    <div className="container">
      <h2>Quick Sort</h2>

      <BarContainer
        array={array}
        pivotIndex={pivot}
        leftIndex={leftPtr}
        rightIndex={rightPtr}
        swappingIndices={swap}
        sortedIndices={sorted}
      />
    </div>
  );
}
