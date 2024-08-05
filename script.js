
class Book{

    constructor(title, author, pages, read = 0){
        this.isCompleted = false;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    
    info = () => {
        return `${title} by ${author}, ${pages - read} pages, not read yet`;
        //return this.title + " by " + this.author + ", " + this.pages-this.read + ", pages, not read yet";
    };
}

const myLibrary = [];
const error = document.querySelector(".error");

function checkErrors(){
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const pages = document.getElementById("pages");
    if(title.validity.valueMissing){
        error.textContent = "No title?";
        return false;

    }
    else{
        error.textContent = "";
    }

    if(author.validity.valueMissing){
        error.textContent = "No author?";
        return false;

    }
    else{
        error.textContent = "";
    }

    if(pages.validity.valueMissing){
        error.textContent = "No pages?";
        return false;
    }
    else{
        error.textContent = "";
    }

    return true;
}


function addBookToLibrary(){
    let titleVal = title.value;
    let authorVal = author.value;
    let pagesVal = pages.value;

    let book = new Book(titleVal, authorVal, pagesVal);
    myLibrary.push(book);
   
}

function findBook(book) { 
    let titleVal = title.value;
    let authorVal = author.value;
    
    return book.title === titleVal && 
    authorVal === book.author;
  }

const submitBtn = document.querySelector("#submitBook");
submitBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    
    
    if(checkErrors())
    {
       console.log(myLibrary.find(findBook))
       console.log(myLibrary)
        if(!myLibrary.find(findBook))
        {
            addBookToLibrary();
            updateTable();
        
            bookDialog.close();
        }
        else{
            error.textContent = "Bruh you added this already";
        }
    }
    else{
        //idk
    }

    e.preventDefault();
});

const cancelBtn = document.querySelector("#cancel");
cancelBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    bookDialog.close();
});

const showDialog = document.querySelector("#showDialog");
const bookDialog = document.querySelector("#bookDialog");
showDialog.addEventListener("click", (e) => {
    bookDialog.showModal();
    
});


function updateTable(){
    const tableBody = document.querySelector("#bookTableBody");

    while(tableBody.lastChild){
        tableBody.removeChild(tableBody.lastChild);
    }

    for(const [i, book] of myLibrary.entries()){
        
        const row = document.createElement("tr");
        let data = [book.title, book.author, book.pages, book.read];
        for(item of data){
            const td = document.createElement("td");
            td.textContent = item;
            row.appendChild(td);
        }

        const tdRead = document.createElement("td");
        tdRead.setAttribute("class", "btn");
        const btnRead = document.createElement("button");
        btnRead.textContent = "Read";
        btnRead.addEventListener("click", ()=>{
            if(book.pages > book.read)
                book.read++;
            updateTable();
        })
        tdRead.appendChild(btnRead);
        row.appendChild(tdRead);

        const td = document.createElement("td");
        td.setAttribute("class", "btn removeBtn");
        const btn = document.createElement("button");
        btn.textContent = "Remove";
        btn.addEventListener("click", ()=>{
            myLibrary.splice(i, 1);
            updateTable();
        })
        td.appendChild(btn);
        row.appendChild(td);

        const CompTd = document.createElement("td");
        CompTd.setAttribute("class", "btn");
        const CompBtn = document.createElement("input");
        CompBtn.setAttribute("type", "checkbox")
        CompBtn.textContent = "Complete";
        CompBtn.checked = book.isCompleted;
        CompBtn.addEventListener("click", ()=>{
            if(CompBtn.checked){
                
                book.read = book.pages;
                book.isCompleted = true;
                updateTable();
            }    
            else{
                
                book.read = 0;
                book.isCompleted = false;
                updateTable();
            }
        })
        CompTd.appendChild(CompBtn);
        row.appendChild(CompTd);
         


        tableBody.appendChild(row);
        if(book.isCompleted)
            {
                tableBody.childNodes[i].setAttribute("class", "completed");
            }
            else  
            {
                tableBody.childNodes[i].setAttribute("class", "");
            } 
    }
}
