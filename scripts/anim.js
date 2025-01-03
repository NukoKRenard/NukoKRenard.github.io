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

document.getElementById("headerprofileimage").addEventListener("click", (event) => {
    
    if (!event.target.classList.contains("wiggle"))
    {
        event.target.classList.add("wiggle")
        window.setTimeout((obj=event.target) => {
            obj.classList.remove("wiggle")
        },700);
    }
})