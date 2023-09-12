import React from "react";
import HeroSection from "@/components/home/HeroSection";
import TopicCard from "@/components/cards/TopicCard";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const getTopics = async () => {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/topics/0/[1,5]`, {
      // cache:"force-cache",//SSG getStaticSideProps
      // cache: "no-store", //SSR getServerSideProps
      next:{
       revalidate:20 //ISR===== ssr with sec
      },
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
  const { topics,totalPages } = await getTopics();

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


