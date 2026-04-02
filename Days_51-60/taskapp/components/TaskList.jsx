import TaskCard from "./TaskCard";

const TaskList = ({ tasks }) => {
  return (
    <>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </>
  );
};

export default TaskList;
