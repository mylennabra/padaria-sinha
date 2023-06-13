const modal = document.getElementById("modal");
const btn = document.getElementById("openModalBtn");
const closeBtns = document.querySelectorAll(".close");
const removeClientButton = document.getElementById("remove-client");

function closeModal(btn) {
    if (btn) {
    btn.closest(".modal").style.display = "none";
    } else {
    document.getElementById("modal").style.display = "none";
    }
}
    
closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => closeModal(btn));
});
    
btn.onclick = () => {
    modal.style.display = "block";
};

window.onclick = (event) => {
    if (event.target == modal) {
    modal.style.display = "none";
    }
}