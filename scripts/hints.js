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

    if (scrollnum > 1326 && scrollnum < 1938)
    {
        document.getElementById("worksarrowl").classList.add("activehintarrow")
        document.getElementById("worksarrowr").classList.add("activehintarrow")
    }
}

function loadHints()
{
    window.setTimeout(headerScrollArrow,1000);
    window.setTimeout(portfolioScrollArrows,1000)
}

loadHints();

document.addEventListener("scroll", () => 
{
    console.log(window.scrollY);

    loadHints();
});