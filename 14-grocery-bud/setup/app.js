// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = "";
// ****** EVENT LISTENERS **********
form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearItem);
window.addEventListener("DOMContentLoaded", setupItems);
// ****** FUNCTIONS **********
function clearItem(){
        container.classList.remove("show-container");

        // const items = document.querySelectorAll(".grocery-item");
        // if(items.length > 0){
        //         items.forEach(function(item){
        //                 list.removeChild(item);
        //         });
        // }

        list.innerHTML= ""
        displayAlert("list cleared!", 1);
        localStorage.removeItem('list');
        setBackToDefault();
}
function addItem(e){
        e.preventDefault();
        // console.log(grocery.value);
        const value = grocery.value;
        const id = new Date().getTime().toString();
        // console.log(id);
        if(value && !editFlag){
                console.log('added');
                createListItem(id, value);
                displayAlert("item added", 1);
                container.classList.add('show-container')
                addToLocalStorage(id, value);
                setBackToDefault();
        }
        else if(value && editFlag){
                console.log('edit');
                editElement.innerHTML = value;
                displayAlert("item edited", 1);
                editLocalStorage(editID, value);
                setBackToDefault();
        }
        else{
                console.log('blank');
                displayAlert("please enter value", 0);
        }
}

// action = 0 error, 1 succesful
function displayAlert(text, action){
        if(action === 1){
                alert.textContent = text;
                alert.classList.add('alert-success');
                setTimeout(()=>{
                        alert.textContent = '';
                        alert.classList.remove('alert-success');
                }, 2000);
        }
        if(action === 0){
                alert.textContent = text;
                alert.classList.add('alert-danger');
                setTimeout(()=>{
                        alert.textContent = '';
                        alert.classList.remove('alert-danger');
                }, 2000);
        }
}

function deleteItem(e){
        const element = e.currentTarget.parentElement.parentElement;
        const id = element.dataset.id;
        list.removeChild(element);
        console.log("delete item");
        if (list.children.length === 0){
                container.classList.remove('show-container');
        }
        displayAlert('item removed!',1);
        removeFromLocalStorage(id);
        setBackToDefault();
}

function editItem(e){
        const element = e.currentTarget.parentElement.parentElement;
        console.log("edit item");
        editElement = e.currentTarget.parentElement.previousElementSibling;
        grocery.value = editElement.innerHTML;
        editFlag = true;
        editID = element.dataset.id;
        submitBtn.textContent = "edit";
}

// ****** LOCAL STORAGE **********
function removeFromLocalStorage(id){
        console.log("removed from local storage");
        let items = getLocalStorage();
        items = items.filter((item)=>{
                if(item.id != id){
                        return item
                }
        });
        localStorage.setItem('list', JSON.stringify(items));
}

function editLocalStorage(editID, value){
        console.log("edited from local storage");
        let items = getLocalStorage();
        items = items.map((item) => {
                if(item.id === editID){
                        item.value = value;
                }
                return item;
        });
        localStorage.setItem('list', JSON.stringify(items));
}

function getLocalStorage(){
        return localStorage.getItem('list')
        ? JSON.parse(localStorage.getItem('list'))
        : [];
}

function addToLocalStorage(id, value){
        console.log("added to local storage");
        const grocery = {id, value}; //=={id:id, value:value}
        let items = getLocalStorage();
        items.push(grocery);
        localStorage.setItem('list', JSON.stringify(items));
}

function  setBackToDefault(){
        grocery.value="";
        editFlag = false;
        editID = '';
        submitBtn.textContent = 'submit';
        console.log("set back to default");
}
// ****** SETUP ITEMS **********
function setupItems(){
        let items = getLocalStorage();
        if (items.length > 0) {
              items.forEach((item) => {
                      createListItem(item.id, item.value);
              })  
              container.classList.add('show-container');
        }
}

function createListItem(id,value){
        const element = document.createElement('article');
        element.classList.add('grocery-item');
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML =     `<p class="title">${value}</p>
                                <div class="btn-container">
                                <button type="button" class="edit-btn">
                                        <i class="fas fa-edit"></i>
                                </button>
                                <button type="button" class="delete-btn">
                                        <i class="fas fa-trash"></i>
                                </button>
                                </div>`;
        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');
        deleteBtn.addEventListener('click', deleteItem);
        editBtn.addEventListener('click', editItem);
        list.appendChild(element);
}