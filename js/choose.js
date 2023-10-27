function reroute(person) {
    console.log("bruh")
    window.location.href = `feed/${person}.html`
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

    $(".person-card").map(function() {
        const img = $(this).attr("data-img")
        const name = $(this).attr("data-name")
        const desc = $(this).attr("data-desc")
        const person = $(this).attr("data-person")
        const dark = $(this).attr("data-dark")
        console.log("person: ", person)

        $(this).css({
            // height: "200px",
            // width: "175px",
            minWidth: "150px",
            width: dark==="dark" ? "4%" : "23%",
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
            // justifyContent: "center",
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