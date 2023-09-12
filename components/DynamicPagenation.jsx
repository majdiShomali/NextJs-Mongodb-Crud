"use client"
import Pagination from "@mui/material/Pagination";
import { useState } from 'react';

const DynamicPagenation = ({itemsPerPageD,totalPages}) => {

    const [currentPage, setCurrentPage] = useState(1);


    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
        // router.push(`/`); 

        console.log(pageNumber)
      };
      

  return (
    <div className="w-full flex items-center justify-center mt-5">
    {
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    }
  </div>
  )
}

export default DynamicPagenation