function toggleNav() {
    const display = document.getElementById("navbarSupportedContent").style.display;
    console.log(display)
    document.getElementById("navbarSupportedContent").style.display = display === "none" ? "block" : "none";
}

