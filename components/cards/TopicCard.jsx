"use client";
import { Card } from "@material-tailwind/react";
import React from "react";
import EditProductForm from "../products/EditProductForm";
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
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

  const onChangeN =(value)=>{
    onChange(value)
  }
  return (
    <>
      {topics?.map((topic) => {
        return (
          <Card key={topic._id}
          
           >
            <div className=" w-full flex justify-around">

            <Icon path={mdiDelete}  onClick={()=>handleDelete(topic._id)} color={"red"} size={1.5}/>
            <EditProductForm item={topic} onChangeN={onChangeN}/>
            </div>
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
