function headerScrollArrow()
{
    var scrollnum = window.scrollY;

    if (scrollnum < 200)
    {
        document.getElementById("headerscrollarrow").classList.add("activehintarrow")
    }
}

function portfolioScrollArrows()
{
    var scrollnum = window.scrollY;

    var scrollamt = document.getElementById("workslist").scrollLeft;

    console.log(scrollamt);

    if (scrollnum > 1326 && scrollnum < 1938 && scrollamt < 10)
    {
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
    window.setTimeout(headerScrollArrow,10000);
    window.setTimeout(portfolioScrollArrows,10000);
}

loadHints();

document.addEventListener("scroll", () => 
{
    console.log(window.scrollY);

    document.getElementById("pagescrollprogress").style.width = .5;

    loadHints();
});