let modal = document.getElementById("modal");
let btn = document.getElementById("openModalBtn");
let closeBtns = document.querySelectorAll(".close");

closeBtns.forEach(function(btn) {
    btn.addEventListener("click", function() {
        var modal = btn.closest(".modal");
        modal.style.display = "none";
    });
});

btn.onclick = function() {
    modal.style.display = "block";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
