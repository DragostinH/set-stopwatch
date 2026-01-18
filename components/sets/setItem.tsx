import React from "react";
import { DataTable } from "react-native-paper";

interface Props {
  index: number;
  setItem: {
    id: string;
    time: number;
    activeSet: boolean;
  };
}

function setTimeConverter(time: number, index: number) {
  if (index < 1) return;
  const elapsed = Date.now() - time;

  const ms = Math.floor((elapsed % 1000) / 10);
  const ss = Math.floor(elapsed / 1000) % 60;
  const mm = Math.floor(elapsed / 60000) % 60;
  const hh = Math.floor(elapsed / 3600000);
  let output = "";

  if (hh > 0) output += `${hh.toString().padStart(2, "0")}:`;
  output += `${mm.toString().padStart(2, "0")}:`;
  output += `${ss.toString().padStart(2, "0")}`;
  output += `:${ms.toString().padStart(2, "0")}`;

  return output;
}

function SetItem(props: Props) {
  const { setItem, index } = props;

  return (
    <DataTable.Row
      key={setItem.id}
      style={{
        backgroundColor: setItem.activeSet ? "wheat" : undefined,
      }}
    >
      <DataTable.Cell>{index + 1}</DataTable.Cell>
      <DataTable.Cell>
        {setItem.time < 1 ? "N/A" : null}
        {setTimeConverter(setItem.time, index)}
      </DataTable.Cell>
    </DataTable.Row>
  );
}

export default SetItem;
