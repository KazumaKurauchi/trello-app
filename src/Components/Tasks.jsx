import React from 'react'
import Card from './Card';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function Task({ section }) {
  return (
    <Droppable droppableId={section.id} type="TASK">
        {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
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
        )}
    </Droppable>
  )
}
