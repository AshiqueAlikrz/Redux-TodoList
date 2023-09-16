import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToList, deleteList, editList } from "./todoSlice";
import "./display.css";

const Display = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.todos.items);
  const [editedItemId, setEditedItemId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const inputRef = useRef(null);

  const handleClick = (e, id) => {
    
    const targetClass = e.target.className;
    if (targetClass.includes("button-edit")) {
      setEditedText(list.find((item) => item.id === Number(id)).data);
      setEditedItemId(Number(id));
    } else if (targetClass.includes("button-save")) {
      if (editedText.trim() !== "") {
        dispatch(editList({ id: Number(id), data: editedText }));
      } else {
        dispatch(deleteList(Number(id)));
      }
      setEditedItemId(null);
      setEditedText("");
    } else if (targetClass.includes("button-delete")) {
      dispatch(deleteList(Number(id)));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = e.target.input.value.trim();
    if (trimmedValue !== "") {
      dispatch(addToList(trimmedValue));
      e.target.reset();
    }
  };

  useEffect(() => {
    if (editedItemId !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editedItemId]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="input"
            className="input"
            placeholder="Type here!"
          />
          <button className="btn" type="submit">
            <span>ADD</span>
          </button>
        </div>
      </form>
      <div className="paper">
        <div className="lines">
          <ul>
            {[...list].reverse().map((item) => (
              <li key={item.id} 
              onClick={(e) => handleClick(e, item.id)}>
                {editedItemId === item.id ? (
                  <div>
                    <input
                      type="text"
                      defaultValue={item.data}
                      onChange={(e) => setEditedText(e.target.value)}
                      ref={inputRef}
                    />
                    <button className="button-save">Save</button>
                    <button className="button-delete">Delete</button>
                  </div>
                ) : (
                  <div>
                    {item.data}
                    <button className="button-edit">Edit</button>
                    <button className="button-delete">Delete</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Display;
