(() => {
  // makeAPOD is used to create a APOD node in the following format:
  // <div class="apod">
  //     <small id="apod-date"> 02-21-2021 </small>
  //     <img id="apod-image" width="200px" src="https://apod.nasa.gov/apod/image/2102/rosette_goldman_960.jpg" alt="">
  // </div>
  const makeAPOD = (url, date) => {
    var div = document.createElement("div");
    div.className = "apod";
    var small = document.createElement("small");
    small.id = "apod-date";
    small.innerText = date;
    var img = document.createElement("img");
    img.src = url;
    img.style.width = "200px";
    div.appendChild(small);
    div.appendChild(img);
    return div;
  };

  // Here the apods are filled with dummy data.

  apods = [
    [
      "https://apod.nasa.gov/apod/image/2102/rosette_goldman_960.jpg",
      "02-21-2021",
    ],
    [
      "https://apod.nasa.gov/apod/image/2102/rosette_goldman_960.jpg",
      "02-20-2021",
    ],
  ];

  // TODO: Fetch a list of APODs from the database.

  async function fetchThing() {
    const a = await fetch("http://localhost:8080/all", { method: "GET" }).then(
      (result) => {
        return result.json();
        // })
        // .then((data) => (obj = data))
        // .then(() => {
        //   obj.todos.forEach((element) => console.log(element));
        //   apods.push(obj.todos);
      }
    );
    function addApod(url, date) {
      apods.push([url, date]);
    }
    a.todos.forEach((element) => addApod(element.image_url, element.date));
    var al = document.getElementById("apod-list");
    for (apod of apods) {
      console.log(apod);
      al.appendChild(makeAPOD(apod[0], apod[1]));
    }
  }
  fetchThing();
})();

document.getElementById("home-button").addEventListener("click", () => {
  location.href = "./index.html";
});
