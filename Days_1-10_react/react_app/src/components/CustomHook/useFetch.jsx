import { useEffect, useState } from "react";

const useFetch = () => {
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
        const respone = await fetch(
          "https://jsonplaceholder.typicode.com/users/",
        );
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

    fetchData()
  }, []);

  return (
    /* 
       Note: if it is returning as an object then import
       in other component as an object too
    */
    { datas, loading, error }
  );
};

export default useFetch;
