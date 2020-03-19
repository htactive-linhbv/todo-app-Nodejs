


function htmlElement(todos, dataList) {
    //tao div theo class name
    function createDiv(divClassName) {
        let div = document.createElement('div');
        div.className = divClassName;
        return div;
    }

    function addDiv(divCha, divCon) {
        divCha.appendChild(divCon);
    }
    // taoj div tong
    let todo = createDiv("col-lg-4 todo");
    todo.style.order=`${todos.id}`;
    let title = document.createElement("label");
    title.innerHTML = todos.name;
    title.className = "list-group-item active";
    addDiv(todo, title);

    let listGroup = createDiv("list-group");
    let UlGroup = document.createElement('ul');
    UlGroup.className = "list-group";


 
    // xắp xếp
    let dataListTodo = dataList.sort(function (a, b) {
        return a.order - b.order;
    })
    dataListTodo.forEach(element => {
    
        let liGroup = document.createElement('li');
        liGroup.className = "list-group-item d-flex justify-content-between align-items-center";
        liGroup.innerHTML = element.title;
        let spanGroup = document.createElement('span');
        spanGroup.innerHTML = element.order;
        spanGroup.className = "badge badge-primary badge-pill";

        let divBtn =createDiv("");
        

        let aGroup = document.createElement('button');
        aGroup.className = "btn btn-danger";
        let btnGroup = document.createElement('button');
        btnGroup.className="btn btn-info";

        
        // them su kien cap nhap
        btnGroup.onclick = function () {
            fetch(`http://localhost:3000/api/v1/todolists/${element.id}/tasks/update`)
            .then((response) => {
              return response.json();
            })
            .then((data) =>{ 
              console.log(data);
              
              createInputUpdate(data);
            });
        }


        
        aGroup.onclick = function () {
            // thêm delete vào thẻ btn
            fetch(`http://localhost:3000/api/v1/todolists/${element.id}`, {
                method: 'DELETE',
            })
                .then(res => res.text()) // or res.json()
                .then(res => {
                    console.log(res);
                    window.location.reload();
                })
            
                
        };
        let iBtnGroup = document.createElement('i');
        iBtnGroup.className="fas fa-wrench";
        let iGroup = document.createElement('i');
        iGroup.className = "far fa-trash-alt";
        
        addDiv(liGroup, spanGroup);
        
        addDiv(btnGroup,iBtnGroup);

       btnGroup.style.marginRight= "10px";
        addDiv(divBtn,btnGroup);
        addDiv(divBtn,aGroup);
        addDiv(liGroup,divBtn);
        // addDiv(liGroup,btnGroup);
        // addDiv(liGroup, aGroup);
        
        addDiv(aGroup, iGroup);
        addDiv(UlGroup, liGroup);
    });










    let formInput = createDiv("input-group mb-3");
    let iInput = document.createElement('input');
    iInput.className = "form-control";
    iInput.type = "text";
    iInput.id = `input${todos.id}`;

    let btnDiv = createDiv('input-group-append');
    let btn = document.createElement('button');
    btn.className = "btn btn-success";
    btn.innerHTML = "Thêm mới";
    btn.onclick = function () {
        let value = document.getElementById(`input${todos.id}`).value;
        let date = new Date();
        let data = {
            title: value,
            createdAt : `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}-${date.getHours()}-${date.getMinutes()}`,
            id:Math.floor(Math.random() * 101).toString(),

        }
        console.log(data);

        fetch(`http://localhost:3000/api/v1/todolists/${todos.id}/tasks`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                window.location.reload()
            });

    };


    addDiv(btnDiv, btn);
    addDiv(formInput, iInput);
    addDiv(formInput, btnDiv);

    addDiv(listGroup, UlGroup);
    addDiv(listGroup, formInput);
    addDiv(todo, listGroup);
    let divTong = document.getElementById('row');
    divTong.appendChild(todo);
}

// //get list
// fetch('http://localhost:3000/api/v1/todolists/')
//     .then((response) => {
//         return response.json();
//     })
//     .then((lists) => {
//         console.log(lists);
//         lists.forEach(element => {
//             fetch(`http://localhost:3000/api/v1/todolists/${element.id}/tasks`)
//                 .then((response) => {
//                     return response.json();
//                 })
//                 .then((data) => {
//                     console.log(data)
//                     htmlElement(element, data);
//                 });
//         });
//     });



fetch('http://localhost:3000/api/v1/todolists/')
    .then((response) => {
        return response.json();
    })
    .then((lists) => {
        console.log(lists);
        for (let i = 0; i < 3; i++) {

            fetch(`http://localhost:3000/api/v1/todolists/${lists[i].id}/tasks`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data)
                    htmlElement(lists[i], data);
                });
        }
    });







// update 



function createInputUpdate(dataUpdate){
    function createDiv(divClassName) {
      let div = document.createElement('div');
      div.className = divClassName;
      return div;
  }
  
  function addDiv(divCha, divCon) {
      divCha.appendChild(divCon);
  }

  if(document.getElementById('divOld')!=null){
    let divOld = document.getElementById('divOld');
   divOld.parentNode.removeChild(divOld);
  }

  let divRender = document.getElementById('update');
    

    let divTong = createDiv("col-lg-8");
        divTong.id="divOld";
    let divListLb= createDiv('list-group');
    let lbDivListLb = document.createElement('label');
    lbDivListLb.innerHTML="update";
    lbDivListLb.className="list-group-item list-group-item-action active";
    addDiv(divListLb,lbDivListLb);
    addDiv(divTong,divListLb);
    let formGroup = document.createElement('form');
    let divIdGroup = createDiv('form-group row ');
    let lbDivIdGroup = document.createElement('label');
    lbDivIdGroup.className = 'col-sm-2 col-form-label';
    lbDivIdGroup.innerHTML= "ID:";
    lbDivIdGroup.htmlFor="staticEmail";
    divInputIdGroup= createDiv('col-sm-10');
    ipDivInputIdGroup = document.createElement('input');
    ipDivInputIdGroup.type="text";
    ipDivInputIdGroup.className='form-control-plaintext';
    ipDivInputIdGroup.value=dataUpdate.todoList.id;
  
    addDiv(divInputIdGroup,ipDivInputIdGroup);
    addDiv(divIdGroup,lbDivIdGroup);
    //addDiv(divIdGroup,lbDivListLb);
    addDiv(divIdGroup,divInputIdGroup);

    

        let divTitleGroup = createDiv('form-group row ');
        let lbDivTitleGroup = document.createElement('label');
        lbDivTitleGroup.className = 'col-sm-2 col-form-label';
        lbDivTitleGroup.innerHTML= "Title:";
        lbDivTitleGroup.htmlFor="staticEmail";
        divInputTitleGroup= createDiv('col-sm-10');
        ipDivInputTitleGroup = document.createElement('input');
        ipDivInputTitleGroup.type="text";
        ipDivInputTitleGroup.className='form-control';
        ipDivInputTitleGroup.value=dataUpdate.todoList.title;
      
        addDiv(divInputTitleGroup,ipDivInputTitleGroup);
        addDiv(divTitleGroup,lbDivTitleGroup);
        //addDiv(divTitleGroup,lbDivListLb);
        addDiv(divTitleGroup,divInputTitleGroup);

    
        let divOrderGroup = createDiv('form-group row ');
        let lbDivOrderGroup = document.createElement('label');
        lbDivOrderGroup.className = 'col-sm-2 col-form-label';
        lbDivOrderGroup.innerHTML= "Order:";
        lbDivOrderGroup.htmlFor="staticEmail";
        divInputOrderGroup= createDiv('col-sm-10');
        ipDivInputOrderGroup = document.createElement('input');
        ipDivInputOrderGroup.type="text";
        ipDivInputOrderGroup.className='form-control';
        ipDivInputOrderGroup.value=dataUpdate.todoList.order;
      
        addDiv(divInputOrderGroup,ipDivInputOrderGroup);
        addDiv(divOrderGroup,lbDivOrderGroup);
        //addDiv(divOrderGroup,lbDivListLb);
        addDiv(divOrderGroup,divInputOrderGroup);

    let divdescGroup = createDiv('form-group row ');
        let lbDivdescGroup = document.createElement('label');
        lbDivdescGroup.className = 'col-sm-2 col-form-label';
        lbDivdescGroup.innerHTML= "desc:";
        lbDivdescGroup.htmlFor="staticEmail";
        divInputdescGroup= createDiv('col-sm-10');
        ipDivInputdescGroup = document.createElement('input');
        ipDivInputdescGroup.type="text";
        ipDivInputdescGroup.className='form-control';
        ipDivInputdescGroup.value=dataUpdate.todoList.desc;
      
        addDiv(divInputdescGroup,ipDivInputdescGroup);
        addDiv(divdescGroup,lbDivdescGroup);
        //addDiv(divdescGroup,lbDivListLb);
        addDiv(divdescGroup,divInputdescGroup);

    
        let divlistIdGroup = createDiv('form-group row ');
        let lbDivlistIdGroup = document.createElement('label');
        lbDivlistIdGroup.className = 'col-sm-2 col-form-label';
        lbDivlistIdGroup.innerHTML= "listId:";
        lbDivlistIdGroup.htmlFor="staticEmail";
        divInputlistIdGroup= createDiv('col-sm-10');
        ipDivInputlistIdGroup = document.createElement('input');
        ipDivInputlistIdGroup.type="text";
        ipDivInputlistIdGroup.className='form-control';
        ipDivInputlistIdGroup.value=dataUpdate.todoList.listId;
      
        addDiv(divInputlistIdGroup,ipDivInputlistIdGroup);
        addDiv(divlistIdGroup,lbDivlistIdGroup);
        //addDiv(divlistIdGroup,lbDivListLb);
        addDiv(divlistIdGroup,divInputlistIdGroup);

    let btnUpdate = document.createElement('button');
    btnUpdate.className="btn btn-success";
    btnUpdate.innerHTML='Update';
   
    btnUpdate.onclick=function(){
        date = new Date();
        dataTasksUpdate = {
            id:dataUpdate.todoList.id,
            listId:ipDivInputlistIdGroup.value,
            title: ipDivInputTitleGroup.value,
            createdAt: `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}-${date.getHours()}-${date.getMinutes()}`,
            desc :ipDivInputdescGroup.value,
            order : ipDivInputOrderGroup.value,
    
        }
        console.log(dataTasksUpdate);
        
 
        fetch(`http://localhost:3000/api/v1/todolists/${dataUpdate.todoList.id}/update`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataTasksUpdate)
        }).then(res => {res.json();
            window.location.reload();
        });
    }


    addDiv(formGroup,divIdGroup);
    addDiv(formGroup,divTitleGroup);
    addDiv(formGroup,divlistIdGroup);
    addDiv(formGroup,divdescGroup);
    addDiv(formGroup,divOrderGroup);


    addDiv(divTong,formGroup);
    addDiv(divTong,btnUpdate);

  
  addDiv(divRender,divTong);
  
  }


   



   