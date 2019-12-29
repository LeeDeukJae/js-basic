const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

//const > let 으로 변경한 이유 : const는 상수라서 변경이 불가능하기떄문에 변경가능한 let 사용
let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    // filter : .filter안에 지정되어있는 함수에 맞게 forEach처럼 동작하여 true 값들만 뽑아 새로운 배열 생성
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

// toDos를 가져와서 로컬에 저장하는 동작
function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); 
    // JSON.stringify : javascript Object(data)를 string으로 변경
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌ ";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;

    toDoList.appendChild(li);
    // array에 들어갈 toDoObj 선언
    const toDoObj = {
        text: text,
        id: newId
    };
    // toDos에 text, id 값을 넣어준다
    toDos.push(toDoObj)
    saveToDos()
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
  }
  
  function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
      // JSON.parse : String으로 저장된것을 Object로 변경하여 가져온다
      const parsedToDos = JSON.parse(loadedToDos);
      parsedToDos.forEach(function(toDo) {
        paintToDo(toDo.text);
      });
    }
  }
  
  function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
  }
  
  init();