$(document).ready(function() {
    // attributes: data-img for img src, data-name for name, data-desc for desc

    const createImg = src => $(`<img src="${src}" height="66" width="66">`).css({ borderRadius: "50%" })
    const createName = name => $(`<h1>${name}</h1>`).css({
        fontSize: "20px",
        fontWeight: "semibold",
        color: "#1e293b",
    })

    const createDesc = desc => $(`<p>${desc}</p>`).css({
        fontSize: "16px",
        color: "#475569"
    })

    $(".person-card").map(function() {
        const img = $(this).attr("data-img")
        const name = $(this).attr("data-name")
        const desc = $(this).attr("data-desc")

        $(this).css({
            height: "100px",
            width: "175px",
            padding: "16px",
            margin: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "8px"
        }).append(createImg(src))
            .append(createName(name))
            .append(createDesc(desc))
    })
})