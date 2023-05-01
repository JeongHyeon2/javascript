const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");
let toDos = [];
const TODOS_KEY = "todos";

function saveToDo(){
    // 배열을 JSON형태의 string으로 변환
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));
}
function deleteToDo(event){
    // btn의 상위 부모를 찾는 과정임. 어떤 li>btn에서 눌렸는지 알기위해
    const li = event.target.parentElement;
    /* array.filter는 array를 돌면서 뒤 함수가 true를 반환하면 그대로, false를  반환하면 그 요소를 지우고 새로운 배열을 만든다.
    여기서는 toDos 배열에서, 삭제된 li id 값이 배열안에 있는 id값과 같으면 배열에 있는 요소를 삭제한다.
    */
    li.remove();
    toDos = toDos.filter((toDo)=>toDo.id!=parseInt(li.id));
    saveToDo();
} 
// li>(span, button) 형식으로 만들기
function paintToDo(newToDo){
    const li = document.createElement("li");
    li.id=newToDo.id;
    const span = document.createElement("span");
    span.innerText = newToDo.text;
    const button  = document.createElement("button");
    button.innerText="❌";
    //btn에 이벤트 추가
    button.addEventListener("click",deleteToDo);

    li.appendChild(span);
    li.append(button);
   
    toDoList.appendChild(li);
}
function handleToDoSubmit(event){
    event.preventDefault();
    //input의 값을 가져와서 저장
    const newToDo = toDoInput.value; 
    toDoInput.value="";
    const newToDoObj={
        text:newToDo,
        id:Date.now(),
    };
    toDos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDo();
}
toDoForm.addEventListener("submit",handleToDoSubmit);

// local stoage에서 데이터를 받아옴 ->string타입
const savedTodo = localStorage.getItem(TODOS_KEY);

if(savedTodo!==null){
    // 데이터가 있으면 string을 array로 변환
    const parsedTodo = JSON.parse(savedTodo);
    toDos = parsedTodo;
    parsedTodo.forEach(paintToDo);
}
