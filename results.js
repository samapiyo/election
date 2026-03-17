const scriptURL = "https://script.google.com/macros/s/AKfycbyaZAIA82AqKNfrj2WtIKhz2sxHDuARaaPXcfuftocEuwy2ll5v_DD-1eirl_bvJLUu/exec";

function loadResults() {

  fetch(scriptURL)
    .then(res => res.json())
    .then(data => {

      let total = 0;
      let html = "";

      for (let c in data) {

        total += data[c];

        html += `
<div>
<h3>${c}</h3>
<p>${data[c]} votes</p>
</div>`;
      }

      document.getElementById("total").innerText = total;
      document.getElementById("results").innerHTML = html;

    });

}

setInterval(loadResults, 5000);
loadResults();