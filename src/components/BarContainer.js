function Bar({ value, state, width }) {
  const baseStyle = {
    height: `${value * 100}%`,
    width: width,
    flexShrink: 0,
    display: "inline-block",
    alignSelf: "flex-end",
  };

  let backgroundColor = "aqua";

  if (state === "sorted") backgroundColor = "limegreen";
  else if (state === "swapping") backgroundColor = "crimson";
  else if (state === "pivot") backgroundColor = "black";
  else if (state === "left") backgroundColor = "darkblue";
  else if (state === "right") backgroundColor = "hotpink";
  else if (state === "comparing") backgroundColor = "orange";

  return <div style={{ ...baseStyle, backgroundColor }} />;
}

export default function BarContainer({
  array,
  activeIndices = new Set(),      // bubble sort
  swappingIndices = new Set(),    // ambos
  sortedIndices = new Set(),      // ambos
  pivotIndex = null,              // quicksort
  leftIndex = null,               // quicksort
  rightIndex = null,              // quicksort
}) {
  const larguraIndividual = `clamp(1px, ${100 / array.length}%, 100px)`;

  return (
    <div
      style={{
        height: "25vh",
        width: "15vw",
        margin: "3%",
        display: "flex",
        gap: `min(1%, ${larguraIndividual})`,
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      {array.map((value, idx) => {
        let estado = "default";

        // ORDEM DE PRIORIDADE — MUITO IMPORTANTE!
        if (activeIndices.has(idx)) estado = "comparing";
        else if (sortedIndices.has(idx)) estado = "sorted";
        else if (swappingIndices.has(idx)) estado = "swapping";
        else if (idx === pivotIndex) estado = "pivot";
        else if (idx === leftIndex) estado = "left";
        else if (idx === rightIndex) estado = "right";

        return (
          <Bar
            key={idx}
            value={value}
            state={estado}
            width={larguraIndividual}
          />
        );
      })}
    </div>
  );
}