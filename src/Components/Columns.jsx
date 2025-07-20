import React from 'react'
import Task from "./Tasks";
import { Draggable } from 'react-beautiful-dnd';
import { useState } from "react";
import dummyData from '../initialData';

export default function Column( { section, index, handleAddTask, handleDeleteTask } ) {

  // const [data, setState] = useState(dummyData);

  // const handleAddTask = (sectionId) => {
  //   const newTask = data.map((section) => {
  //     if (section.id === sectionId) {
  //       const newTask = {
  //         id: `task-${Date.now()}`,
  //         title: "新しいタスク",
  //       };
  //       return {
  //         ...section,
  //         tasks: [...section.tasks, newTask],
  //       };
  //     }
  //     return section;
  //   });
  //   setState(newTask);
  // };
  

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
            <br />
            <button onClick={() => handleAddTask(section.id)}>タスクの追加</button>
          </div>
          <Task section={section} handleDeleteTask={handleDeleteTask} />
        </div>
      )}
    </Draggable>
  )
}


// 続きの内容(引き継ぎ)　////////////////////////////
//　タスク追加機能完了
// 追加したタスクの内容を変更できるようにする
// ブランチを作って機能追加していく