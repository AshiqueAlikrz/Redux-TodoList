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

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = e.target.input.value.trim();
    if (trimmedValue !== "") {
      dispatch(addToList(trimmedValue));
      e.target.reset();
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteList(id));
  };

  const handleSave = (id) => {
    console.log(editedText);
    if (editedText.trim() !== "") {
      dispatch(editList({ id, data: editedText }));
    } else {
      dispatch(deleteList(id));
    }
    setEditedItemId(null);
    setEditedText("");
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
        <input type="text" name="input" class="input" placeholder="Type here!" />
          <button className="btn" type="submit">
            <span>ADD</span>
          </button>
        </div>
      </form>
      <div className="paper">
        <div className="lines">
          <div>
            {[...list].reverse().map((item) => (
              <li key={item.id}>
                {editedItemId === item.id ? (
                  <div>
                    <input
                      type="text"
                      defaultValue={item.data}
                      onChange={(e) => setEditedText(e.target.value)}
                      ref={inputRef}
                    />
                    <button className="button-save" onClick={() => handleSave(item.id)}>Save</button>
                    <button   className="button-delete" onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </div>
                ) : (
                  <div>
                    {item.data}
                    <button className="button-edit" onClick={() => {
                      setEditedText(item.data)
                      setEditedItemId(item.id)}}>
                      Edit
                    </button>
                    <button  className="button-delete" onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                    
                  </div>
                )}
              </li>
            ))}
          </div>
        </div>
        <div className="holes">
          <div className="hole"></div>
          <div className="hole"></div>
          <div className="hole"></div>
        </div>
      </div>
    </div>
  );
};

export default Display;
