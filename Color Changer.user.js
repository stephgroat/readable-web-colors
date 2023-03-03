// ==UserScript==
// @name Color Changer
// @version      0.2
// @author       Cassandra Ivy
// @description A script that changes colors of web pages for whitelisted sites only
// @match *://*/*
// @grant GM_addStyle
// ==/UserScript==

function GM_addStyle(css) {
  const style = document.getElementById("GM_addStyleBy8626") || (function() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = "GM_addStyleBy8626";
    document.head.appendChild(style);
    return style;
  })();
  const sheet = style.sheet;
  sheet.insertRule(css, (sheet.rules || sheet.cssRules || []).length);
}

function getHost(url) {
  // Use a URL constructor to create a URL object
  var urlObj = new URL(url);
  // Return the hostname property or an empty string if no host
  return urlObj.hostname || "";
}

function addStyleButton() {
  // Create a button element
  var button = document.createElement("button");

  // Set the style of the button
  button.style.width = "100%"; // span the entire width of the screen
  button.style.height = "15px"; // make it 16 pixel tall
  button.style.backgroundColor = "#282c34"; // set the color to #282c34
  button.style.padding = "none"; // no padding
  button.style.margin = "none"; // no margin
  button.style.border = "none"; // remove any border
  button.style.zIndex = "9999"; // draw on top
  // Add an event listener to delete the button when clicked
  button.addEventListener("click", function() {
    overrideStyles();
    this.remove();
  });
  // Insert the button as the first element of the body
  document.body.insertBefore(button, document.body.firstChild);
}

function overrideStyles() {
  // Create a new <style> element
  var style = document.createElement("style");

  // Add your style rules here using CSS variables with descriptive names
  style.textContent = `
    :root {
      --bg-color: #282c34; /* gunmetal */
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
      background-color: #181c24 !important; /* eerie black */
    }
    .reading.reading.reading {
      padding-top: 15px;
      margin-top: 0% !important;
      margin-left: calc(15%) !important;
      margin-right: calc(15%) !important;
      background-color: var(--bg-color) !important;
    }

    .reading > * {
      font-family: var(--font-family) !important;
      color: var(--text-color);
    }

    .reading.reading * > p, .reading.reading * > a, .reading.reading * > span {
      color: var(--text-color) !important;
    }

   .reading > h1, .reading.reading * > a:link, .reading.reading * > h1, .reading.reading * > strong {
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