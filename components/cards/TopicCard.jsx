"use client";
import { Card } from "@material-tailwind/react";
import React from "react";
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const TopicCard = ({ topics,onChange }) => {
  const handleDelete = async (id)=>{

      const confirmed = confirm("Are you sure?");
  
      if (confirmed) {
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/topics?id=${id}`, {
          method: "DELETE",
        });
  
        if (res.ok) {
          onChange(res)
        }
      }

  }
  return (
    <>
      {topics?.map((topic) => {
        return (
          <Card key={topic._id} onClick={()=>handleDelete(topic._id)}>
            <h1>{topic.description}</h1>
            <h1>{topic.title}</h1>
            <h1>{topic._id}</h1>
          </Card>
        );
      })}
    </>
  );
};

export default TopicCard;
