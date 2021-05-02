const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const pendingList = document.getElementById("js-toDoPendingList");
const finishedList = document.getElementById("js-toDoFinishedList");

const PENDINGS_LS = "PENDING";
const FINISNEDS_LS = "FINISHED";

let pendings = [];
let finisheds = [];
let count = 0;

function saveLists() {
  localStorage.setItem(PENDINGS_LS, JSON.stringify(pendings));
  localStorage.setItem(FINISNEDS_LS, JSON.stringify(finisheds));
}

function paintList(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteButton = document.createElement("button");
  const changeButton = document.createElement("button");
  const newId = count + 1;
  span.innerText = text;
  deleteButton.innerText = "❌";
  deleteButton.addEventListener("click", function (event) {
    if (event.target.parentNode.parentNode.id === "js-toDoPendingList") {
      pendingList.removeChild(event.target.parentNode);
      const cleanList = pendings.filter(function (list) {
        return list.id !== parseInt(li.id);
      });
      pendings = cleanList;
      saveLists();
    } else {
      finishedList.removeChild(event.target.parentNode);
      const cleanList = finisheds.filter(function (list) {
        return list.id !== parseInt(li.id);
      });
      finisheds = cleanList;
      saveLists();
    }
  });
  changeButton.innerText = "✅";
  changeButton.addEventListener("click", function (event) {
    if (event.target.parentNode.parentNode.id === "js-toDoPendingList") {
      finishedList.appendChild(event.target.parentNode);
      const addList = pendings.find(function (list) {
        return list.id === parseInt(li.id);
      });
      const cleanList = pendings.filter(function (list) {
        return list.id !== parseInt(li.id);
      });
      finisheds.push(addList);
      pendings = cleanList;
      saveLists();
      changeButton.innerText = "⏪";
    } else {
      pendingList.appendChild(event.target.parentNode);
      const addList = finisheds.find(function (list) {
        return list.id === parseInt(li.id);
      });
      const cleanList = finisheds.filter(function (list) {
        return list.id !== parseInt(li.id);
      });
      pendings.push(addList);
      finisheds = cleanList;
      saveLists();
      changeButton.innerText = "✅";
    }
  });
  count += 1;
  li.appendChild(changeButton);
  li.appendChild(deleteButton);
  li.appendChild(span);
  li.id = newId;
  pendingList.appendChild(li);
  const listObj = {
    text: text,
    id: newId
  };
  pendings.push(listObj);
  saveLists();
}

function paintFinished(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteButton = document.createElement("button");
  const changeButton = document.createElement("button");
  const newId = count + 1;
  span.innerText = text;
  deleteButton.innerText = "❌";
  deleteButton.addEventListener("click", function (event) {
    if (event.target.parentNode.parentNode.id === "js-toDoPendingList") {
      pendingList.removeChild(event.target.parentNode);
      const cleanList = pendings.filter(function (list) {
        return list.id !== parseInt(li.id);
      });
      pendings = cleanList;
      saveLists();
    } else {
      finishedList.removeChild(event.target.parentNode);
      const cleanList = finisheds.filter(function (list) {
        return list.id !== parseInt(li.id);
      });
      finisheds = cleanList;
      saveLists();
    }
  });
  changeButton.innerText = "⏪";
  changeButton.addEventListener("click", function (event) {
    if (event.target.parentNode.parentNode.id === "js-toDoPendingList") {
      finishedList.appendChild(event.target.parentNode);
      const addList = pendings.find(function (list) {
        return list.id === parseInt(li.id);
      });
      const cleanList = pendings.filter(function (list) {
        return list.id !== parseInt(li.id);
      });
      finisheds.push(addList);
      pendings = cleanList;
      saveLists();
      changeButton.innerText = "⏪";
    } else {
      pendingList.appendChild(event.target.parentNode);
      const addList = finisheds.find(function (list) {
        return list.id === parseInt(li.id);
      });
      const cleanList = finisheds.filter(function (list) {
        return list.id !== parseInt(li.id);
      });
      pendings.push(addList);
      finisheds = cleanList;
      saveLists();
      changeButton.innerText = "✅";
    }
  });
  count += 1;
  li.appendChild(changeButton);
  li.appendChild(deleteButton);
  li.appendChild(span);
  li.id = newId;
  finishedList.appendChild(li);
  const listObj = {
    text: text,
    id: newId
  };
  finisheds.push(listObj);
  saveLists();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintList(currentValue);
  toDoInput.value = "";
}

function loadLists() {
  const loadedPendingLists = localStorage.getItem(PENDINGS_LS);
  const loadedFinishedLists = localStorage.getItem(FINISNEDS_LS);
  if (loadedPendingLists !== null) {
    const parsedLists = JSON.parse(loadedPendingLists);
    parsedLists.forEach(function (list) {
      paintList(list.text);
    });
  }
  if (loadedFinishedLists !== null) {
    const parsedLists = JSON.parse(loadedFinishedLists);
    parsedLists.forEach(function (list) {
      paintFinished(list.text);
    });
  }
}

function init() {
  loadLists();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
