import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import "./Calendar.css";

Modal.setAppElement("#root");

const Calendar = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentYear, setCurrentYear] = useState(2025);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [newTask, setNewTask] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [todayTasks, setTodayTasks] = useState([]);

  const categories = ["Work", "Personal", "Urgent", "Other"];

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const fetchedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(fetchedTasks);

      const today = new Date().toISOString().split("T")[0];
      const tasksForToday = fetchedTasks.filter((task) => task.date === today);
      setTodayTasks(tasksForToday);
    });

    return () => unsubscribe();
  }, []);

  const openAddModal = (date) => {
    setSelectedDate(date);
    setModalIsOpen(true);
    setNewTask("");
    setNewCategory("");
    setEditingTask(null);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setModalIsOpen(true);
    setNewTask(task.text);
    setNewCategory(task.category);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNewTask("");
    setNewCategory("");
    setEditingTask(null);
  };

  const handleAddTask = async () => {
    if (newTask && categories.includes(newCategory)) {
      try {
        await addDoc(collection(db, "tasks"), {
          date: selectedDate,
          text: newTask,
          category: newCategory,
        });
        closeModal();
      } catch (error) {
        alert("Error adding task: " + error.message);
      }
    } else {
      alert("Please provide a valid task and category.");
    }
  };

  const handleEditTask = async () => {
    if (editingTask) {
      try {
        const taskRef = doc(db, "tasks", editingTask.id);
        await updateDoc(taskRef, {
          text: newTask,
          category: newCategory,
        });
        closeModal();
        alert("Task updated successfully!");
      } catch (error) {
        alert("Error updating task: " + error.message);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      alert("Task deleted successfully!");
    } catch (error) {
      alert("Error deleting task: " + error.message);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Work: "#4caf50",
      Personal: "#2196f3",
      Urgent: "#f44336",
      Other: "#ff9800",
    };
    return colors[category] || "#e0e0e0";
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  return (
    <div className="calendar-container">
      <h1 className="calendar-title">Kalendarz</h1>

      <div className="today-tasks">
        <h2>Tasks for Today</h2>
        {todayTasks.length > 0 ? (
          <ul>
            {todayTasks.map((task) => (
              <li
                key={task.id}
                style={{
                  backgroundColor: getCategoryColor(task.category),
                  padding: "10px",
                  margin: "5px 0",
                  borderRadius: "5px",
                }}
              >
                {task.text} ({task.category})
                <button
                  className="edit-button"
                  onClick={() => openEditModal(task)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks for today.</p>
        )}
      </div>

      <div className="calendar-grid">
        {Array.from({ length: getDaysInMonth(currentYear, currentMonth) }, (_, i) => {
          const date = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
          const filteredTasks = tasks.filter((task) => task.date === date);

          return (
            <div key={date} className="calendar-day">
              <div>{date}</div>
              <button onClick={() => openAddModal(date)}>Add Task</button>
              <ul>
                {filteredTasks.map((task) => (
                  <li
                    key={task.id}
                    style={{
                      backgroundColor: getCategoryColor(task.category),
                      padding: "5px",
                      borderRadius: "5px",
                      margin: "2px 0",
                    }}
                  >
                    {task.text} ({task.category})
                    <button
                      className="edit-button"
                      onClick={() => openEditModal(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>{editingTask ? "Edit Task" : `Add Task for ${selectedDate}`}</h2>
        <input
          type="text"
          placeholder="Task description"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button onClick={editingTask ? handleEditTask : handleAddTask}>
          {editingTask ? "Save Changes" : "Add Task"}
        </button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>
    </div>
  );
};

export default Calendar;
