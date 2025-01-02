scrollhint = false;

window.setTimeout(() => {
    var scrollnum = window.scrollY;

    if (scrollnum < 200 && !scrollhint)
    {
    scrollhint = true;
    document.getElementById("headerscrollarrow").classList.add("activehintarrow")
    }
},10000)

window.setTimeout(() => {
    document.getElementById("headerprofileimage").classList.remove("hiddenOpac");
},500);
window.setTimeout(() => {
    document.getElementById("headername").classList.remove("hiddenOpac");
},1000);
window.setTimeout(() => {
    document.getElementById("navbar").classList.remove("hiddenTop");
},3000);


aboutmehint = false;
portfoliohint = false;

document.addEventListener("scroll", () => 
{
    document.getElementById("pagescrollprogress").style.width = String((window.scrollY/(document.body.offsetHeight-window.innerHeight))*100)+"%";

    scrollamt = window.scrollY;
    if (scrollamt > 500 && !aboutmehint)
    {
        aboutmehint = true;

        window.setTimeout(() => {
            document.getElementById("aboutmeheader").classList.remove("hiddenOpac");
        },300);
        window.setTimeout(() => {
            document.getElementById("aboutmep").classList.remove("hiddenOpac");
        },500);
    }
    if (scrollamt > 1000 && !portfoliohint)
    {
        portfoliohint = true;

        document.getElementById("workslisttitle").classList.remove("hiddenOpac");
        window.setTimeout( () => {
            document.getElementById("worksdiv").classList.remove("hiddenOpac");

        },500)
        timedelay = 1500;
        for (const child of document.getElementById("workslist").children)
        {
            window.setTimeout(() => {
                child.classList.remove("hiddenRight");
            },timedelay);
            timedelay += 500;
        }

        window.setTimeout(() => {
            document.getElementById("worksbuttonl").classList.add("hintedbutton");
            document.getElementById("worksbuttonr").classList.add("hintedbutton");
        }, 5000)

        window.setTimeout(() => {
            document.getElementById("worksbuttonl").classList.remove("hintedbutton");
            document.getElementById("worksbuttonr").classList.remove("hintedbutton");
        }, 6000)
    }

    console.log(scrollamt)
});