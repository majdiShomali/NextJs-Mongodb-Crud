"use client"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useReduxAction(action, selector, loadingPropName = "loading", dataPropName = "data", errorPropName = "error") {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(selector);

  useEffect(() => {
    dispatch(action());
  }, [dispatch, action]);

  return {
    [loadingPropName]: loading,
    [dataPropName]: data,
    [errorPropName]: error,
  };
}
