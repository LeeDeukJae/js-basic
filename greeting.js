const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");
    

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

// 이름 저장 (localStorage에 'text' 값 저장)
function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

// Enter시 input에 입력된 값(currentValue)을 전송하고 동작(paintGreeting, saveName)
function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

// 이름 물어보는 화면 출력 Event 동작(Enter)시 handleSubmit 동작
function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

// Hello + input에 입력된 값 출력
function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

// currentUser 아이디가 null이면 askForName 동작 아이디가 존재하면 paintGreeting 동작
function loadName() {
    const currentUser = localStorage.getItem(USER_LS)
    if(currentUser === null) {
        askForName();
    } else {
      paintGreeting(currentUser);
    }
}


function init() {
    loadName();
}

init();