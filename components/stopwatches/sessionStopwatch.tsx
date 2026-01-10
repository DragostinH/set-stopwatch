import { useSessionStopwatchSlice } from "@/store/slices/sessionStopwatchSlice";
import React from "react";
import { Stopwatch } from "./stopwatch";

interface SessionStopwatchProps {}

function SessionStopwatch(props: SessionStopwatchProps) {
  const {} = props;
  const sessionElapsed = useSessionStopwatchSlice((state)=>{state.sessionElapsed});
  const setSessionElapsed = useSessionStopwatchSlice((state)=>{state.setSessionElapsed});
    

  return <Stopwatch elapsed={0} hasMilliseconds={false} />;
}

export default SessionStopwatch;
