import useFetch from "./useFetch";

const CustomHooks = () => {
  const { datas, loading, error } = useFetch();

  if (loading)
    return <p className="text-3xl text-center font-extrabold">Loading.....</p>;
  if (error)
    return (
      <p className="text-3xl text-red-500 text-center font-extrabold">
        Error: {error}
      </p>
    );

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-center">
        Day 7: Custom Hooks
      </h2>
      <div className="bg-gray-400 text-center rounded-3xl">
        {/* {datas.map((d) => (
          <p key={d.id} name={d.name} username={d.username} email={d.email}>
            name={d.name} username={d.username} email={d.email}
          </p>
        ))} */}
        {datas.map((d) => (
          <ul key={d.id}>
            <li>Name: {d.name}</li>
            <li>Username: {d.username}</li>
            <li>Email: {d.email}</li>
            <br />
          </ul>
        ))}
      </div>
    </div>
  );
};

export default CustomHooks;
