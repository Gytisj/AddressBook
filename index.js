const form = document.getElementById('new_contact_input');
const createContact = document.getElementById('create_contact');
const addAllContacts = document.getElementById('add_all_selected');
const clearSelected = document.getElementById('clear_all_selected');
const editContact = document.getElementById('editDiv');
const search = document.getElementById('search_contact');
const search_array = document.getElementById('search_input');
let allArr = [];
let filterArray = [];

//shows add contact table after click
createContact.addEventListener('click', (e) => {
    let container = document.getElementById('enableDisable');
    if (container.style.display === 'inline-block') {
        container.style.display = 'none';
    } else {
        container.style.display = 'inline-block';
    }
})

editContact.addEventListener('submit', (e) => {
    e.preventDefault();
})

search.addEventListener('click', (e) => {
    let container = document.getElementById('vissible');
    if (container.style.display === 'inline-block') {
        container.style.display = 'none';
    } else {
        container.style.display = 'inline-block';
    } 
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let container = document.getElementById('enableDisable');
    container.style.display = 'none';
    
    pushIntoObj();

})
//push created contacts input values to obj and pushes it to array
function pushIntoObj() {

    const createObj = {
        Name: form[0].value,
        Phone: form[1].value,
        Email: form[2].value,
        Address: form[3].value,
        Favorite: false,
        Selected: false
    }

    allArr.push(createObj);


    saveData();

    retrieveInfo();

}
//saves info to local storage
function saveData() {
    let localStrg = JSON.stringify(allArr);
    localStorage.setItem('identify', `${localStrg}`);
}


//gets info from local storage
function retrieveInfo() {

    let info = localStorage.getItem('identify');
    allArr = info ? JSON.parse(info) : [];

    drawDiv(info);
    //return info;

}

//adds selected to favorites
addAllContacts.addEventListener('click', (e) => {
    allArr.forEach((e) => {
        if (e.Selected) {
            e.Favorite = !e.Favorite;
            drawDiv(allArr);
            saveData();
        } 
        else {
            return null;
        }
    })
})

//clears selected contacts
clearSelected.addEventListener('click', (e) => {
    let filteredArr = allArr.filter((contact) => {
        return !contact.Selected;
    })
    allArr = filteredArr;
    drawDiv(allArr);
    saveData();
})
//creates contact divs
function drawSingle(el, target, index) {
    const container = document.createElement('div');
    container.setAttribute('id', 'div')

    let name = document.createElement('p');
    let phone = document.createElement('p');
    let email = document.createElement('p');
    let address = document.createElement('p');
    let btn = document.createElement('button');
    let favoriteBtn = document.createElement('button');
    let checkBox = document.createElement('button');
    let editBtn = document.createElement('button');
    editBtn.setAttribute('id', 'edit');
    checkBox.setAttribute('id', 'select');


    btn.addEventListener('click', (e) => {
        allArr.splice(index, 1);
        drawDiv(allArr);
        saveData();
    })

    editBtn.addEventListener('click', (e) => {
        let container = document.getElementById('enableDisable1');
        if (container.style.display === 'none') {

            container.style.display = 'block';

            let edit = document.getElementById('editButton');

            editContact[0].value = el.Name;
            editContact[1].value = el.Phone;
            editContact[2].value = el.Email;
            editContact[3].value = el.Address;

            edit.addEventListener('click', (e) => {

                e.preventDefault();
                container.style.display = 'none';

                if (el.Favorite === true) {
                    el.Favorite = null;
                    const newCreateObj = {
                        Name: editContact[0].value,
                        Phone: editContact[1].value,
                        Email: editContact[2].value,
                        Address: editContact[3].value,
                        Favorite: true,
                        Selected: false
                    }
                    allArr.splice(index, 1, newCreateObj);
                    drawDiv(allArr);
                    saveData();
                } 
                if (el.Favorite === false) {
                    el.Favorite = null;     
                    const newCreateObj = {
                        Name: editContact[0].value,
                        Phone: editContact[1].value,
                        Email: editContact[2].value,
                        Address: editContact[3].value,
                        Favorite: false,
                        Selected: false
                    }
                    allArr.splice(index, 1, newCreateObj);
                    drawDiv(allArr);
                    saveData();
                }  
            })
        } else {
            container.style.display = 'none';
        }

    })

    checkBox.addEventListener('click', (e) => {
        allArr[index].Selected = !allArr[index].Selected;
        drawDiv(allArr);
        saveData();
    })

    favoriteBtn.addEventListener('click', (e) => {

        allArr[index].Favorite = !allArr[index].Favorite;
        drawDiv(allArr);
        saveData();

    })


    name.textContent = `Name : ${el.Name}`;
    phone.textContent = `Phone : ${el.Phone}`;
    email.textContent = `Email : ${el.Email}`;
    address.textContent = `Home Address : ${el.Address}`;
    btn.textContent = 'Del';
    favoriteBtn.textContent = allArr[index].Favorite ? 'Remove from Favorites' : 'Add to Favorites';
    checkBox.textContent = allArr[index].Selected ? 'Unselect' : 'Select';
    editBtn.textContent = 'Edit';

    container.appendChild(name);
    container.appendChild(phone);
    container.appendChild(email);
    container.appendChild(address);
    container.appendChild(btn);
    container.appendChild(favoriteBtn);
    container.appendChild(checkBox);
    container.appendChild(editBtn);

    target.appendChild(container);
}




//selects where to draw divs that were recently created
function drawDiv(arr, filtered) {

    result = document.getElementById('result');
    favorite = document.getElementById('favorites_container');
    result.innerHTML = null;
    favorite.innerHTML = null;

    if (arr) {
        allArr.forEach((el, index) => {

            if (el.Favorite) {
                drawSingle(el, favorite, index);
            }
            drawSingle(el, result, index);
        })
    } else {
        filterArray.forEach((el, index) => {
            if (el.Favorite) {
                drawSingle(el, favorite, index);
            }
            drawSingle(el, result, index);
        })
    }

    if (arr) {
        allArr.forEach((el) => {
            let check = document.getElementById('select');
    
            if (el.Selected) {
                check.checked = true;
            } else {
                check.checked = false;
            }
        })
    } else {
        filterArray.forEach((el) => {
            let check = document.getElementById('select');
    
            if (el.Selected) {
                check.checked = true;
            } else {
                check.checked = false;
            }
        })
    }
}

let clear = document.getElementById('clear_contact');

//clear all contacts
clear.addEventListener('click', (e) => {
    const accept = confirm('are you sure you want to delete all of your contacts?')
    if (accept == true) {
        var container = document.getElementById('result');
        var favContainer = document.getElementById('favorites_container');
        favContainer.innerHTML = null;
        container.innerHTML = null;
        allArr = [];
        localStorage.clear();
    } else {
        alert('thank god we have this confirmation :) be more careful next time')
    }
})

//Search contacts
search_array.addEventListener('input', (e) => {
    e.preventDefault();
    let b = search_array.value;
    if (b) {
        let filteredArray = allArr.filter((item) => {
            return item.Name.includes(b) || item.Email.includes(b) || item.Address.includes(b);
        })    

        filterArray = filteredArray;
        drawDiv(null, filterArray);
        
    } 
    else {
        drawDiv(allArr);
    }
    
})

//draws everything from local storage after page reload
function onLoad() {
    if (localStorage) {
        retrieveInfo();
    } else {
        return null;
    }
}

document.addEventListener("DOMContentLoaded", onLoad());