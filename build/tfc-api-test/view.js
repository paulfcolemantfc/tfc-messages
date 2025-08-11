/******/ (() => { // webpackBootstrap
/*!**********************************!*\
  !*** ./src/tfc-api-test/view.js ***!
  \**********************************/
//const allMains = document.querySelectorAll('.main');
//allMains.forEach(el =>fetchMessages(el));
let messageType = "";
const radioButtons = document.querySelectorAll("input[name='message-type']");
radioButtons.forEach(radio => {
  if (radio.checked) {
    messageType = radio.value;
  }
  radio.addEventListener('change', function () {
    if (this.checked) {
      messageType = this.value;
      fetchMessages();
    }
    //console.log(messageType);
  });
});
//console.log(messageType);
fetchMessages();
function fetchMessages() {
  fetchText();
}
async function fetchText() {
  console.log("fetching text");
  const cleanValue = encodeURIComponent(messageType);
  console.log(cleanValue);
  const resultspromise = await fetch(`/wp-json/wp/v2/message?message-type-slug=${cleanValue}`);
  const results = await resultspromise.json();
  console.log(results);
  if (results.length) {
    console.log("Results found");
    document.querySelector(".results").innerHTML = generateHTML(results);
  } else {
    document.querySelector(".results").innerHTML = "No Messages Found";
  }
}
function generateHTML(results) {
  let bigHTml = "";
  results.forEach(item => {
    bigHTml += `<div class="result-item">
            <h3><a href="${item.link}">${item.title.rendered}</a>, ${item.acf.speaker.name},  ${item.acf.date_given}</h3>
            
            
        </div>`;
    return bigHTml;
  });
  return bigHTml;
}
/******/ })()
;
//# sourceMappingURL=view.js.map