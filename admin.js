const ADMIN_PASSWORD = "admin2026"; // set your admin password
let adminBarChart, adminPieChart;

function loginAdmin() {
  let pass = document.getElementById("adminPass").value.trim();
  if (pass === ADMIN_PASSWORD) {
    document.getElementById("adminLogin").style.display = "none";
    document.getElementById("adminDashboard").style.display = "block";
    loadAdminResults();
  } else {
    alert("Wrong password");
  }
}

function logoutAdmin() {
  document.getElementById("adminDashboard").style.display = "none";
  document.getElementById("adminLogin").style.display = "block";
  document.getElementById("adminSection").classList.remove("active");
  document.getElementById("voteSection").classList.add("active");
}

function loadAdminResults() {
  fetch(scriptURL)
    .then(res => res.json())
    .then(data => {
      let labels = [], values = [], total = 0;
      for (let c in data) {
        labels.push(c);
        values.push(data[c]);
        total += data[c];
      }
      document.getElementById("adminTotalVotes").innerText = total;

      let listHtml = "<h3>Vote Breakdown:</h3><ul>";
      for (let c in data) {
        listHtml += `<li>${c}: ${data[c]} votes</li>`;
      }
      listHtml += "</ul>";
      document.getElementById("voteList").innerHTML = listHtml;

      const barCtx = document.getElementById("adminBarChart").getContext("2d");
      const pieCtx = document.getElementById("adminPieChart").getContext("2d");

      if (adminBarChart) adminBarChart.destroy();
      if (adminPieChart) adminPieChart.destroy();

      adminBarChart = new Chart(barCtx, {
        type: "bar",
        data: { labels, datasets: [{ label: "Votes", data: values, backgroundColor: "#00a651" }] }
      });

      adminPieChart = new Chart(pieCtx, {
        type: "pie",
        data: { labels, datasets: [{ data: values, backgroundColor: ["#00a651", "#007a45", "#ffa500", "#ff0000", "#0000ff"] }] }
      });
    })
    .catch(err => console.log("Admin results error:", err));
}

// Refresh admin charts every 5 seconds
setInterval(() => {
  if (document.getElementById("adminDashboard").style.display === "block") {
    loadAdminResults();
  }
}, 5000);