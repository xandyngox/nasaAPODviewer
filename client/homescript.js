console.log("script connected.");

var heart_status = 0; // 0 is empty and 1 is filled.

document.getElementById("heart-button").addEventListener("click", () => {
  let heart = document.getElementById("heart-button");
  if (heart_status == 0) {
    heart.src = "static/heart-filled.png";
    heart_status = 1;
    async function fetchThing(data = {}) {
      const a = await fetch("http://localhost:8080/addname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((result) => {
        return result.json();
      });
    }
    const dateText = document.getElementById("apod-date").innerHTML;
    fetchThing({
      image_url: urlText,
      date: dateText,
    });
  } else {
    heart_status = 0;
    heart.src = "static/heart.png";
    // TODO: update the database and un-mark this image as a favorite image.
  }
  console.log(`heart status: ${heart_status}`);
});

document.getElementById("next-button").addEventListener("click", () => {
  document.getElementById("heart-button").src = "static/heart.png";
  heart_status = 0;
  fetchData();
});

document.getElementById("favorites-button").addEventListener("click", () => {
  location.href = "./favorite.html";
});

function fetchData() {
  try {
    fetch(
      "https://api.nasa.gov/planetary/apod?api_key=MqXpYqzwUrpABPyXDResD6ZFeGFInDMqWPwr9pDU&count=1"
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json[0]);
        displaydata(json[0]);
      });
  } catch (error) {
    console.log(error);
  }
}

const date = document.getElementById("apod-date");
const apod_p = document.getElementById("apod-p");
const title = document.getElementById("apod-title");
const mediaSection = document.getElementById("media-section");
var urlText = "";

function displaydata(data) {
  date.innerHTML = data.date;
  apod_p.innerHTML = data.explanation;
  title.innerHTML = data.title;

  const imageSection = `<a id="hdimg" href="" target="-blank">
     <div class="image-div">
     <img id="image_of_the_day" src="" alt="image-by-nasa">
     </div>
     </a>`;

  const videoSection = `<div class="video-div"> <iframe id="videoLink" src="" frameborder="0"></iframe></div>`;
  if (data.media_type == "video") {
    mediaSection.innerHTML = videoSection;
    document.getElementById("videoLink").src = data.url;
  } else {
    mediaSection.innerHTML = imageSection;
    document.getElementById("hdimg").href = data.hdurl;
    document.getElementById("image_of_the_day").src = data.url;
  }
  urlText = data.url;
}
fetchData();
