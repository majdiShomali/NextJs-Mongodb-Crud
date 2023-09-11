import React from "react";
import HeroSection from "@/components/home/HeroSection";
import TopicCard from "@/components/cards/TopicCard";

const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

const Home = async () => {
  const { topics } = await getTopics();
  return (
    <>
      <HeroSection />
      <div className="bg-gray-100 flex flex-wrap justify-center items-center gap-5 h-screen">
        <TopicCard topics={topics} />
      </div>
    </>
  );
};

export default Home;
