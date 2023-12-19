import React, { useState, useEffect } from "react";
import { MdAddBox } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import './Crud.css'

// to get the data from LS

const getLocalItmes = () => {
  let list = localStorage.getItem("lists");
  console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [inputDes, setInputDes] = useState("");
  const [items, setItems] = useState(getLocalItmes());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const addItem = () => {
    if (!(inputDes && inputData)) {
      alert('plzz fill The "Title" and "Des"');
    } else if ((inputData, inputDes && !toggleSubmit)) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData, des: inputDes };
          }
          return elem;
        })
      );
      setToggleSubmit(true);

      setInputData("");
      setInputDes("");

      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
        des: inputDes,
      };
      setItems([...items, allInputData]);
      setInputData("");
      setInputDes("");
    }
  };

  // delete the items
  const deleteItem = (index) => {
    const updateditems = items.filter((elem) => {
      return index !== elem.id;
    });

    setItems(updateditems);
  };

  // edit the item
  //     When user clikc on edit button

  // 1: get the id and name of the data which user clicked to edit
  // 2: set the toggle mode to change the submit button into edit button
  // 3: Now update the value of the setInput with the new updated value to edit.
  // 4: To pass the current element Id to new state variable for reference

  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditItem);

    setToggleSubmit(false);

    setInputData(newEditItem.name);
    setInputDes(newEditItem.des);

    setIsEditItem(id);
  };

  
  // remove all
  const removeAll = () => {
    setItems([]);
  };

  // add data to localStorage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main_container">
        <div className="header">
          <div className="todo-header">
            Todo List <FaClipboardList />
          </div>
        </div>

        <div className="input_container">
          <div className="input_box_container">
            <input
              className="input-box"
              type="text"
              placeholder=" Add Title..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            <input
              className="input-box"
              type="text"
              placeholder="Add Des..."
              value={inputDes}
              onChange={(e) => setInputDes(e.target.value)}
            />
          </div>

          {toggleSubmit ? (
            <i onClick={addItem}>
              <MdAddBox className="add-btn" />
            </i>
          ) : (
            <i onClick={addItem}>
              <MdEdit className="add-btn" />
            </i>
          )}
        </div>

        <div>
          {items.map((elem) => {
            const { id, name, des } = elem;
            return (
              <div key={id}>
                <div className="todo-container">
                  <h3 className="todo-title"> {name}</h3>
                  <p className="todo-des"> {des}</p>

                  <div className="btn">
                    <i className="edit-btn" onClick={() => editItem(elem.id)}>
                      <MdEdit />
                    </i>
                    <i
                      className="delete-btn"
                      onClick={() => deleteItem(elem.id)}
                    >
                      <MdDelete />
                    </i>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* clear all button  */}
        <div className="remove-all">
          <button onClick={removeAll}>
            <span> Remove All </span>{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default Todo;

