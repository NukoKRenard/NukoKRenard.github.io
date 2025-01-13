/*
 * Skyler O'Bonsawin
 * January 11, 2025
 * This document contains a number of animation triggers for the portfolio website.
 */

//Code for the page scroll progress indicator.
document.addEventListener("scroll",() => {
    document.getElementById("pagescrollprogress").style.width = String((window.scrollY/(document.body.offsetHeight-window.innerHeight))*100)+"%";
});

//when items with the hiddenOpac class become visible this block will give them the class of hiddenOpacIn causing their blur and opacity transition to become visible.
const opacObserver = new IntersectionObserver((event) => {
    event.forEach((option) => {
        if (option.isIntersecting)
        {
            option.target.classList.add("hiddenOpacIn");
        }
        else
        {
            option.target.classList.remove("hiddenOpacIn");
        }
    })
},{root:document,rootMargin:"0px",threshold:0.3});
document.querySelectorAll(".hiddenOpac").forEach((obj) => {
    opacObserver.observe(obj);
});

//Since when we translate the objects it goes out of the window, we have to use a parent to detect for any fade ins that involve translation.
//when children of items with the a hidden transform class become visible this block will give them the class of hiddenTransformIn causing them to slide in from the right. It is also staggered for lists.
const transformObserver = new IntersectionObserver((event) => {
    event.forEach((option) => {
        if (option.isIntersecting)
        {
            waittime = 0
            for (const child of option.target.children)
            {
                window.setTimeout((obj=child) => {
                    child.classList.add("hiddenTransformIn");
                },waittime)
                waittime+=100;
            }
        }
        else
        {
            for (const child of option.target.children)
                {
                    child.classList.remove("hiddenTransformIn");
                } 
        }
    })
})
document.querySelectorAll(".hiddenRight, .hiddenLeft, .hiddenDown").forEach((obj) => {
    transformObserver.observe(obj);
},{root:document,rootMargin:"0px",threshold:0.9});

//A fun easter eg which wiggles the profile picture on the header when clicked.
document.getElementById("headerprofileimage").addEventListener("click", (event) => {
    
    if (!event.target.classList.contains("wiggle"))
    {
        event.target.classList.add("wiggle")
        window.setTimeout((obj=event.target) => {
            obj.classList.remove("wiggle")
        },700);
    }
})

//Clones and places a blurred scaled up version of all of the images and videos inside of the My Works div. This is to make a fun responsive glow effect.
document.querySelectorAll(".myworks > div > ul > li > img, video").forEach((item) => {
    backgrounditem = item.cloneNode(true);
    backgrounditem.classList.add("blurredbackground");
    item.parentElement.appendChild(backgrounditem);
})


const header = document.getElementById("header");
lastmouseposstar = [0,0];
header.addEventListener("mousemove", (event) => {
    const x = event.clientX+window.scrollX;
    const y = event.clientY-100+window.scrollY;
        
    const distancestar = Math.sqrt((x-lastmouseposstar[0])*(x-lastmouseposstar[0])+(y-lastmouseposstar[1])*(y-lastmouseposstar[1]));
    if (distancestar > 10)
    {
        lastmouseposstar = [x,y];

        const star = document.createElement("div");
        star.classList.add("mousestartrail");
        header.appendChild(star);

        star.style.left = x+((Math.random()-.5)*100)+"px";
        star.style.top = y-100+((Math.random()-.5)*100)+"px";

        star.style.animationName = "trailstar"+Math.floor(Math.random()*2);
        star.style.animationDuration = 1000+Math.floor(Math.random()*2000)+"ms";
        star.style.scale = Math.floor(30+(Math.random()*70))+"%";

        window.setTimeout(() => {
            header.removeChild(star);
        },3000);
    }
});