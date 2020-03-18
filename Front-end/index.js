


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


    // let liGroup = document.createElement('li');
    // liGroup.className = "list-group-item d-flex justify-content-between align-items-center";
    // let spanGroup = document.createElement('span');
    // spanGroup.className = "badge badge-primary badge-pill";
    // let aGroup = document.createElement('a');
    // let iGroup = document.createElement('i');
    // iGroup.className = "far fa-trash-alt";




    // let liGroup = document.createElement('li');
    // liGroup.className = "list-group-item d-flex justify-content-between align-items-center";
    // listGroup.innerHTML = data.title;
    // let spanGroup = document.createElement('span');
    // spanGroup.innerHTML = data.order;
    // spanGroup.className = "badge badge-primary badge-pill";
    // let aGroup = document.createElement('a');
    // let iGroup = document.createElement('i');
    // iGroup.className = "far fa-trash-alt";
    // addDiv(liGroup, spanGroup);
    // addDiv(liGroup, aGroup);
    // addDiv(aGroup, iGroup);
    // addDiv(UlGroup, liGroup);
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
        let aGroup = document.createElement('button');
        aGroup.className = "btn btn-danger";
        let btnGroup = document.createElement('button');
        btnGroup.className="btn btn-info";
        // them su kien cap nhap
        btnGroup.onclick = function (element) {
            fetch(`http://localhost:3000/api/v1/todolists/${element.id}/tasks/update`)
            .then((response) => {
              return response.json();
            })
            .then((data) =>{ 
              console.log(data);
              addElementUpdate(data);
            });
        }


        
        aGroup.onclick = function (dataListTodo) {
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
        addDiv(liGroup,btnGroup);
        addDiv(liGroup, aGroup);
        
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

        //let formData = new FormData();
        // formData.append("json", JSON.stringify(data));
        // fetch(`http://localhost:3000/api/v1/todolists/${todos.id}/tasks`,
        //     {
        //         method: "POST",
        //         body: formData
        //     }).then(res=>{
        //         return res.json();

        //     }).then(res=> window.location.reload())


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




   



   