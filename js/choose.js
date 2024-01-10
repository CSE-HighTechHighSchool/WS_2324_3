// this file creates "person cards", navbar toggling, and rerouting to different pages

// function to reroute to feed (used in util for components)
function reroute(person) {
    console.log("bruh")
    window.location.href = `feed/${person}.html`
}

// choose page specific navbar toggle (for responsiveness)
function toggleNav() {
    console.log("nav toggling")
    const display = document.getElementById("navbarSupportedContent").style.display;
    document.getElementById("navbarSupportedContent").style.display = display === "none" ? "block" : "none";
}
// index page specific navbar toggle (for responsiveness)
function toggleIndexNav() {
    console.log("nav toggling")
    const display = document.getElementById("navbarSupportedContent").style.display;
    document.getElementById("navbarSupportedContent").style.display = display === "none" ? "block" : "none";
    
    document.getElementById("navToggleBG").style.background = display === "none" ? "rgb(0,0,0)" : "none";
}

$(document).ready(function() {
    // attributes: data-img for img src, data-name for name, data-desc for desc

    const createImg = src => $(`<img src="${src}" height="66" width="66">`).css({
        borderRadius: "50%",
        width: "70px",
        height: "70px",
    })
    const createName = (name, dark) => $(`<h1>${name}</h1>`).css({
        fontSize: "20px",
        fontWeight: "semibold",
        width: "100%",
        color: dark !== "dark" ? "#1e293b" : "#e2e8f0",
        textAlign: "center",
    })

    const createDesc = (desc, dark) => $(`<p>${desc}</p>`).css({
        fontSize: "16px",
        color: dark !== "dark" ? "#475569" : "#cbd5e1",
        textAlign: "center",
    })

    const createSpacer = () => $("<div></div>").css({
        height: "8px",
    })

    // finds every component in file with "person-card" class and appends title, description, and image for each card
    $(".person-card").map(function() {
        const img = $(this).attr("data-img") //image source
        const name = $(this).attr("data-name") // name of person
        const desc = $(this).attr("data-desc") // description of person
        const person = $(this).attr("data-person") // person path in feed/ to reroute
        const dark = $(this).attr("data-dark") // used to determine if this is a card on the landing page or on the choose.html page

        // setup container css, append children with params, and set to reroute to the feed page on click
        $(this).css({
            minWidth: "150px",
            width: dark==="dark" ? "6%" : "300px",
            aspectRatio: "9/11",
            border: "1px solid black",
            borderRadius: "8px",
            borderColor: "#94a3b8",
            padding: "25px",
            aspectRatio: "3/4",
            margin: "10px",
            display: "flex",
            flexDirection: "column",
            paddingTop: "50px",
            height: "400px",
            alignItems: "center",
            gap: "8px",
            flexShrink: 0
        }).append(createImg(img))
            .append(createSpacer())
            .append(createName(name, dark))
            .append(createDesc(desc, dark))
            .attr("onclick", `reroute("${person}")`)
    })
})