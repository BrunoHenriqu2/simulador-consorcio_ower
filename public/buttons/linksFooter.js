function linksFooter() {
    function goTo(link) {
        window.open(link, "_blank")
    }
    
    const socialData = {
        facebook: "https://www.facebook.com/profile.php?id=100091989860329",
        whatsapp: "https://wa.me/554999773753",
        instagram: "https://www.instagram.com/isocred_tg/",
        tiktok: "https://www.tiktok.com/@isocred_tg"
    }
    
    const divMedia = document.querySelector("div.social-media")
    const inputs = divMedia.querySelectorAll("input")
    
    for (let index = 0; index < inputs.length; index++) {
        const element = inputs[index];
    
        element.addEventListener("click", function () {
            goTo(socialData[element.getAttribute("Title")])
        })
    }
}