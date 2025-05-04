
document.getElementById("routine-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const days = document.getElementById("days").value;

    fetch("/generate", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({days: parseInt(days)})
    })
    .then(response => response.json())
    .then(data => {
        const output = document.getElementById("routine-output");
        output.textContent = data.routine;
    });
});
