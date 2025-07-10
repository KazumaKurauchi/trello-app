import React from 'react'
import Task from "./Tasks";
import { Draggable } from 'react-beautiful-dnd';

export default function Column( { section, index, handleAddTask }) {
  return (
    <Draggable draggableId={section.id} index={index} key={section.id}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='trello-section'
          style={{
          ...provided.draggableProps.style,
          opacity: snapshot.isDragging ? "0.3" : "1",
          }}
        >
          <div className="trello-section-title">
            {section.title}
            <button onClick={() => handleAddTask(section.id)}>+</button>
          </div>
          <Task section={section}></Task>
        </div>
      )}
    </Draggable>
  )
}
