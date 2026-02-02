import Basics from "./components/Basics";
import State from "./components/State";

function App() {

  return (
    <>
      <div className="bg-gray-200">
        <div className="text-yellow-800 text-4xl font-extrabold">
          <h1 className="text-center underline decoration-pink-500">Days 1-10: React Refresher</h1>
        </div>
        <br />
        <Basics />
        <br />
        <State />
      </div>
    </>
  );
}

export default App;
