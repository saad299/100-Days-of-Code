// import TaskCard from "./TaskCard";

// const TaskList = ({ tasks }) => {
//   return (
//     <>
//       {tasks.map((task) => (
//         <TaskCard key={task._id} task={task} />
//       ))}
//     </>
//   );
// };

// export default TaskList;

import TaskCard from "./TaskCard";

const TaskList = ({ tasks }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-xl">
        <p className="text-4xl mb-3">📋</p>
        <p className="text-lg font-medium text-gray-700">No tasks yet</p>
        <p className="text-sm mt-1 text-muted-foreground">Create your first task to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;