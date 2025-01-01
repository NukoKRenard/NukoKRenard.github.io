workshint = false;
headerscrollhint = false;

function headerScrollArrow()
{
    var scrollnum = window.scrollY;

    if (scrollnum < 200 && !headerscrollhint)
    {
        headerscrollhint = true;
        document.getElementById("headerscrollarrow").classList.add("activehintarrow")
    }
}

function portfolioScrollArrows()
{
    var scrollnum = window.scrollY;

    var scrollamt = document.getElementById("workslist").scrollLeft;

    console.log(scrollnum);

    if (scrollnum > 1122 && scrollnum < 1836 && scrollamt < 10 && !workshint)
    {
        workshint=true;

        document.getElementById("worksbuttonl").classList.add("hintedbutton");
        document.getElementById("worksbuttonr").classList.add("hintedbutton");

        window.setTimeout(() => {
            document.getElementById("worksbuttonl").classList.remove("hintedbutton");
            document.getElementById("worksbuttonr").classList.remove("hintedbutton");
        }, 1000)
    
    }
}

function loadHints()
{
    window.setTimeout(headerScrollArrow,5000);
    window.setTimeout(portfolioScrollArrows,5000);
}

loadHints();

document.addEventListener("scroll", () => 
{
    document.getElementById("pagescrollprogress").style.width = String((window.scrollY/(document.body.offsetHeight-window.innerHeight))*100)+"%";
    loadHints();
});