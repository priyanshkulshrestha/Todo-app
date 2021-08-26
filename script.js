const inputbox = document.querySelector("#inputBox");
let addbtn = document.querySelector(".addbtn");
let deleteAllBtn = document.querySelector(".deleteall");

showTasks();
function showTasks() {
  let data = localStorage.getItem("New Todo");
  if (data == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(data);
  }
  const pendingTasks = document.querySelector(".pendingtasks");
  pendingTasks.textContent = `${listArray.length}`;
  // console.log(listArray)
  if (listArray.length > 0) {
    deleteAllBtn.disabled = false;
  } else {
    deleteAllBtn.disabled = true;
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<div class="task" style="flex-direction: column;">
    <div class="" style="display: flex; justify-content: space-between;">
        <div class="taskstart" style="display: flex; align-items: center;">
            <input type="checkbox" class="checkbox">
            <h3 class="taskname">${element}</h3>
        </div>
        <div style="display: flex; ">
        <h3 class="fa fa-trash trash" onclick='deleteTask(${index})' style="display: flex; align-self: center;"></h3> 
        <h3 class=" trash describe_btn" onclick='showdetails(${index})' style="display: flex; align-self: center;"><i class = "fa fa-sort-desc"></i></h3>
        <!-- <h3 class="fa fa-sort-desc trash describe_btn" id="describe" style="display: flex; align-self: center;"></h3> -->
        </div>
    </div>
    <section class="details" style="display: none; align-items: center; justify-content: center; flex-direction: column;">
    <div style="display: flex; width: 100%; align-items: space-around; justify-content: space-around; padding:5px; flex-wrap: ">
        <div class="task-discription" style="min-width: 170px;">
            <p>Descripton</p>
            <textarea id="task-discp" rows="4" cols="25" class="task-descrip"></textarea>
        </div>
        <div class="task-more" style="min-width: 170px;">
            <p>Due Date</p>
            <input type="date" name="due-date" id="due-task" class = "task-date" style="width:100%;">
            <div>
            <button class = "today daybtn" onclick="todayd(${index})">Today</button>
            <button class = "today daybtn" onclick="tomorrowd(${index})">Tomorrow</button>
            
            </div>
        </div>
    </div>
    <button id = "updatebtn" class="updatebtn" onclick="taskdetails(${index})">Update</button>
    </section>
  </div>`;
  });

  let taskshow = document.querySelector(".taskshow");
  if (newLiTag == "") {
    taskshow.innerHTML =
      '<h3 style="text-align: center;">You have Nothing To-Do</h3>';
  } else {
    taskshow.innerHTML = newLiTag;
    updatebtn = document.querySelector("#updatebtn");
    console.log(updatebtn);
  }
  inputBox.value = " ";
}

function showdetails(index) {
  var a = document.getElementsByClassName("details")[index];
  var d_btn = document.getElementsByClassName("describe_btn")[index];
  if (a.style.display == "none") {
    a.style.display = "flex";
    d_btn.innerHTML = `<i class="fa fa-sort-asc"></i>
    `;
  } else {
    a.style.display = "none";
    d_btn.innerHTML = `<i class = "fa fa-sort-desc"></i>`;
  }
}
// const describe = document.querySelectorAll("#describe");
// describe.addEventListener("click", () => {
//   console.log(this);
//   console.log("this");
//   // cons
//   const parent = this.parentNode;
//   console.log(parent);
//   // const gparent = parent.parentNode;
//   // console.log(gparent);
// });

inputbox.onkeyup = () => {
  let userEnteredValue = inputbox.value;
  // console.log(userEnteredValue)
  if (userEnteredValue.trim() != 0) {
    // console.log('s')
    addbtn.disabled = false;
  } else {
    addbtn.disabled = true;
  }
};

addbtn.onclick = () => {
  let enteredvalue = inputbox.value;
  let data = localStorage.getItem("New Todo");
  if (data == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(data);
  }
  listArray.push(enteredvalue);
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
  // console.log(listArray)
  addbtn.disabled = true;
};

// inputbox;
inputbox.addEventListener("keyup", (event) => {
  event.keyCode === 13 ? addthroughenter() : null;
});

function addthroughenter() {
  let userEnteredValue = inputbox.value;

  if (userEnteredValue.trim() != 0) {
    let enteredvalue = inputbox.value;
    let data = localStorage.getItem("New Todo");
    if (data == null) {
      listArray = [];
    } else {
      listArray = JSON.parse(data);
    }
    listArray.push(enteredvalue);
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
    // console.log(listArray)
    addbtn.disabled = true;
  }
}

function taskdetails(index) {
  // let discrip = localStorage(getItem("newdiscrip"));
  // discrip[index] =
  let taskdescrip = document.getElementsByClassName("task-descrip")[index];
  let taskdate = document.getElementsByClassName("task-date")[index];
  if (taskdate.value == "" || taskdescrip.value == "") {
    alert("Firstly fill both Desripton and date.");
  }
  console.log(taskdate.value);
  console.log(taskdescrip.value);
  taskdescrip.innerHTML = taskdescrip.value;
}

function deleteTask(index) {
  let data = localStorage.getItem("New Todo");
  listArray = JSON.parse(data);
  listArray.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
}

function deleteall() {
  listArray = [];
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
}

var a = 1;
function darkmode() {
  var element = document.body;
  var box = document.querySelector(".box");
  var togglebutton = document.querySelector(".togglebutton");
  if (a == 1) {
    box.style.background = "white";
    togglebutton.innerHTML =
      'Dark&nbsp;Mode&nbsp;<i class="fa fa-star" aria-hidden="true"></i>';
    a = 0;
  } else {
    box.style.background = "black";
    togglebutton.innerHTML = 'Light&nbsp;Mode&nbsp;<i class="fa fa-sun-o"></i>';
    a = 1;
  }
  element.classList.toggle("dark-mode");
}

function todayd(index) {
  let taskdate = document.getElementsByClassName("task-date")[index];
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;
  taskdate.value = today;
  console.log(today);
}
function tomorrowd(index) {
  let taskdate = document.getElementsByClassName("task-date")[index];
  var today = new Date();
  var dd = today.getDate() + 1;
  var mm = today.getMonth() + 1;

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;
  taskdate.value = today;
  console.log(today);
}
