import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    const getBlogDetail = async () => {
      try {
        const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
        if (data?.success) {
          setBlog(data?.blog);
          setInputs({
            title: data?.blog.title,
            description: data?.blog.description,
            image: data?.blog.image,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getBlogDetail(); // Call the function directly here

    // Rest of your useEffect logic
  }, [id]);

  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Rest of your form components */}
      </form>
    </div>
  );
};

export default BlogDetails;
