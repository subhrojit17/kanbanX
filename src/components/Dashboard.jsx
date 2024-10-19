import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./Dashboard.css";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { MdExploreOff } from "react-icons/md";

const Dashboard = () => {
  const [days, setDays] = useState(["Day 1"]);
  const [tasks, setTasks] = useState({
    "Day 1": {
      todo: [],
      inProgress: [],
      completed: [],
    },
  });
  const [newTask, setNewTask] = useState("");
  const [currentDay, setCurrentDay] = useState("Day 1");

  // Handle adding new tasks
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const updatedTasks = {
        ...tasks,
        [currentDay]: {
          ...tasks[currentDay],
          todo: [...tasks[currentDay].todo, newTask],
        },
      };
      setTasks(updatedTasks);
      setNewTask("");
    }
  };

  // Add a new day (n+1)
  const addNewDay = () => {
    const newDay = `Day ${days.length + 1}`;
    setDays([...days, newDay]);
    setTasks({
      ...tasks,
      [newDay]: {
        todo: tasks[currentDay].inProgress, // Carry over in-progress tasks
        inProgress: [],
        completed: [],
      },
    });
  };

  // Handle deleting a task from To-Do column
  const handleDeleteTask = (taskToDelete) => {
    const updatedTasks = {
      ...tasks,
      [currentDay]: {
        ...tasks[currentDay],
        todo: tasks[currentDay].todo.filter((task) => task !== taskToDelete),
      },
    };
    setTasks(updatedTasks);
  };

  // Handle editing a task in To-Do column
  const handleEditTask = (taskIndex) => {
    const newTaskText = prompt(
      "Edit your task:",
      tasks[currentDay].todo[taskIndex]
    );
    if (newTaskText !== null && newTaskText.trim() !== "") {
      const updatedTasks = [...tasks[currentDay].todo];
      updatedTasks[taskIndex] = newTaskText;
      setTasks({
        ...tasks,
        [currentDay]: {
          ...tasks[currentDay],
          todo: updatedTasks,
        },
      });
    }
  };

  // Handle drag and drop
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const updatedDayTasks = {
      ...tasks[currentDay],
    };

    // Move task between columns
    const [movedTask] = updatedDayTasks[source.droppableId].splice(
      source.index,
      1
    );
    updatedDayTasks[destination.droppableId].splice(
      destination.index,
      0,
      movedTask
    );

    setTasks({
      ...tasks,
      [currentDay]: updatedDayTasks,
    });
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h1 className="navbar-title"> KanbanX</h1>
      </nav>
      <select
        value={currentDay}
        onChange={(e) => setCurrentDay(e.target.value)}
      >
        {days.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      <button className="add-day-button" onClick={addNewDay}>
        <FaPlus className="add-icon" /> Add New Day
      </button>

      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button className="add-task-icon" onClick={handleAddTask}>
          <FaPlus /> Add Task
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {["todo", "inProgress", "completed"].map((columnId) => (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided) => (
                <div
                  className="kanban-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3>{columnId.replace(/([A-Z])/g, " $1")}</h3>
                  {tasks[currentDay][columnId].map((task, index) => (
                    <Draggable draggableId={task} index={index} key={task}>
                      {(provided, snapshot) => (
                        <div
                          className={`kanban-task ${
                            snapshot.isDragging ? "dragging" : ""
                          }`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {task}
                          {columnId === "todo" && (
                            <div className="task-actions">
                              <FaEdit
                                className="edit-icon"
                                onClick={() => handleEditTask(index)}
                              />
                              <FaTrashAlt
                                className="delete-icon"
                                onClick={() => handleDeleteTask(task)}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};
export default Dashboard;
