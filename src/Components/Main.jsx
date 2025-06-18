import React from 'react'
import dummyData from '../dummyData';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';
import Card from './Card';

export default function Main() {
  const [data, setData] = useState(dummyData);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    // 別のカラムに移動した場合
    if(source.droppableId !== destination.droppableId) {
    const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
    const destinationColIndex = data.findIndex((e) => e.id === destination.droppableId);
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='trello'>
        {data.map((section) => {
          return (
            <Droppable key={section.id} droppableId={section.id}>
              {(provided) => (
                <div className="trello-section" ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="trello-section-title">
                    {section.title}
                  </div>
                  <div className="trello-section-content">
                    {section.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                               style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? "0.3" : "1",
                               }}
                          >
                            <Card>{task.title}</Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          )
        })}
      </div>

    </DragDropContext>
  )
}

