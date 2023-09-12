// export default (req, res) => {
//     res.status(200).json({ message: 'index, API!' });
//   };

import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, description } = await request.json();
  await connectMongoDB();
  await Topic.create({ title, description });
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}

export async function GET(request, { params }) {
  const page = params ? parseInt((JSON.parse(params.num))[0]) : 1;
  const perPage = params ? parseInt((JSON.parse(params.num))[1]) : 5;

  // Fetch the total number of topics
  const totalTopics = await Topic.countDocuments();

  const topics = await Topic.find()
    .skip((page - 1) * perPage)
    .limit(perPage);

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalTopics / perPage);

  return NextResponse.json({ topics, totalPages });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}