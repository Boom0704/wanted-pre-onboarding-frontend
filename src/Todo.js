import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getTodos } from "./components/getTodos";
import { updateTodo } from "./components/updateTodo";
import { deleteTodo } from "./components/deleteTodo";
import { createTodo } from "./components/createTodo";

function App() {
  const navigate = useNavigate();
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
    getTodos().then((result) => {
      setTodoList(result);
    });
  }, [todoList]);

  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = async () => {
    await createTodo(newTodo);
    setNewTodo("");
  };

  return (
    <div className="App">
      <>
        <input
          data-testid="new-todo-input"
          value={newTodo}
          onChange={handleNewTodoChange}
        />
        <button data-testid="new-todo-add-button" onClick={handleAddTodo}>
          추가
        </button>
      </>
      {todoList.map((data) => (
        <div key={data.id}>
          <Todo data={data} />
        </div>
      ))}
    </div>
  );
}
export default App;

function Todo({ data }) {
  const [modify, setModify] = useState(true);
  const [check, setCheck] = useState(data.isCompleted);
  const [inputM, setInputM] = useState("");

  const handleSubmitChange = async () => {
    data.todo = inputM;
    await updateTodo(data);
    setModify(true);
    setInputM("");
  };

  const handleDelete = async () => {
    await deleteTodo(data);
  };

  const handleNewInputMChange = (e) => {
    setInputM(e.target.value);
  };

  const handleCheckboxChange = async (e) => {
    setCheck(!check);
    data.isCompleted = !data.isCompleted;
    await updateTodo(data);
  };

  return (
    <div>
      <li>
        <label>
          <input
            type="checkbox"
            checked={check}
            onChange={() => handleCheckboxChange()}
          />
          <span>{data.todo}</span>
        </label>
        {modify ? (
          <span>
            <button
              data-testid="modify-button"
              onClick={() => setModify(!modify)}
            >
              수정
            </button>
            <button data-testid="delete-button" onClick={() => handleDelete()}>
              삭제
            </button>
          </span>
        ) : (
          <span>
            <input
              data-testid="modify-input"
              value={inputM}
              onChange={handleNewInputMChange}
            />
            <button
              data-testid="submit-button"
              onClick={() => handleSubmitChange()}
            >
              제출
            </button>
            <button
              data-testid="cancel-button"
              onClick={() => setModify(!modify)}
            >
              취소
            </button>
          </span>
        )}
      </li>
    </div>
  );
}
