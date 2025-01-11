document.addEventListener("scroll",() => {
    document.getElementById("pagescrollprogress").style.width = String((window.scrollY/(document.body.offsetHeight-window.innerHeight))*100)+"%";
});

const opacObserver = new IntersectionObserver((event) => {
    event.forEach((option) => {
        if (option.isIntersecting)
        {
            console.log(option)
            option.target.classList.add("hiddenOpacIn");
        }
        else
        {
            option.target.classList.remove("hiddenOpacIn");
        }
    })
},{root:document,rootMargin:"0px",threshold:.5});
document.querySelectorAll(".hiddenOpac").forEach((obj) => {
    opacObserver.observe(obj);
});

const worksObserver = new IntersectionObserver((event) => {
    event.forEach((option) => {
        if (option.isIntersecting)
        {
            waittime = 500
            for (const child of option.target.children)
            {
                window.setTimeout((obj=child) => {
                    child.classList.add("hiddenRightIn");
                },waittime)
                waittime+=100;
            }

            window.setTimeout(() => {
                document.getElementById("worksdiv").querySelectorAll(".leftbutton, .rightbutton").forEach((item) => {
                    item.classList.add("hintedbutton");
                });
            },2000);
        }
        else
        {
            for (const child of option.target.children)
                {
                    child.classList.remove("hiddenRightIn");
                } 
        }
    })
})
worksObserver.observe(document.getElementById("workslist"));


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

document.getElementById("headerprofileimage").addEventListener("click", (event) => {
    
    if (!event.target.classList.contains("wiggle"))
    {
        event.target.classList.add("wiggle")
        window.setTimeout((obj=event.target) => {
            obj.classList.remove("wiggle")
        },700);
    }
})

document.querySelectorAll(".myworks > div > ul > li > img, video").forEach((item) => {
    backgrounditem = item.cloneNode(true);
    backgrounditem.classList.add("blurredbackground");
    item.parentElement.appendChild(backgrounditem);
})