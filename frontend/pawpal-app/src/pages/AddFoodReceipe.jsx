import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddReceipe() {
  const navigate = useNavigate();

  const [receipeData, setReceipeData] = useState({
    title: "",
    time: "",
    ingredients: [],
    instructions: "",
    file: null,
  });

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData
    const formData = new FormData();
    formData.append("title", receipeData.title);
    formData.append("time", receipeData.time);
    formData.append("ingredients", JSON.stringify(receipeData.ingredients));
    formData.append("instructions", receipeData.instructions);
    if (receipeData.file) {
      formData.append("file", receipeData.file);
    }

    try {
      await axios.post("http://localhost:5000/receipe", formData, {
        headers: {
            'Content-Type':'multipart/form-data' ,
          'authorization': `Bearer ${localStorage.getItem("token")}`,
          // Don't set Content-Type manually; Axios handles it
        },
      });
      alert("Recipe added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error uploading recipe:", error);
      alert("Failed to add recipe. Check console for details.");
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={onHandleSubmit}>
        <div className="form-control">
          <label>Title</label>
          <input
            type="text"
            value={receipeData.title}
            onChange={(e) => setReceipeData({ ...receipeData, title: e.target.value })}
          />
        </div>

        <div className="form-control">
          <label>Time</label>
          <input
            type="text"
            value={receipeData.time}
            onChange={(e) => setReceipeData({ ...receipeData, time: e.target.value })}
          />
        </div>

        <div className="form-control">
          <label>Ingredients (comma separated)</label>
          <input
            type="text"
            onChange={(e) =>
              setReceipeData({ ...receipeData, ingredients: e.target.value.split(",") })
            }
          />
        </div>

        <div className="form-control">
          <label>Instructions</label>
          <textarea
            value={receipeData.instructions}
            onChange={(e) => setReceipeData({ ...receipeData, instructions: e.target.value })}
          />
        </div>

        {/* <div className="form-control">
          <label>Upload Image</label>
          <input
            type="file"
            onChange={(e) => setReceipeData({ ...receipeData, file: e.target.files[0] })}
          />
        </div> */}

        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
}
