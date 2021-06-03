const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value;

//Save selected movie index and price
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
};

//update total and count
const updateSelectedCount = () => {
  const seletedSeats = document.querySelectorAll(".row .seat.selected");
  //   console.log(seletedSeats);

  const seatsIndex = [...seletedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  //   console.log(seatsIndex);
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = seletedSeats.length;
  //   console.log(selectedSeatsCount);

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};

//PopulateUI :- Get Data from Localstorage
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  //   console.log(selectedSeats);
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//movie select
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  //   console.log(e.target.selectedIndex, e.target.value);
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//seats click events
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

//Initial count and total set
updateSelectedCount();
