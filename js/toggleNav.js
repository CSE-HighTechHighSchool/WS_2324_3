// This function toggles the navbar when the burger icon appears (responsiveness)
function toggleNav() {
    const display = document.getElementById("navbarSupportedContent").style.display;
    console.log(display)
    document.getElementById("navbarSupportedContent").style.display = display === "none" ? "block" : "none";
}

