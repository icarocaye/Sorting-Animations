export function useInsertionSort(array, setArray, setActive, setSwap, setSorted) {
  return async function insertionSort(speed = 100, onFinish = null) {
    
    const arr = [...array];
    const sorted = new Set();

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      // marca elemento atual como "swapping" (o key)
      setSwap(new Set([i]));
      await new Promise(res => setTimeout(res, speed));

      while (j >= 0 && arr[j] > key) {
        // marca comparação
        setActive(new Set([j, j+1]));
        await new Promise(res => setTimeout(res, speed));

        arr[j + 1] = arr[j];
        setArray([...arr]);

        j--;
      }

      // inserir o key na posição correta
      arr[j + 1] = key;
      setArray([...arr]);

      // limpa desta iteração
      setActive(new Set());
      setSwap(new Set());

      // marca este índice como ordenado
      sorted.add(i);
      setSorted(new Set(sorted));

      await new Promise(res => setTimeout(res, speed));
    }

    // todo array agora está ordenado
    for (let k = 0; k < arr.length; k++) sorted.add(k);
    setSorted(new Set(sorted));

    if (onFinish) onFinish();
  };
}
