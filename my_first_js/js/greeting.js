const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

//event에 input에 관한 정보가 들어간 인수를 브라우저가 전달 해 줌
function onLoginSubmit(event){
    // 어떤 event의 기본 행동이 발생되지 않도록 하는 함수
    event.preventDefault();

    loginForm.classList.add(HIDDEN_CLASSNAME);
    const name = loginInput.value;
    localStorage.setItem(USERNAME_KEY,name);
    paintGreetings(name);
}
function paintGreetings(username){
    greeting.classList.remove(HIDDEN_CLASSNAME);
    greeting.innerText = `Hello ${username}`;
}

const savedUserName = localStorage.getItem(USERNAME_KEY);

// username이 존재하지 않으면
if(savedUserName==null){
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit",onLoginSubmit); 
}
else{
    // 존재하면
    paintGreetings(savedUserName);
}
