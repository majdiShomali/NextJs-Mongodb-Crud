import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await connectMongoDB();
  try {
    const x = params ? JSON.parse(params.num) : [];
    const page = x ? x[0] : 1;
    const perPage = x ? x[1] : 5;
    const searchChar = x ? x[2] : ""; 

    let query = {};

    if (searchChar) {
      query = {
        title: { $regex: `.*${searchChar}.*`, $options: "i" }, 
      };
    }


    const totalTopics = await Topic.countDocuments(query);

    const topics = await Topic.find(query)
      .skip((parseInt(page) - 1) * parseInt(perPage))
      .limit(parseInt(perPage));


    const totalPages = Math.ceil(totalTopics / perPage);

    console.log(totalTopics);

    return NextResponse.json({ topics, totalPages });
  } catch (error) {
    console.log(error);
  }
}
