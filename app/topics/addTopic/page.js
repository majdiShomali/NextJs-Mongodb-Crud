"use client";
import ADDProductForm from "@/components/products/ADDProductForm";
import { Suspense, useEffect, useState } from "react";
import TopicCard from "@/components/cards/TopicCard";
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

// import useFetch from "@/hooks/useFetch";

import { fetchTopicsItems } from "@/app/GlobalRedux/actions/getTopics";

import { useReduxAction } from "@/hooks/useReduxAction";
export default function AddTopic() {
  const [topicsChanged, setChanged] = useState([]);


  // const { data, loading, error } = useFetch(
  //   `${NEXT_PUBLIC_API_URL}/topics`,
  //   topicsChanged
  // );

  // console.log(data, loading, "useFetch");

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
      <ADDProductForm />
      <div className="flex flex-wrap justify-center gap-5">
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <TopicCard topics={itemsData.topics} />
        )}
      </div>
    </>
  );
}
