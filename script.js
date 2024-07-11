
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


function addBookToLibrary(){
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;

    let book = new Book(title, author, pages);
    myLibrary.push(book);
   
}



const submitBtn = document.querySelector("#submitBook");
submitBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    addBookToLibrary();
    updateTable();

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
