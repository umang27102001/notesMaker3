let add = document.getElementById("add");
let remove = document.getElementById("remove");
let search = document.getElementById("search");

add.addEventListener('click', (e) => {
    let note = document.getElementById("note");
    let title = document.getElementById("title");
    let localNote = localStorage.getItem("note")
    e.preventDefault()
    if (localNote == null) {
        noteArray = [];
    }
    else {
        noteStr = localStorage.getItem("note");
        noteArray = JSON.parse(noteStr);
    }
    noteArray.push([title.value, note.value]);
    localStorage.setItem('note', JSON.stringify(noteArray));
    
    render();
note.value=""
title.value=""


})
let render = () => {
    let localNote = localStorage.getItem("note")

    if (localNote == null) {
        noteArray = [];
    }
    else {
        noteStr = localStorage.getItem("note");
        noteArray = JSON.parse(noteStr);
    }
    localStorage.setItem('note', JSON.stringify(noteArray));
   

    let card_box = document.getElementById("card-container");
    let str = "";
    noteArray.forEach((element, index) => {
        str += `
<div class="card col-12 col-md-5 m-3 id="card" style="background-color:rgb(242,${Math.round(5 + (200) * Math.random())},${Math.round(5 + (50) * Math.random())})">
           
            <div class="card-body">
              <h5 class="card-title" style="color:white">${element[0]}</h5>
              <p class="card-text" style="">${element[1]}</p>
              <a href="#" class="btn btn-primary" onclick="f(${index})">Delete</a>
              <a href="#" class="btn btn-primary edit">Reload To Edit</a>
              
              <div style="font-size:0.8rem">${new Date()}</div>
              

             
            </div>
          </div>
      </div>
`
    })
    card_box.innerHTML = str;

}
render()
let date = new Date()
let f = (index) => {
    noteStr = localStorage.getItem("note");
    noteArray = JSON.parse(noteStr);
    noteArray.splice(index, 1);
    localStorage.setItem("note", JSON.stringify(noteArray));
    render()
}
remove.addEventListener("click", (e) => {
    localStorage.clear();
    render();
})

document.body.style.backgroundColor = `rgb(16, 6, 49)`;

let card=document.getElementsByClassName("card");
search.addEventListener('input',()=>{
    let searchTxt=search.value.toLowerCase();
    Array.from(card).forEach(element=>{
        let innerTxt = element.getElementsByClassName("card-body")[0].getElementsByClassName("card-title")[0].innerText;
        let innerTxt2 = element.getElementsByClassName("card-body")[0].getElementsByClassName("card-text")[0].innerText;
        if(searchTxt==''){

            element.style.display="block";
            element.getElementsByClassName("card-body")[0].getElementsByClassName("card-title")[0].style.color="white";
            element.getElementsByClassName("card-body")[0].getElementsByClassName("card-text")[0].style.color="white"
        }
        else if(searchTxt==innerTxt||searchTxt==innerTxt2){
            element.style.display="block";
            if(searchTxt==innerTxt){
                element.getElementsByClassName("card-body")[0].getElementsByClassName("card-title")[0].style.color="black"
            }
            else if(searchTxt==innerTxt2){
                element.getElementsByClassName("card-body")[0].getElementsByClassName("card-text")[0].style.color="black"
            }
        }
        else{
            element.style.display="none";

        }
        
    })
})


let p=document.getElementsByClassName("card-body");
Array.from(p).forEach((element,index)=>{
    element.getElementsByClassName("edit")[0].addEventListener("click",()=>{
        let elemTxt=element.getElementsByClassName("card-text")[0].innerText;
        let textNum=document.getElementsByClassName("textarea").length;
        if(textNum==0){
            element.getElementsByClassName("card-text")[0].innerHTML=`<textarea id="textarea" class="textarea form-control"  style="width:100%"></textarea>`
      
            document.getElementById("textarea").innerText=elemTxt;
            document.getElementById("textarea").addEventListener('blur',()=>{
                element.getElementsByClassName("card-text")[0].innerHTML= document.getElementById("textarea").value
                let New=localStorage.getItem("note");
                newArr=JSON.parse(New);
                newArr[index][1]=element.getElementsByClassName("card-text")[0].innerHTML;
                localStorage.setItem("note",JSON.stringify(newArr))
            })
        
        }
    })
})
// Array.from(document.getElementsByClassName("btn")).forEach(e=>{
//     e.style.backgroundColor=`rgb(242,${Math.round(5 + (200) * Math.random())},${Math.round(5 + (50) * Math.random())})`
// })