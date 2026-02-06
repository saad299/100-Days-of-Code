import { useEffect, useState } from "react";

const Fetch = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/users/")
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error("Failed to fetch the data");
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setDatas(data);
    //     setLoading(false);
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     setError(error.message);
    //     setLoading(false);
    //   });

    // fetch with async/await + try/catch
    async function fetchData() {
      try {
        const respone = await fetch("https://jsonplaceholder.typicode.com/users/");
        if (!respone.ok) throw new Error("Failed to fetch the data");
        const data = await respone.json();
        setDatas(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p className="text-3xl text-center font-extrabold">Loading.....</p>;
  if (error) return <p className="text-3xl text-red-500 text-center font-extrabold">Error: {error}</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-center">
        Day 5: Fetch API in React
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

export default Fetch;
