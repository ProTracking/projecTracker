import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { parse, v4 as uuidv4 } from "uuid";
import axios from "axios";


const itemsFromBackend = [
  { id: uuidv4(), subject: "First task", content: "something" },
  { id: uuidv4(), subject: "Second task", content: "something" },
  { id: uuidv4(), subject: "Third task", content: "something" },
  { id: uuidv4(), subject: "Fourth task", content: "something" },
  { id: uuidv4(), subject: "Fifth task", content: "something" },
];

export function DnD(data) {

  const [id, first_name, last_name, token] = data.data;
  const [tickets, setTickets] = useState("");

  const columnsFromBackend = {
    backlog: {
      name: "Backlog",
      items: [],
    },
    blocked: {
      name: "Blocked",
      items: [],
    },
    in_progress: {
      name: "In progress",
      items: [],
    },
    review_in_progress: {
      name: "Review in progress",
      items: [],
    },
    review_approved: {
      name: "Review approved",
      items: [],
    },
  };

  const [columns, setColumns] = useState(columnsFromBackend);


  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
      changeTicketStatus(draggableId, destination.droppableId)

    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };


  const changeTicketStatus = async (ticketId, status) => {
    try {
      const response = await axios.put(
          `/api/ticket/${ticketId}`,
          {status},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
      );

    } catch (error) {
    }
  }


  useEffect(() => {

    axios.get(`/api/tickets/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      const ticketsDataBackend = res.data.data.rows
      const ticketsData = {...columnsFromBackend }

      ticketsDataBackend.forEach(ticket => {
        if(ticket.status) {
          let newTicket = {...ticket, id: ticket.id.toString()}
          ticketsData[ticket.status].items.push(newTicket)
        }
      })
    }).catch(err => console.log(err));
}, []);


  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              key={columnId}
            >
              <br />
              <h6>{column.name}</h6>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.subject}
                                    <br />
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}
