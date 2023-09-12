"use client";
import ADDProductForm from "@/components/products/ADDProductForm";
import { Suspense, useEffect, useState } from "react";
import TopicCard from "@/components/cards/TopicCard";
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

import useFetch from "@/hooks/useFetch";

// //redux//
// import { useSelector, useDispatch } from "react-redux";
import { fetchTopicsItems } from "../GlobalRedux/actions/getTopics";
// //redux//
import { useReduxAction } from "../../hooks/useReduxAction";
export default function AddTopic() {
  const [topicsChanged, setChanged] = useState([]);

  const onChange = (value) => {
    setChanged(value);
  };

  // const loadingJsx=(<div>loading+++++</div>)

  const { data, loading, error } = useFetch(
    `${NEXT_PUBLIC_API_URL}/topics`,
    topicsChanged
  );

  console.log(data, loading, "useFetch");

  // //redux//
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchTopicsItems());
  // }, [dispatch]);
  // const {
  //   loading: isLoading,
  //   data: itemsData,
  //   // error: fetchError,
  // } = useSelector((state) => state.topics);
  // console.log(itemsData, isLoading, "useRedux");
  // //redux//
  const { isLoading, itemsData, fetchError } = useReduxAction(
    fetchTopicsItems,
    (state) => state.topics,
    "isLoading",
    "itemsData",
    "fetchError"
  );
  console.log(itemsData, isLoading, "useRedux");

  return (
    <>
      <ADDProductForm onChange={onChange} />

      {/* <Suspense fallback={loadingJsx}>   */}
      <div className="flex flex-wrap justify-center gap-5">
        {loading ? (
          <div>Loading ...</div>
        ) : (
          <TopicCard topics={itemsData.topics} onChange={onChange} />
        )}
      </div>

      {/* </Suspense> */}
    </>
  );
}
