// hooks/useRadixSort.js
export function useRadixSort(array, setArray, setActive, setSwap, setSorted) {
  return async function radixSort(speed = 100, onFinish = null) {
    if (!array || array.length <= 1) {
      if (onFinish) onFinish();
      return;
    }

    const wait = (ms) => new Promise((r) => setTimeout(r, ms));

    // --- construir chaves inteiras ---
    function decimalPlaces(x) {
      const s = String(x);
      if (s.indexOf('e') !== -1) return 3;
      const parts = s.split('.');
      return parts[1] ? parts[1].length : 0;
    }

    const maxDecimals = Math.min(
      5,
      Math.max(...array.map((v) => decimalPlaces(v)))
    );
    const scale = Math.pow(10, maxDecimals || 3);

    let arr = array.map((v) => ({ key: Math.round(v * scale), val: v }));

    // deslocar negativos
    const minKey = Math.min(...arr.map((o) => o.key));
    const offset = minKey < 0 ? -minKey : 0;
    if (offset) arr = arr.map((o) => ({ key: o.key + offset, val: o.val }));

    const n = arr.length;

    // quantos dígitos?
    const maxKey = Math.max(...arr.map((o) => o.key));
    let exp = 1;

    while (Math.floor(maxKey / exp) > 0) {
      const buckets = Array.from({ length: 10 }, () => []);

      // distribuir para os buckets
      for (let i = 0; i < n; i++) {
        setActive(new Set([i])); // destaque de leitura
        await wait(speed);

        const digit = Math.floor(arr[i].key / exp) % 10;

        // --- MICRO PAUSA AQUI ---
        // cada vez que um elemento é colocado no bucket
        buckets[digit].push(arr[i]);
        await wait(speed); // nova pausa de animação

        setActive(new Set());
      }

      // recolher
      let idx = 0;
      for (let d = 0; d < 10; d++) {
        for (const item of buckets[d]) {
          setSwap(new Set([idx]));
          arr[idx] = item;

          setArray(arr.map((o) => o.val));
          await wait(speed);

          setSwap(new Set());
          idx++;
        }
      }

      exp *= 10;
    }

    const sortedSet = new Set(Array.from({ length: n }, (_, i) => i));
    setSorted(sortedSet);

    if (onFinish) onFinish();
  };
}
