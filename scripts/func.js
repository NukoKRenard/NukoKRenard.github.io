/*
 * Skyler O'Bonsawin
 * January 11, 2025
 * This document contains functions to be called by buttons and other DOM elements on click.
 */

//Scrolls the Works page by the specified amount when called.
function scrollWorks(amount)
{
    works = document.getElementById("workslist").scrollBy({top:0,left:amount,behavior:"smooth"})
}

//Scrolls to and highlights the selected element.
function goToID(targetID) {
    document.location.href = "#"+targetID;

    document.querySelectorAll(".highlightelement").forEach((item) => {
        item.classList.remove("highlightelement");
    })

    const target = document.getElementById(targetID);
    target.classList.add("highlightelement")

    window.setTimeout((object=target) => {
        target.classList.remove("highlightelement");
    },3000);
}