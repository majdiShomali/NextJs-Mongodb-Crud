"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

//redux//
import { useSelector, useDispatch } from 'react-redux';
import {fetchTopicsItems} from "@/app/GlobalRedux/actions/getTopics"
//redux//
const ADDProductForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();
      //redux//
      const dispatch = useDispatch();
      //redux//
      
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!title || !description) {
          alert("Title and description are required.");
          return;
        }
    
        try {
          const res = await fetch(`${NEXT_PUBLIC_API_URL}/topics`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ title, description }),
          });
    
          if (res.ok) {
            // router.push("/");
            dispatch(fetchTopicsItems())
          } else {
            throw new Error("Failed to create a topic");
          }
        } catch (error) {
          console.log(error);
        }
      };



  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
    <input
      onChange={(e) => setTitle(e.target.value)}
      value={title}
      className="border border-slate-500 px-8 py-2"
      type="text"
      placeholder="Topic Title"
    />

    <input
      onChange={(e) => setDescription(e.target.value)}
      value={description}
      className="border border-slate-500 px-8 py-2"
      type="text"
      placeholder="Topic Description"
    />

    <button
      type="submit"
      className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
    >
      Add Topic
    </button>
  </form>
  )
}

export default ADDProductForm