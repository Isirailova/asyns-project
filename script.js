"use strict";
const getBtn = document.getElementById("getDog");
const btn = document.querySelector("button");

const onImgLiked = () => {
  console.log("liked");
};

const getDogImages = async () => {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();

    btn.textContent = "Loading...";

    const imgBox = document.getElementById("image-box");
    let dogImage = document.createElement("img");
    dogImage.src = data.message;
    dogImage.alt = "random dog";
    dogImage.style.width = "200px";
    dogImage.onclick = onImgLiked;
    dogImage.style.height = "150px";
    dogImage.style.padding = "10px";
    imgBox.append(dogImage);
    btn.textContent = "Get Image";
  } catch (err) {
    console.log("error:", err);
  }
};
