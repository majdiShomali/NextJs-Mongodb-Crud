import React from 'react'
import TopicCard from '@/components/cards/TopicCard'
import Link from 'next/link'
import clsx from 'clsx'
import SearchInput from '@/components/input/SearchInput'
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const getTopics = async (page,limit,searchWord) => {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/topics/0/[${page},${limit},"${searchWord.toString()}"]`, {
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

const AllTopics = async({searchParams}) => {
    const page =parseInt(searchParams.page)
    const { topics,totalPages } = await getTopics(searchParams.page,2,searchParams.search);
  return (
    <>
    <SearchInput page={searchParams.page} perPage={2}/>
     <div className='flex space-x-6'>
            <Link
            href={`/allTopics?page=${page >1 ?page -1 :1}&search=${"_"}`}
            className={clsx(
                'rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800',
                page <= 1 && 'pointer-events-none opacity-50'
              )}

            >
              Previous
            </Link>
            <Link
            href={`/allTopics?page=${page < totalPages ? page+1 : page}&search=${" "}`}
              className={clsx(
                'rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800',
                page >= totalPages && 'pointer-events-none opacity-50'
              )}
            >
              Next
            </Link>
          </div>

          <div className="bg-gray-100 flex flex-wrap justify-center items-center gap-5 h-screen">
        <TopicCard topics={topics} />
      </div>
            </>
  )
}

export default AllTopics