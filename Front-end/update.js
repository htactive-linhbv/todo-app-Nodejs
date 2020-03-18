 //tao div theo class name
 function addElement(task){
 function createDiv(divClassName) {
    let div = document.createElement('div');
    div.className = divClassName;
    return div;
}

function addDiv(divCha, divCon) {
    divCha.appendChild(divCon);
}


let divTong = createDiv(" divCha");
let listLable= createDiv("list-group");
let lbListlable = document.createElement('label');
lbListlable.className="list-group-item list-group-item-action active";
lbListlable.innerHTML="Update";

addDiv(listLable,lbListlable);
addDiv(divTong,listLable);

let form = document.createElement('form');
// for (const key in task) {
//     createFormInput(task,key);
//     console.log(key);
    
// }
function createFormInput(task,nameValue){
   let divForm= createDiv("form-group row");
   let lbDivForm= document.createElement('label');
   lbDivForm.className="col-sm-2 col-form-label";
   lbDivForm.innerHTML= nameValue;

   let divInput = createDiv("col-sm-10");
   let input = document.createElement('input');
   input.type="text";
   input.className="form-control-plaintext";
   input.value= `${task}.${nameValue}`;
    addDiv(divInput,input);
    addDiv(divForm,lbDivForm);
    addDiv(divForm,divInput);
    addDiv(form,divForm);

};
  let cha = document.getElementById('divTong');
  addElement(cha,divTong);
}
fetch(`http://localhost:3000/api/v1/todolists/4/tasks/update`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    addElement(data);
  });

  function update() {
    fetch(`http://localhost:3000/api/v1/todolists/4/tasks/update`)
  .then((response) => {
    return response.json();
  })
  .then((data) =>{ 
    console.log(data);
  });
  }