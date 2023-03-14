import React, { useRef, useState, useEffect } from "react";
import Component from "./components/component";

const COLORS = ['red', 'blue', 'yellow', 'green', 'purple'];
const BGSIZE = ['contain', 'cover', 'fill', 'scale-down', 'none'];

export default function App () {
  const [moveableComponents, setMoveableComponents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [img, setImg] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos?albumId=1')
      .then((response) => {
        return response.json();
      })
      .then((img) => {
        setImg(img);
      });
  }, []);

  const addMoveable = () => {
    // Create a new moveable component and add it to the array

    setMoveableComponents([
      ...moveableComponents,
      {
        id: Math.floor(Math.random() * Date.now()),
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        updateEnd: true,
        imageBgSize: BGSIZE[Math.floor(Math.random() * BGSIZE.length)],
      },
    ]);
  };

  const removeComponent = (id) =>{
    setMoveableComponents((removMoveable) => removMoveable.filter((data) => data.id !== id))
    console.log(id)
  }

  const updateMoveable = (id, newComponent, updateEnd = false) => {
    const updatedMoveables = moveableComponents.map((moveable, i) => {
      if (moveable.id === id) {
        return { id, ...newComponent, updateEnd };
      }
      return moveable;
    });

    setMoveableComponents(updatedMoveables);
  };

  return (
    <main style={{ height: '100vh', width: '100vw' }}>
      <button
        type="button"
        onClick={addMoveable}
        style={{
          background: 'none',
          backgroundImage: 'linear-gradient(to bottom right, #FF416C, #FF4B2B)',
          padding: '9px 12px 8px',
          color: ' #FFFFFF',
          borderRadius: '6px',
          border: 'none',
          outline: 'none',
          fontWeight: '600',
          cursor: 'pointer',
        }}
      >
        Add Moveable
      </button>
      <button onClick={()=>removeComponent(selected)}>
        Remove Moveable
      </button>
      <div
        id="parent"
        style={{
          position: 'relative',
          backgroundImage: 'linear-gradient(to bottom right, #0F2027, #203A43, #2C5364)',
          height: '80vh',
          width: '80vw',
        }}
      >
        {moveableComponents.map((item, index) => (
          <Component 
            {...item} 
            key={index}  
            updateMoveable={updateMoveable} 
            setSelected={setSelected} 
            isSelected={selected === item.id} 
            image={img[index]} />
        ))}
      </div>
    </main>
  );
};
