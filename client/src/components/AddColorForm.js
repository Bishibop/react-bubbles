import React, { useState } from 'react';
import { axiosWithAuth } from '../axiosAuth';

const AddColorForm = ({ colors, updateColors }) => {
  const [color, setColor] = useState({
    color: "",
    code: { hex: "" }
  });

  const addColor = e => {
    e.preventDefault();
    const newColorId = Math.max(...colors.map(color => color.id)) + 1;
    axiosWithAuth().post('/colors', {...color, id: newColorId}).then(res => {
      console.log('add color response: ', res);
      updateColors(res.data);
      setColor({
        color: "",
        code: { hex: "" }
      });
    });
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  return (
    <form onSubmit={addColor}>
      <legend>add color</legend>
      <label>
        color name:
        <input
          onChange={e =>
            setColor({ ...color, color: e.target.value })
          }
          value={color.color}
        />
      </label>
      <label>
        hex code:
        <input
          onChange={e =>
            setColor({
              ...color,
              code: { hex: e.target.value }
            })
          }
          value={color.code.hex}
        />
      </label>
      <div className="button-row">
        <button type="submit">Add Color</button>
      </div>
    </form>
  );
};

export default AddColorForm;
