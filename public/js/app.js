const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector(".message-1");
const message2 = document.querySelector(".message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  if (!location || location === "") {
    return;
  }
  message1.textContent = "Loading...";
  fetch(`/weather?address=${location}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const para = document.createElement("p");
      if (data.error) {
        message1.textContent = data.error;
        message2.textContent = "";
        return;
      }
      console.log(data);

      message1.textContent = data.forecast;
      message2.textContent = data.location;
    });
});
