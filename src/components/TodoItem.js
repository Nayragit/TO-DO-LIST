import React from "react";
import { AiOutlineDelete, AiFillEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

const TodoItem = (props) => {
  const {
    data,
    isCompleteScreen,
    handleDeleteTodo,
    handleCompleted,
    handleEditTodo
  } = props;

  const { title, id, completed } = data;

  if (completed !== isCompleteScreen) {
    return <></>;
  }

  const handleEdit = () => {
    const newTitle = prompt("Enter new title", title);
    if (!newTitle) return;
    const updatedTodo = { id, title: newTitle, completed };
    handleEditTodo(id, updatedTodo);
  };

  return (
    <div className="todo-list-item" key={id}>
      <div>
        <h3>{title}</h3>
      </div>
      <div>
        <AiOutlineDelete
          className="icon"
          onClick={() => handleDeleteTodo(id)}
          title="Delete?"
        />
        {isCompleteScreen || (
          <>
            <BsCheckLg
              className="check-icon"
              onClick={() => handleCompleted(id)}
              title="Complete?"
            />
            <AiFillEdit
              className="icon"
              onClick={() => handleEdit()}
              title="Complete?"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;