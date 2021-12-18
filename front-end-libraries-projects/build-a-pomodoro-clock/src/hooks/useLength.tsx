import { Dispatch, useCallback, useReducer } from "react";

const MAX_LENGTH_IN_SECONDS = 3600; // 60 minutes
const useLength = (defaultValue: number): [number, Dispatch<ActionType>] => {
  const isNotValid = useCallback(
    (a: number) => a > MAX_LENGTH_IN_SECONDS || a <= 0,
    []
  );

  const [value, dispatch] = useReducer((state: number, action: ActionType) => {
    switch (action) {
      case "increment":
        return isNotValid(state + 60) ? state : state + 60;
      case "decrement":
        return isNotValid(state - 60) ? state : state - 60;
      case "reset":
        return defaultValue;
      default:
        return state;
    }
  }, defaultValue);

  return [value, dispatch];
};

type ActionType = "increment" | "decrement" | "reset";
export default useLength;
