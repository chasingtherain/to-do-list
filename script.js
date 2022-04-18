const main = document.getElementById("main")
const form = document.querySelector("#addForm");
const itemList = document.querySelector("#items");
const numOfListItems = document.querySelector("#items").getElementsByTagName("li");
const submitBtn = document.querySelector("input[type=submit]");
const submittedText = document.querySelector("input[type=text");
const filter = document.getElementById("search");
// const checkItem = document.querySelectorAll("input[type=checkbox]")
const completeList = document.getElementById("completed-items")

// empty list message variable
const emptyList = document.createElement("h5")

// filter event
filter.addEventListener("keyup",filterItems)

// form submit event
form.addEventListener("submit", addItem);

// delete event
itemList.addEventListener("click", removeItem)
completeList.addEventListener("click", removeItem)

// complete item
itemList.addEventListener("click", itemComplete)

function addItem(event){
    event.preventDefault();
    // get input value
    const newItem = document.getElementById("item");

    // create new item with input value
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(newItem.value))
    li.className = "list-group-item";

    // create delete button
    const deleteBtn = document.createElement("button")
    deleteBtn.appendChild(document.createTextNode("X"))
    deleteBtn.className = "btn btn-danger btn-sm float-right delete";
    
    // create checkbox
    const checkBox = document.createElement("input")
    checkBox.type = "checkbox";
        
    //append to li
    li.appendChild(deleteBtn);
    li.appendChild(checkBox);
    itemList.appendChild(li);

    //clear search field
    newItem.value = "";

    // remove empty list mesage
    if (numOfListItems.length != 0){
        main.removeChild(emptyList)
    }
}

function removeItem(event){
    if (event.target.classList.contains("delete"))
    {
        if(confirm("Delete Item?")){
            if (event.target.parentElement.classList.contains("list-group-item")){
                itemList.removeChild(event.target.parentElement)
            }
            // else {
            //     console.log(event.target.parentElement)
            // }
        }
    }
}


function filterItems(event){
    let userInput = event.target.value;
    let items = document.getElementsByTagName("li");
    Array.from(items).forEach(item => {
        let itemName = item.firstChild.textContent;
        console.log(itemName.toLowerCase().indexOf(userInput))
        if (itemName.toLowerCase().indexOf(userInput) != -1){
            item.style.display = "block";
        }
        else{
            item.style.display = "none";
        }
    });
}

function itemComplete(event){
    if (event.target.type == "checkbox"){
        itemList.removeChild(event.target.parentElement)
        completeList.appendChild(event.target.parentElement)
        event.target.style.display = "none";
    }
    if (numOfListItems.length == 0){
        emptyList.textContent = "Great Job, you have no more tasks left!"
        emptyList.style.color = "blue";
        main.insertBefore(emptyList,itemList)
    }
    else{
        emptyList.textContent = "";
    }

}