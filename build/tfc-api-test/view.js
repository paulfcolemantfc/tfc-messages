/******/ (() => { // webpackBootstrap
/*!**********************************!*\
  !*** ./src/tfc-api-test/view.js ***!
  \**********************************/
//const allMains = document.querySelectorAll('.main');
//allMains.forEach(el =>fetchMessages(el));
let messageType = "";
let groupby = "";

// determine groupby
const groupbyButtons = document.querySelectorAll("input[name='groupby-radio']");
groupbyButtons.forEach(button => {
  if (button.checked) {
    groupby = button.value;
  }
  // on change fetch messages
  button.addEventListener('change', function () {
    if (this.checked) {
      groupby = this.value;
      fetchMessages();
    }
    //console.log(groupby);
  });
});
// determing message type
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
//console.log(groupby);
fetchMessages();
function fetchMessages() {
  fetchText();
}
async function fetchText() {
  const cleanValue = encodeURIComponent(messageType);
  const resultspromise = await fetch(`/wp-json/wp/v2/message?message-type-slug=${cleanValue}`);
  const results = await resultspromise.json();
  // results have json from the API
  // convert to array so it can be sorted

  const resultsArray = Object.values(results);
  // sort results by date_given
  resultsArray.sort((a, b) => {
    return b.acf.date_given - a.acf.date_given;
  });
  // if groupby speaker resort by speaker last name, first name
  if (groupby === "Speaker") {
    resultsArray.sort((a, b) => {
      const speakerA = buildName(a.acf.speaker.name.toLowerCase());
      const speakerB = buildName(b.acf.speaker.name.toLowerCase());
      return speakerA.localeCompare(speakerB);
    });
  }

  //console.log(resultsArray);
  // resultsArray is sorted by date descending
  if (resultsArray.length) {
    //console.log(resultsArray);
    document.querySelector(".results").innerHTML = generateHTML(resultsArray, groupby);
  } else {
    document.querySelector(".results").innerHTML = "No Messages Found";
  }
}
function buildName(speaker) {
  // build name from speaker object
  nameParts = speaker.split(" ");
  firstName = nameParts[0];
  lastName = nameParts[nameParts.length - 1];
  sortName = lastName + " " + firstName;
  console.log(sortName);
  return sortName;
}
function generateHTML(results, groupby) {
  //console.log(results);
  let bigHtml = "";
  //php groupby logic
  let prevGroup = '';
  let thisGroup = '';
  let thisYear = '';
  // groupby div
  bigHtml += '<div id="groupby-${groupby}">';

  // loop through results
  results.forEach(item => {
    // Access post data
    thisYear = new Date(item.acf.date_given).getFullYear();
    thisSpeaker = buildName(item.acf.speaker.name);
    if (groupby === "Year") {
      thisGroup = thisYear;
    } else {
      thisGroup = thisSpeaker;
    }
    // see if this is new group to generate header
    if (prevGroup !== thisGroup) {
      if (prevGroup !== '') {
        bigHtml += '</ul>'; // Close previous group if it exists
      }
      bigHtml += `<h4>${thisGroup}</h4><ul class="sermon-list grouped-by-${groupby.toLowerCase()} ">`;
      prevGroup = thisGroup; // Update previous group to current
    }

    // end php

    bigHtml += `<div class="result-item">
            <li><a href="${item.link}">${item.title.rendered}</a>, ${item.acf.speaker.name},  ${new Date(item.acf.date_given).toLocaleString('en-CA', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })}</li>
            
            
        </div>`;
  });
  bigHtml += '</ul>'; // Close the last group
  bigHtml += '</div>'; // Close gro
  return bigHtml;
}
/******/ })()
;
//# sourceMappingURL=view.js.map