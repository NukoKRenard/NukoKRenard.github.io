scrollhint = false;

window.setTimeout(() => {
    var scrollnum = window.scrollY;

    if (scrollnum < 200 && !scrollhint)
    {
    scrollhint = true;
    document.getElementById("headerscrollarrow").classList.add("activehintarrow")
    }
},10000)

