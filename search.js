// getting searchContainer
const searchContainer = document.querySelector(".searchContainer");

if(searchContainer){
    var input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Go to..';
    searchContainer.appendChild(input);
    
    var resultBox = document.createElement('div');
    resultBox.classList.add('resultBox');
    searchContainer.appendChild(resultBox);
    
    var icon = document.createElement('div');
    icon.classList.add('icon');

    var i = document.createElement('i');
    i.classList.add('fa');
    i.classList.add('fa-angle-right');

    icon.appendChild(i);
    searchContainer.appendChild(icon);
    
    var userData;
    var items = [];
    var highlighted = null;

    resultBox.onmousemove = (e)=>{
        if (highlighted != e.target && e.target.className != "resultBox") {
            if (highlighted != null){
                highlighted.classList.remove('hovered');
            }
            highlighted = e.target;
            highlighted.classList.add('hovered');
        }
    };

    input.addEventListener("input", function(e) {
        userData = e.target.value;
        let Array = [];
        if(userData){
            Array = getMatchingItems(userData, "startsWith");
            Array = Array.map(suggestion=>`<a href=${suggestion[1]}><div class="item">${suggestion[0]}</div></a>`);

            if(Array.length != 0){
                searchContainer.classList.add("active");
                resultBox.innerHTML = Array.join('');
                items = [...resultBox.querySelectorAll('.item')];
            } else {
                noResultsFound();
            }
        } else {
            closeResultBox();
        }
    });
    
    input.addEventListener("keydown", function(e) {
        if (e.key == 'ArrowUp' && items.length > 0){
            e.preventDefault();
            let index = Array.prototype.indexOf.call(items, highlighted);
            if (index == 0) {
                highlighted.classList.remove('hovered');
                input.value = userData;
                highlighted = null;
            }
            if (index > 0) {
                highlighted.classList.remove('hovered');
                highlighted = items[index-1];
                highlighted.classList.add('hovered');
                input.value = highlighted.innerHTML;
            }
        }
        if (e.key == 'ArrowDown' && Array.length > 0){
            let index = Array.prototype.indexOf.call(items, highlighted);
            if (index < items.length-1) {
                if (index >= 0) {
                    highlighted.classList.remove('hovered');
                }
                highlighted = items[index+1];
                highlighted.classList.add('hovered');
                input.value = highlighted.innerHTML;
            }
            if (index == items.length-1 && items.length > 0) {
                input.value = highlighted.innerHTML;
            }
        }
        if (e.key == 'Enter'){
            goTo(input.value);
        }
    });
    
    window.addEventListener('click', function(e) {
        if (e.target == searchContainer.querySelector('.fa.fa-angle-right')){
            goTo(input.value);
        } else {
            closeResultBox();
        }
    });
}


function noResultsFound(){
    searchContainer.classList.add("active");
    resultBox.innerHTML = null;
    resultBox.innerHTML = `<div class="item"><i>No results found!</i></div>`;
    items = [];
    highlighted = null;
};

function closeResultBox(){
    resultBox.innerHTML = '';
    searchContainer.classList.remove("active");
    items = [];
    highlighted = null;
};

function goTo(searchKey){
    let matchedItems = getMatchingItems(searchKey, "exact");
    if (matchedItems.length == 1){
        window.open(matchedItems[0][1], '_self');
    }
    if (matchedItems.length == 0){
        noResultsFound();
    }
};

function getMatchingItems(searchKey, method){
    let home = "https://alavizadeharyan.github.io/docs/";

    let suggestions = [
        ["home", home],
        ["scala", home+"scala"]
    ];

    suggestions = suggestions.map(suggestion=>
        [suggestion[0], `${suggestion[1]}?theme=${encodeURIComponent(themeMode)}`]);

    if (method == "exact") {
        return suggestions.filter(suggestion=>suggestion[0].toLocaleLowerCase()==searchKey.toLocaleLowerCase());
    }
    if (method == "startsWith") {
        return suggestions.filter(suggestion=>suggestion[0].toLocaleLowerCase().startsWith(searchKey.toLocaleLowerCase()));
    }
};
