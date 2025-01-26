/*
 * Skyler O'Bonsawin
 * January 11, 2025
 * This document contains a function to help guide the user through the site. It also contains a few functions that are responsible for maintaining site stability and optimisation.
 */

//This block will make an arrow appear if the user stays on the header, indicating that they can scroll downwards.
scrollhint = false;
window.setTimeout(() => {
    var scrollnum = window.scrollY;

    if (scrollnum < 200 && !scrollhint)
    {
    scrollhint = true;
    document.getElementById("headerscrollarrow").classList.add("activehintarrow")
    }
},10000)

//This block pauses videos when not visible in order to improve performance.
const videoVisibilityPauser = new IntersectionObserver((event) => {
    event.forEach((option) => {
        if (option.isIntersecting)
        {
            option.target.muted = "muted";
            option.target.querySelectorAll("video").forEach((video) => video.play());
        }
        else
        {
            option.target.querySelectorAll("video").forEach((video) => video.pause());
        }
    })
},{root:document,rootMargin:"0px",threshold:.7});
document.querySelectorAll("video").forEach((item) => {
    videoVisibilityPauser.observe(item);   
});

//In the works page one of the embeds is of this site. That embed passes in the loadselfembed parameter to be f so that the site doesn't embed itself more than once to stop a double mirror effect and horrific performance.
//This code is in charge of checking weither the site should be loaded as an embed, or just an image of the header.
const loadargs= new URLSearchParams(window.location.search);
document.querySelectorAll("li.selfload").forEach((parent) => {
    child = null;
    if (loadargs.get("loadselfembed") == "f")
    {
        child = document.createElement("img");
        child.src = "assets/images/websiteheader.png";
        
    }
    else
    {
        child = document.createElement("iframe");
        child.src = "index.html?loadselfembed=f";
        childbackground = document.createElement("img");
        childbackground.src = "assets/images/websiteheader.png";
        childbackground.classList.add("blurredbackground");
        parent.appendChild(childbackground);
    }
    child.height="1080"
    child.width="1920"
    parent.appendChild(child);
    
});