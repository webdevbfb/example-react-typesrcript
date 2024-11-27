const TaskList = ({ tasks }) => {
    return (
      <div className="w-full max-w-md">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks found for this status.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="border p-4 rounded shadow bg-gray-100"
              >
                <h3 className="font-bold">{task.title}</h3>
                <p>{task.description}</p>
                <span className="text-sm text-gray-500">
                  Priority: {task.priority}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  export default TaskList;