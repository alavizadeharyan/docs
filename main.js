//////////////////// FUNCTIONS ////////////////////////////

function justifyIndentation(str){
    var lines = str.split("\n");
    if (lines.length > 0){
        if (lines[0].trimEnd() == ''){
            lines.splice(0, 1);
        }
    }
    if (lines.length > 0){
        if (lines[lines.length-1].trimEnd() == ''){
            lines.splice(lines.length-1, 1);
        }
    }
    if (lines.length > 0) {
        let mainIndent = lines[0].length - lines[0].trimStart().length;
        for (let i = 0; i < lines.length; i++){
            lines[i] = lines[i].trimEnd();
            if (lines[i].length - lines[i].trimStart().length >= mainIndent){
                lines[i] = lines[i].substring(mainIndent);
            }
        }
    }
    return lines.join('\n');
};

function toggleTheme(){
    if (themeMode == 'dark-mode'){
        prismLink.href = 'prism/prism_light.css';
        themeMode = 'light-mode';
        document.getElementById("themeButtonBubbleSpeech").innerHTML = "Switch To Dark Mode";
        document.body.classList.remove("dark-mode")
        document.body.classList.add("light-mode")
    } else {
        prismLink.href = 'prism/prism_dark.css';
        themeMode = 'dark-mode';
        document.getElementById("themeButtonBubbleSpeech").innerHTML = "Switch To Light Mode";
        document.body.classList.remove("light-mode")
        document.body.classList.add("dark-mode")
    }
};

function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function goHome(){
    window.open(`https://alavizadeharyan.github.io/docs/index.html?theme=${encodeURIComponent(themeMode)}`, '_self');
}

function getClassStyles(className) {
    // Loop through all the stylesheets in the document
    for (let sheet of document.styleSheets) {
        // Loop through all the rules in the stylesheet
        for (let rule of sheet.cssRules) {
            // Check if the rule is a style rule and if it matches the class name
            if (rule.selectorText === className) {
                return rule.style;
            }
        }
    }
    return null;
}

function createTOC() {
    // Select the container where the TOC will be inserted
    const toc = document.querySelector('.toc');

    if (toc) {
        // Get all the headers (h1, h2, h3, etc.)
        const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

        // Create a list element to hold the TOC entries
        const tocList = document.createElement('ul');

        headers.forEach(header => {
            // Create an anchor to link to each section
            const anchor = document.createElement('a');
            const id = header.textContent.toLowerCase().replace(/\s+/g, '-'); // Generate a simple ID based on header text
            header.id = id; // Assign the ID to the header element
            anchor.href = `#${id}`;
            anchor.textContent = header.textContent;

            // Create a list item and append the anchor to it
            const listItem = document.createElement('li');
            listItem.style.marginLeft = `${(parseInt(header.tagName.charAt(1)) - 1) * 20}px`; // Indent based on header level
            listItem.appendChild(anchor);

            // Append the list item to the TOC list
            tocList.appendChild(listItem);
        });

        // Append the TOC list to the TOC container
        toc.appendChild(tocList);
    }
    else {
        let root = document.documentElement;
        root.style.setProperty('--toc-width-ratio', '0');
    }
}

///////////////////////////////////////////////////////////


let prismLink = document.getElementById('prismTheme');

var themeMode = 'dark-mode';

if (getQueryParameter('theme')){
    themeMode = getQueryParameter('theme');
}

document.body.classList.add(themeMode);

prismLink.href = themeMode=="dark-mode" ? 'prism/prism_dark.css' : 'prism/prism_light.css';

const themeButton = document.querySelector(".themeButton");

if (themeButton){
    let i = document.createElement('i');
    i.classList.add('fa-solid');
    i.classList.add('fa-circle-half-stroke');
    i.style.cursor = 'pointer';
    i.addEventListener('click', toggleTheme);
    themeButton.appendChild(i);

    let themeButtonBubbleSpeech = document.createElement('div');
    themeButtonBubbleSpeech.classList.add('bubbleSpeech');
    themeButtonBubbleSpeech.textContent = themeMode=='dark-mode' ? 'Switch To Light Mode' : 'Switch To Dark Mode';
    themeButtonBubbleSpeech.id = 'themeButtonBubbleSpeech';
    themeButton.appendChild(themeButtonBubbleSpeech);
}

const homeButton = document.querySelector(".homeButton");

if (homeButton){
    let i = document.createElement('i');
    i.classList.add('fa-solid');
    i.classList.add('fa-house');
    i.style.cursor = 'pointer';
    i.addEventListener('click', goHome);
    homeButton.appendChild(i);

    let homeButtonBubbleSpeech = document.createElement('div');
    homeButtonBubbleSpeech.classList.add('bubbleSpeech');
    homeButtonBubbleSpeech.textContent = 'Go To Home';
    homeButtonBubbleSpeech.id = 'homeButtonBubbleSpeech';
    homeButton.appendChild(homeButtonBubbleSpeech);
}

let codeBlocks = document.querySelectorAll("pre code");
for (let i = 0; i < codeBlocks.length; i++){
    codeBlocks[i].innerHTML = justifyIndentation(codeBlocks[i].innerHTML);
}


document.addEventListener("DOMContentLoaded", createTOC);


////////////////////////// EVENT LISTNER //////////////////////////

document.addEventListener('mousemove', function(e){
    switch (e.target.className){
        //theme button icon
        case 'fa-solid fa-circle-half-stroke':
            document.getElementById("themeButtonBubbleSpeech").style.visibility = "visible";
            document.getElementById("themeButtonBubbleSpeech").style.animation = "fadeIn 1s";
            break;

        //home button icon
        case 'fa-solid fa-house':
            document.getElementById("homeButtonBubbleSpeech").style.visibility = "visible";
            document.getElementById("homeButtonBubbleSpeech").style.animation = "fadeIn 1s";
            break;
        
        default:
            //theme button icon
            if (document.getElementById("themeButtonBubbleSpeech")){
                document.getElementById("themeButtonBubbleSpeech").style.visibility = "hidden";
                document.getElementById("themeButtonBubbleSpeech").style.animation = null;
            }
            //home button icon
            if (document.getElementById("homeButtonBubbleSpeech")){
                document.getElementById("homeButtonBubbleSpeech").style.visibility = "hidden";
                document.getElementById("homeButtonBubbleSpeech").style.animation = null;
            }
    }
});

//console.log(window.getComputedStyle(document.querySelector('.content')).getPropertyValue('margin-right'));

