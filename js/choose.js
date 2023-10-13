$(document).ready(function() {
    // attributes: data-img for img src, data-name for name, data-desc for desc

    const createImg = src => $(`<img src="${src}" height="66" width="66">`).css({
        borderRadius: "50%",
        width: "70px",
        height: "70px",
    })
    const createName = name => $(`<h1>${name}</h1>`).css({
        fontSize: "20px",
        fontWeight: "semibold",
        width: "100%",
        color: "#1e293b",
        textAlign: "center",
    })

    const createDesc = desc => $(`<p>${desc}</p>`).css({
        fontSize: "16px",
        color: "#475569",
        textAlign: "center",
    })

    const createSpacer = () => $("<div></div>").css({
        height: "8px",
    })

    $(".person-card").map(function() {
        const img = $(this).attr("data-img")
        const name = $(this).attr("data-name")
        const desc = $(this).attr("data-desc")

        $(this).css({
            // height: "200px",
            // width: "175px",
            minWidth: "150px",
            width: "23%",
            aspectRatio: "9/11",
            border: "1px solid black",
            borderRadius: "8px",
            borderColor: "#94a3b8",
            padding: "22px",
            margin: "10px",
            display: "flex",
            flexDirection: "column",
            paddingTop: "50px",
            // justifyContent: "center",
            alignItems: "center",
            gap: "8px"
        }).append(createImg(img))
            .append(createSpacer())
            .append(createName(name))
            .append(createDesc(desc))
    })
})