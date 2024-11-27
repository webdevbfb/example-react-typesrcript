import { useState, useEffect } from "react";
import TaskList from "./TaskList.jsx";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Pending");
  // Görevleri backend'den al
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/app/tasks"); // Backend API'si
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);
  // Seçilen duruma göre görevleri filtrele
  const filteredTasks = tasks.filter((task) => task.status === selectedStatus);
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Task Board</h1>
      <div className="flex gap-4 mb-4">
        {["Pending", "In Progress", "Completed"].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded ${
              selectedStatus === status
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black"
            }`}>
            {status}
          </button>
        ))}
      </div>
      <TaskList tasks={filteredTasks} />
    </div>
  );
};
export default TaskBoard;
