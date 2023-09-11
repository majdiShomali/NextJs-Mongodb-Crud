"use client";
import ADDProductForm from "@/components/products/ADDProductForm";
import { Suspense, useEffect, useState } from "react";
import TopicCard from "@/components/cards/TopicCard";
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
export default function AddTopic() {
  const [topics, setTopics] = useState([]);
  const [topicsChanged, setChanged] = useState([]);

  async function fetchData() {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/topics`);
    const { topics } = await res.json();
    setTopics(topics);
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

   <TopicCard topics={topics} onChange={onChange}/>
      </div>

      {/* </Suspense> */}

    </>
  );
}
