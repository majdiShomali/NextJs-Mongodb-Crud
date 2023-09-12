import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await connectMongoDB();
  try {
    
    const x  = params ? JSON.parse(params.num) :[]
    const page = x ? x[0] : 1;
  const perPage = x ? x[1] : 5;
  const searchWord = x ? x[2] : "_";
  console.log(searchWord)
  // Fetch the total number of topics
  const totalTopics = await Topic.countDocuments();

  const topics = await Topic.find()
    .skip((parseInt(page) - 1) * parseInt(perPage))
    .limit(parseInt(perPage));

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalTopics / perPage);

  return NextResponse.json({ topics, totalPages });
  } catch (error) {
    console.log(error)
  }
  
}
