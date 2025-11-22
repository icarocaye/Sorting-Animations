function Bar({ value, state, width }) {
  const baseStyle = {
    height: `${value * 100}%`,
    width: width,
    flexShrink: 0,
    display: "inline-block",
    alignSelf: "flexend",
  }

  let backgroundColor = "aqua";
  if (state === "comparing") backgroundColor = "orange";
  if (state === "swapping") backgroundColor = "red";
  if (state === "sorted") backgroundColor = "limegreen";

  return (
    <div
      style={{ ...baseStyle, backgroundColor }}
    />
  );
}

export default function BarContainer({ array, activeIndices, swappingIndices, sortedIndices }) {
  const larguraIndividual = `clamp(1px, ${100 / array.length}%, 100px)`;

  return (
    <div style={{height: "25vh", width: "15vw", margin: "3%", display: "flex", gap: `min(1%, ${larguraIndividual})`, alignItems: "flex-end", justifyContent: "center" }}>
      {array.map((value, idx) => {
        let estado = "default";
        //essa ordem de prioridade dos ifs é importante
        if (sortedIndices.has(idx)) estado = "sorted";
        else if (swappingIndices.has(idx)) estado = "swapping";
        else if (activeIndices.has(idx)) estado = "comparing";
        return <Bar key={idx} value={value} state={estado} width={larguraIndividual}/>
    })}
    </div>
  );
}