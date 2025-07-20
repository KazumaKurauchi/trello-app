import React from 'react'
import dummyData from '../initialData';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';
import Column from './Columns';
import { v4 as uuidv4 } from 'uuid';

export default function Main() {
  const [data, setData] = useState(dummyData);

  const handleAddTask = (sectionId) => {
    const newTask = data.map((section) => {
      if (section.id === sectionId) {
        const newTask = {
          id: uuidv4(),
          title: "新しいタスク",
        };
        return {
          ...section,
          tasks: [...section.tasks, newTask],
        };
      }
      return section;
    });
    setData(newTask);
  };

  const handleDeleteTask = (sectionId, taskId) => {
    const newData = data.map((section) => {
      if(section.id === sectionId) {
        return {
          ...section,
          tasks: section.tasks.filter(task => task.id !== taskId)
        };
      }
      return section; 
    });
    setData(newData);
  };

  const onDragEnd = (result) => {
    const { destination, source, type } = result;

    // ドロップ先がない場合は何もしない
    if (!destination) {
      return;
    }
    // カラムの並び替えの場合
    if (type === "COLUMN") {
      console.log(type);
      const newData = Array.from(data);
      const [removed] = newData.splice(source.index, 1);
      newData.splice(destination.index, 0, removed);
      setData(newData);
      return;
    }
    // 別のカラムに移動した場合
    if(source.droppableId !== destination.droppableId) {
    const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
    const destinationColIndex = data.findIndex((e) => e.id === destination.droppableId);
    console.log(result);
    console.log(sourceColIndex);
    console.log(destinationColIndex);
    const sourceCol = data[sourceColIndex];
    const destinationCol = data[destinationColIndex];

    const sourceTasks = [...sourceCol.tasks];
    const destinationTasks = [...destinationCol.tasks];
    // 動かし始めたタスクを削除
    const [removed] = sourceTasks.splice(source.index, 1);
    // 動かした後のカラムにタスクを追加
    destinationTasks.splice(destination.index, 0, removed);

    data[sourceColIndex].tasks = sourceTasks;
    data[destinationColIndex].tasks = destinationTasks;
    setData(data);
    }
    else {
        // 同じカラム内でタスクの入れ替え
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      console.log(sourceColIndex);
      console.log(result);
      const sourceCol = data[sourceColIndex];
      console.log(sourceCol);

      const sourceTasks = [...sourceCol.tasks];
      // タスクを削除
      const [removed] = sourceTasks.splice(source.index, 1);
      // タスクを追加
      sourceTasks.splice(destination.index, 0, removed);

      data[sourceColIndex].tasks = sourceTasks;
      setData(data);
    }
  }

  // const handleAddTask = (columnId) => {
  //   const newData = data.map((col) => {
  //     if (col.id === columnId) {
  //       const newTask = {
  //         id: uuidv4(),
  //         title: "新しいタスク",
  //       };
  //       return { ...col, tasks: [...col.tasks, newTask] };
  //     }
  //     return col;
  //   });
  //   setData(newData);
  //   console.log(columnId);
  // };

  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable  droppableId="all-columns" direction="horizontal" type="COLUMN" >
        {(provided) => (
           <div className="trello" ref={provided.innerRef} {...provided.draggableProps}>
            {data.map((section, index) => (
              <Column key={section.id} section={section} index={index} handleAddTask={handleAddTask} handleDeleteTask={handleDeleteTask} />
            ))}
            {provided.placeholder}
           </div>
        )}
      </Droppable>

    </DragDropContext>
  )
}

