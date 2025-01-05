const addbox = document.querySelector(".addbox");
const popupbox = document.querySelector(".popup-box");
const popuptitle = document.querySelector("header p");
const closeicon = document.querySelector("header i");
const titletag = document.querySelector("input");
const descriptionTag = document.querySelector("textarea");
const submitbutton = document.getElementsByClassName("btn")[0];
const months = ["January", "February", "March", "April", "May", "June", "July", "August","September", "October", "November", "December"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]")
let isupdate = false, updateid

addbox.addEventListener('click', () => {
    if (!isupdate) {  // Only reset if not updating an existing note
        titletag.value = "";                     
        descriptionTag.value = "";               
        popuptitle.innerHTML = "Add a New Note"; 
        submitbutton.innerHTML = "Submit";       
    }
    titletag.focus();
    popupbox.classList.add("show");
});

    

closeicon.addEventListener('click', () => {
    titletag.value = "";
    descriptionTag.value = "";
    isupdate = false;  // Reset update flag on close
    popupbox.classList.remove("show");
});


function ShowNotes (){
    document.querySelectorAll(".note").forEach(note => note.remove())
    notes.forEach((note, index) => {
       let liTag = `<li class="note">
            <div class="details">
                <p>${note.title}</p>
                <span>${note.description}</span>
            </div>
            <div class="bottom-content">
                <span>${note.date}</span>
                <div class="settings">
                    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                    <ul class="menu">
                        <li onclick="editnote('${index}','${note.title}','${note.description}')"><i class="uil uil-pen">Edit</i></li>
                        <li onclick="deletenote(${index})"><i class="uil uil-trash">Delete</i></li>
                    </ul>
                </div>
            </div>
        </li>`
        addbox.insertAdjacentHTML("afterend", liTag)
    });
}
ShowNotes()


function showMenu(elem) {
    // Close any open menus before opening the new one
    const allMenus = document.querySelectorAll('.menu');
    allMenus.forEach(menu => menu.classList.remove("show"));

    elem.parentElement.classList.add("show");

    elem.addEventListener("click", e => e.stopPropagation());

    document.addEventListener("click", function closeMenu(e) {
        if (!elem.parentElement.contains(e.target)) {
            elem.parentElement.classList.remove("show");
            document.removeEventListener("click", closeMenu);
        }
    });
}

function deletenote(noteId){
    notes.splice(noteId,1)
    localStorage.setItem("notes", JSON.stringify(notes))
    ShowNotes()

}
function editnote(noteId, title, description){
    isupdate = true
    addbox.click()
    titletag.value = title
    updateid = noteId
    descriptionTag.value = description
    submitbutton.innerHTML = "Update"
    popuptitle.innerHTML = "Update Note"
}

submitbutton.addEventListener('click', e => {
    e.preventDefault();
    let noteTitle = titletag.value;
    let noteDescription = descriptionTag.value;

    if (noteTitle || noteDescription) {
        let dateobj = new Date();
        let month = months[dateobj.getMonth()];
        let day = dateobj.getDate();
        let year = dateobj.getFullYear();

        let noteInfo = {
            title: noteTitle,
            description: noteDescription,
            date: `${month} ${day}, ${year}`
        };

        if (!isupdate) {
            notes.push(noteInfo);               // Adding new note
        } else {
            notes[updateid] = noteInfo;         // Updating existing note
            isupdate = false;                   // Reset update flag
        }

        localStorage.setItem("notes", JSON.stringify(notes)); // Saving notes
        ShowNotes();
    }

    popupbox.classList.remove("show");
});

