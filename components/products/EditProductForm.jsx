"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState, useEffect, useContext } from "react";
import Icon from "@mdi/react";
import { mdiImageEdit } from "@mdi/js";
import {
  Card,
  Input,
  // Checkbox,
  Button,
  Textarea,
  // Typography,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
//redux//
import { useSelector, useDispatch } from 'react-redux';
import {fetchTopicsItems} from "@/app/GlobalRedux/actions/getTopics"
//redux//
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: " solid #f2f2f2",
  boxShadow: 3,
  p: 4,
};
const EditProductForm = ({ item }) => {
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;
       //redux//
       const dispatch = useDispatch();
       //redux//
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


useEffect(()=>{
  setTitle(item.title)
  setDescription(item.description)
},[item])

  const showSuccessAlert = (message) => {
    Swal.fire({
      title: message,
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title, description, item._id);
    try {
      const res = await fetch(`http://localhost:3000/api/topics/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }
      dispatch(fetchTopicsItems())
      handleClose();
      showSuccessAlert("Done")
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <>
         <Icon
        onClick={handleOpen}
        color={"blue"}
        size={1.5}
        path={mdiImageEdit}

      />
  
    <div className="">


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit} className="  ">
            <div className="mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                type="text"
                name="Title"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Input
                size="lg"
                type="text"
                name="description"
                label="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <br></br>
            <div className="flex justify-between">
              <Button
                type="submit"
                className=" w-28 border-solid border-[#E8AA42] border-2 text-[#E8AA42] hover:bg-[#E8AA42] hover:text-[#ffffff]"
                variant="text"
              >
                Edit
              </Button>
              <Button
                className=" w-28 border-solid border-[#7C9070] border-2 text-[#7C9070] hover:bg-[#7C9070] hover:text-[#ffffff]"
                variant="text"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
    </>
  );
};

export default EditProductForm;
