const url = "https://pokeapi.co/api/v2/pokemon/";
const searchButton = document.getElementById("search-button");
const errorMessage = document.getElementById('not-found');
const resultsContainer = document.getElementById('results-container');




document.getElementById("search-button").addEventListener("click", () => {
  const query = document.getElementById("search").value;
  if (!errorMessage.classList.contains("no-show")) {
      errorMessage.classList.add("no-show");
  }

  resultsContainer.innerHTML = "";

  fetch(`${url}${query}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showResult(data);


      const oggPath = data.cries.latest; // Replace 'oggPath' with the actual path in your data

      if (oggPath) {
        // Fetch and set up the audio
        fetch(oggPath)
          .then((response) => response.blob())
          .then((blob) => {
            const audioUrl = URL.createObjectURL(blob);
            const audio = new Audio(audioUrl);
  
            // Set up a play button event listener
            document.getElementById('playButton').addEventListener('click', () => {
              audio.play();
            });
          })
          .catch((error) => {
            console.error('Error fetching the audio file:', error);
          });
      }


    })
    .catch((error) => {
        showErrorMessage();
    });
});


function showErrorMessage() {
    errorMessage.classList.toggle("no-show");
}

function showResult(data) {
    const HTMLtoAppend = `
    <div class="card mb-3" id="card">
        <div class="row g-0 justify-content-center" id="card-content">
          <div class="col-md-4 row" id="pictures">
            <div class="col-6 miniature">
                <img
                src="${data.sprites.front_default}"
                class="img-fluid rounded-start"
                alt="Card image cap"
                />
            </div>
            <div class="col-6 miniature">
                <img
                src="${data.sprites.back_default}"
                class="img-fluid rounded-start"
                alt="Card image cap"
                />
            </div>
            <div class="col-6 miniature">
                <img
                src="${data.sprites.back_shiny}"
                class="img-fluid rounded-start"
                alt="Card image cap"
                />
            </div>
            <div class="col-6 miniature">
                <img
                src="${data.sprites.front_shiny}"
                class="img-fluid rounded-start"
                alt="Card image cap"
                />
            </div>
          </div>
          <div class="col-md-8 justify-content-center">
            <div class="card-body">
              <h5 class="card-title">${data.name}</h5>
              <p class="card-text">
                Especie: ${data.species.name}
                <br>
                Tipo: ${data.types[0].type.name}
              </p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <div id="li-card">
                    <span>Sonido:</span>
                    <button class='btn btn-primary rounded-circle' id='playButton'><i class="fas fa-play"></i></button>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </div>
    `
    resultsContainer.innerHTML = HTMLtoAppend;
}