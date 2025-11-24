export function useHeapSort(array, setArray, setActive, setSwap, setSorted) {
  return async function heapSort(speed = 100, onFinish = null) {
    const arr = [...array];
    const n = arr.length;
    const sorted = new Set();

    async function heapify(n, i) {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      // marca o nó analisado
      setActive(new Set([i]));
      await new Promise(res => setTimeout(res, speed));

      if (left < n) {
        setActive(new Set([i, left]));
        await new Promise(res => setTimeout(res, speed));

        if (arr[left] > arr[largest]) largest = left;
      }

      if (right < n) {
        setActive(new Set([i, right]));
        await new Promise(res => setTimeout(res, speed));

        if (arr[right] > arr[largest]) largest = right;
      }

      if (largest !== i) {
        // highlight swap
        setSwap(new Set([i, largest]));

        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        setArray([...arr]);

        await new Promise(res => setTimeout(res, speed));
        setSwap(new Set());

        await heapify(n, largest);
      }

      setActive(new Set());
    }

    // construir heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(n, i);
    }

    // extração dos elementos
    for (let i = n - 1; i > 0; i--) {
      setSwap(new Set([0, i]));
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setArray([...arr]);

      await new Promise(res => setTimeout(res, speed));
      setSwap(new Set());

      sorted.add(i);
      setSorted(new Set(sorted));

      await heapify(i, 0);
    }

    // último elemento ordenado
    sorted.add(0);
    setSorted(new Set(sorted));

    if (onFinish) onFinish();
  };
}
