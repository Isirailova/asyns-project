"use strict";

const breedSelect = document.getElementById("breedSelect");
const imgBox = document.getElementById("image-box");
const breedInfo = document.getElementById("breedInfo");
const goButton = document.getElementById("goButton");

const onImgLiked = () => {
  console.log("liked");
};

const getDogImages = async () => {
  try {
    const breed = breedSelect.value.toLowerCase();
    const response = await fetch(
      `https://dog.ceo/api/breed/${breed}/images/random/3`
    );
    const data = await response.json();

    imgBox.innerHTML = "";

    data.message.forEach((imageUrl) => {
      let dogImage = document.createElement("img");
      dogImage.src = imageUrl;
      dogImage.alt = `${breed} dog`;
      dogImage.style.width = "250px";
      dogImage.style.height = "220px";
      dogImage.style.padding = "10px";
      dogImage.onclick = onImgLiked;
      imgBox.appendChild(dogImage);
    });
    await getBreedInfo(breed);
  } catch (err) {
    console.log("error:", err);
  }
};

const getBreedInfo = async (breed) => {
  try {
    const response = await fetch(
      `https://api.thedogapi.com/v1/breeds/search?q=${breed}`
    );
    const data = await response.json();

    if (data.length > 0) {
      const breedInfoData = data[0];
      breedInfo.innerHTML = `
        <h2>${breedInfoData.name}</h2>
        <p>Breed Group: ${breedInfoData.breed_group}</p>
        <p>Life Span: ${breedInfoData.life_span}</p>
        <p>Temperament: ${breedInfoData.temperament}</p>
      `;
      breedInfo.classList.add("breed-info");
    } else {
      breedInfo.innerHTML = "<p>Breed information not found.</p>";
    }

    const style = document.createElement("style");
    style.innerHTML = `
      .breed-info {
        border: 1px solid #3d3a3a;
        padding: 10px;
        margin-top: 20px;
        border-radius: 5px;
        background-color: #f9f9f9;
        font-size: 17px;
        font-family: Didot, serif;
        background-color: hsla(0, 16%, 88%, 0.8);
      }
    `;
    document.head.appendChild(style);
  } catch (err) {
    console.error("Error fetching breed info:", err);
  }
};
goButton.addEventListener("click", getDogImages);
