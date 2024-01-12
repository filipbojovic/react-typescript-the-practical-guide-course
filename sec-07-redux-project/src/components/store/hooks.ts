import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "./store.ts";

type DispatchFunction = () => AppDispatch;

export const useCartDispatch: DispatchFunction = useDispatch;

// useSelector returns generic data and a related type is a type which describes
// data which are stored inside store
// by using useCartSelect we fetch data from the store
export const useCartSelector: TypedUseSelectorHook<RootState> = useSelector;
