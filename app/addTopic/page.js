"use client";
import ADDProductForm from "@/components/products/ADDProductForm";
import { Suspense, useEffect, useState } from "react";
import TopicCard from "@/components/cards/TopicCard";
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
export default function AddTopic() {
  const [topics, setTopics] = useState([]);
  const [topicsLoading, setTopicsLoading] = useState(false);
  const [topicsChanged, setChanged] = useState([]);

  async function fetchData() {
    setTopicsLoading(true);
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/topics`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const { topics } = await res.json();
      setTopics(topics);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setTopicsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [topicsChanged]);

  const onChange = (value) => {
    setChanged(value);
  };

  // const loadingJsx=(<div>loading+++++</div>)

  return (
    <>
      <ADDProductForm onChange={onChange} />

      {/* <Suspense fallback={loadingJsx}>   */}
      <div className="flex flex-wrap justify-center gap-5">
        {topicsLoading ? (
          <div>Loading ...</div>
        ) : (
          <TopicCard topics={topics} onChange={onChange} />
        )}
      </div>

      {/* </Suspense> */}
    </>
  );
}
