import React, { useState } from "react";
import { axiosWithAuth } from "../utils/AxiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log("saveEdit test:", res);
        updateColors(
          colors.map(color => {
            if (color.id === res.data.id) {
              return res.data;
            } else {
              return color;
            }
          })
        );
      })
      .catch(err => console.log(err.response));
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        console.log("delete test:", res);
        updateColors(colors.filter(color => color.id !== res.data));
      })
      .catch(err => console.error(err.response));
  };

  const addColor = () => {
    axiosWithAuth()
      .post("http://localhost:5000/api/colors", newColor)
      .then(res => {
        console.log("add color:", res);
        updateColors(res.data);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <form onSubmit={addColor}>
        <legend>make a new one, my guy!</legend>
        <label>
          name your color:
          <input
            onChange={e => setNewColor({ ...newColor, color: e.target.value })}
            name="color"
            type="text"
            placeholder="color"
            value={newColor.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setNewColor({ ...newColor, code: { hex: e.target.value } })
            }
            name="hex"
            type="text"
            placeholder="hex"
            value={newColor.code.hex}
          />
        </label>
        <button className="btn btn-primary mb1 bg-black" type="submit">
          add that color!
        </button>
      </form>
      <div className="spacer" />
    </div>
  );
};

export default ColorList;