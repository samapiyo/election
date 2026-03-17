const scriptURL = "https://script.google.com/macros/s/AKfycbyaZAIA82AqKNfrj2WtIKhz2sxHDuARaaPXcfuftocEuwy2ll5v_DD-1eirl_bvJLUu/exec";

function login() {

  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Enter email & password");
    return;
  }

  // Restrict school emails
  if (!email.endsWith("@uoeld.ac.ke")) {
    alert("Use valid school email");
    return;
  }

  // Hide login section
  document.getElementById("loginSection").classList.remove("active");

  // Show voting section
  document.getElementById("voteSection").classList.add("active");

}

function vote(candidate) {

  let email = document.getElementById("email").value;
  let admission = document.getElementById("admission").value.trim();
  let name = document.getElementById("name").value.trim();
  let course = document.getElementById("course").value.trim();

  if (!admission || !name || !course) {
    alert("Please fill all voter details (Admission Number, Full Name, Course)");
    return;
  }


  fetch(scriptURL, {
    method: "POST",
    body: new URLSearchParams({
      email, admission, name, course, candidate
    })
  })
    .then(res => res.text())
    .then(data => {

      if (data === "INVALID_EMAIL") {
        alert("Invalid school email");
        return;
      }

      if (data === "DUPLICATE") {
        alert("You already voted");
        return;
      }

      if (data === "SUCCESS") {
        showSuccess(candidate);
      }

    })
    .catch(() => alert("Network error"));

}

function showSuccess(candidate) {

  document.body.innerHTML = `
<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:black;color:white;text-align:center;flex-direction:column;">
<h2>YOU HAVE SUCCESSFULLY VOTED FOR</h2>
<h1 style="color:#00ff88;">${candidate}</h1>
<p>THANK YOU FOR YOUR VOTE</p>
<h1 style="text-shadow:3px 3px 10px black;">COMRADES POWER</h1>
</div>`;
}

function showAdmin() {
  document.getElementById("voteSection").classList.remove("active");
  document.getElementById("adminSection").classList.add("active");
}