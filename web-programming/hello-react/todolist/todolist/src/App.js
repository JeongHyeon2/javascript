import logo from "./logo.svg";
import "./App.css";
import TodoTemplate from "./component/TodoTemplate";
import TodoInsert from "./component/TodoInsert";
import TodoList from "./component/TodoList";
import React, { useCallback, useRef, useState } from "react";

const initData = [
  { id: 1, text: "리액트의 기초 알아보기", checked: true },
  { id: 2, text: "컴포넌트 스타일링해 보기", checked: true },
  { id: 3, text: "일정 관리 앱 만들어 보기", checked: false },
];

function App() {
  const [todos, setTodos] = useState(initData);
  const nextId = useRef(4);
  const onInsert = useCallback(
    (text) => {
      const todo = { id: nextId.current, text, checked: false };
      setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    [todos]
  );
  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );
  const onToggle = useCallback((id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  });
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList
        todos={todos}
        onRemove={onRemove}
        onToggle={onToggle}
      ></TodoList>
    </TodoTemplate>
  );
}

export default App;
