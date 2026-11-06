"use strict";

/* ========================================================
   Default (original) text shown when no thumbnail is active
   ======================================================== */
var defaultText = "Hover over or focus on a thumbnail below to preview it here.";

/* ========================================================
   Event-handler functions
   ======================================================== */

/**
 * Called on mouseover OR focus.
 * Updates the featured area background and alt text.
 */
function showFullImage(event) {
    var featured = document.getElementById("featured");
    var featuredText = document.getElementById("featured-text");
    var imgSrc = event.target.getAttribute("src");
    var imgAlt = event.target.getAttribute("alt");

    /* Update the large preview */
    featured.style.backgroundImage = "url('" + imgSrc + "')";
    featuredText.textContent = imgAlt;

    console.log("Event fired: " + event.type + " — showing: " + imgAlt);
}

/**
 * Called on mouseleave OR blur.
 * Resets the featured area to the default state.
 */
function clearFullImage(event) {
    var featured = document.getElementById("featured");
    var featuredText = document.getElementById("featured-text");

    /* Reset to defaults (hardcoded as expected) */
    featured.style.backgroundImage = "url('')";
    featuredText.textContent = defaultText;

    console.log("Event fired: " + event.type + " — reset to default");
}

/* ========================================================
   addTabFocus – called on window load
   Loops through every thumbnail and:
     1. Adds the tabindex attribute via JavaScript
     2. Attaches all four event listeners
   ======================================================== */
function addTabFocus() {
    console.log("onload event fired — running addTabFocus()");

    var thumbnails = document.querySelectorAll("#thumbnails img");

    for (var i = 0; i < thumbnails.length; i++) {
        /* Add tabindex so images are keyboard-focusable */
        thumbnails[i].setAttribute("tabindex", "0");

        /* Mouse events */
        thumbnails[i].addEventListener("mouseover", showFullImage);
        thumbnails[i].addEventListener("mouseleave", clearFullImage);

        /* Keyboard / focus events */
        thumbnails[i].addEventListener("focus", showFullImage);
        thumbnails[i].addEventListener("blur", clearFullImage);

        console.log("tabindex and listeners added to thumbnail " + (i + 1));
    }
}

/* ========================================================
   onload listener — triggers addTabFocus when page loads
   ======================================================== */
window.addEventListener("load", addTabFocus);
