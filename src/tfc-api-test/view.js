const allMains = document.querySelectorAll('.main');
allMains.forEach(el =>fetchMessages(el));

function fetchMessages(el) {
   el.querySelector("input").addEventListener("input", fetchText);
   async function fetchText(e) {
        const cleanValue = encodeURIComponent(e.target.value);
        
        const resultspromise = await fetch(`/wp-json/wp/v2/message?message-type-slug=${cleanValue}`)
        const results = await resultspromise.json();
        console.log(results);
        if(results.length){
            console.log("Results found");
            el.querySelector(".results").innerHTML = generateHTML(results);
        }else {
            el.querySelector(".results").innerHTML = "Boo";     }
        }
    }   
function generateHTML(results) {
    let bigHTml = "";

    results.forEach(item => {
        bigHTml += `<div class="result-item">
            <h3><a href="${item.link}">${item.title.rendered}</a>, ${item.acf.speaker.name},  ${item.acf.date_given}</h3>
            
            
        </div>`;
        
        return bigHTml;

    })    



    return bigHTml;
}