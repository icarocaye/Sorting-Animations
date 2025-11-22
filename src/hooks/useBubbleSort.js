export function useBubbleSort(array, setArray, setActive, setSwap, setSorted, setIsSorting) {
  return async function bubbleSort(speed = 100) {
    setIsSorting(true);

    const arr = [...array];
    const size = arr.length;
    const sorted = new Set();

    for (let i = size - 1; i > 0; i--) {
      let swapped = false;

      for (let j = 0; j < i; j++) {
        setActive(new Set([j, j + 1]));
        await new Promise(res => setTimeout(res, speed));

        if (arr[j] > arr[j + 1]) {
          setSwap(new Set([j, j + 1]));
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          swapped = true;

          await new Promise(res => setTimeout(res, speed));
          setSwap(new Set());
        }

        setActive(new Set());
      }

      sorted.add(i);
      setSorted(new Set(sorted));

      if (!swapped) {
        for (let k = 0; k <= i; k++) sorted.add(k);
        setSorted(new Set(sorted));
        break;
      }
    }

    sorted.add(0);
    setSorted(new Set(sorted));

    setIsSorting(false);
  };
}