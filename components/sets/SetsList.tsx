import { useExerciseSlice } from "@/store/slices/exerciseSlice";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import SetItem from "./setItem";

interface Props {}

const dataTableStyles = StyleSheet.create({
  main: {},
  scrollView: {
    width: "100%",
    height: 200,
    borderColor: "rgba(28, 27, 31, 0.6)",
    borderWidth: 1,
    borderRadius: 8,
  },
});

function SetsList(props: Props) {
  const {} = props;
  // const currentExerciseSets = useSetSlice((state) => state.sets);
  const activeExerciseSets = useExerciseSlice(
    (state) => state.activeExercise
  );
  return (
    <ScrollView bounces style={dataTableStyles.scrollView}>
      <DataTable style={dataTableStyles.main}>
        <DataTable.Header>
          <DataTable.Title>Set №</DataTable.Title>
          <DataTable.Title>Rest Time</DataTable.Title>
        </DataTable.Header>
        {activeExerciseSets?.sets.map((item, i) => (
          <SetItem setItem={item} key={item.id} index={i} />
        ))}
      </DataTable>
    </ScrollView>
  );
}

export default SetsList;
