// ==UserScript==
// @name Color Changer
// @version    0.5
// @author     Cassandra Ivy
// @description A script that changes colors of web pages for whitelisted sites only
// @match *://*/*
// ==/UserScript==

function getHost(url) {
  // Use a URL constructor to create a URL object
  var urlObj = new URL(url);
  // Return the hostname property or an empty string if no host
  return urlObj.hostname || "";
}

function addStyleButton() {
  var div = document.createElement("div");
  div.style.width = "100%"; // span the entire width of the screen
  div.style.height = "12px";
  // Create a button element
  var button = document.createElement("button");

  // Set the style of the button
  button.style.width = "100%"; // span the entire width of the screen
  button.style.height = "12px"; // make it 16 pixel tall
  button.style.backgroundColor = "#1B1E24"; // set the color to #282c34
  button.style.paddingTop = "0px"; // no padding
  button.style.paddingBottom = "0px"; // no padding
  button.style.zIndex = "9999"; // draw on top
  button.style.position = "absolute";
  // Add an event listener to delete the button when clicked
  button.addEventListener("click", function() {
    overrideStyles();
    this.remove();
  });
  // Insert the button as the first element of the body
  document.body.insertBefore(div, document.body.firstChild);
  document.body.insertBefore(button, document.body.firstChild);
}

function overrideStyles() {
  // Create a new <style> element
  var style = document.createElement("style");

  // Add your style rules here using CSS variables with descriptive names
  style.textContent = `
  :root {
    --bg-color: #1B1E24; /* gunmetal */
    --font-size: 18px;
    --font-family: Roboto, sans-serif;
    --text-color: #abb2bf; /* cadet blue */
    --link-color: #98c379; /* pistachio */
    --visited-color: #a2babf; /* light steel blue */
    --hover-color: #c678dd; /* orchid */
  }

  * {
    background-color: initial !important;
  }

  html {
    background-color: #08090A !important; /* eerie black */
  }
  .reading.reading.reading.reading {
    background-color: var(--bg-color) !important;
    padding-top: 5px !important;
  }

  .reading > * {
    font-family: var(--font-family) !important;
    color: var(--text-color);
  }

  .reading.reading * > p, .reading.reading * > a, .reading.reading * > span, .reading.reading * > strong {
    color: var(--text-color) !important;
  }

   .reading > h1, .reading.reading * > a:link, .reading.reading * > h1, .reading.reading * > h2,
   .reading.reading * > h3, .reading.reading * > h4, .reading.reading * > h5, .reading.reading * > label
   {
     color: var(--link-color) !important;
   }

   .reading.reading * > a:visited {
   color: var(--visited-color) !important;
   }

   .reading.reading * > a:hover {
   color: var(--hover-color) !important;
   }
  `;

  // Append the <style> element to the head section
  document.head.appendChild(style);
}


// Define an array of whitelisted sites
var whitelist = [
  "marxists.org",
];

document.body.classList.add("reading");
// Get the current URL
var currentURL = window.location.href;

// Get the current URL's host
var currentHost = getHost(currentURL);
var whitelisted = false;

// Loop through the whitelist array
for (var i = 0; i < whitelist.length; i++) {
  // Use includes to test if the string includes the whitelist
  if (currentHost.includes(whitelist[i])) {
    whitelisted = true;
    overrideStyles();
      break;
  }
}

if (!whitelisted) {
  addStyleButton();
}
