import Basics from "./components/Basics";
import State from "./components/State";
import ListRendering from "./components/ListRendering";
import Effect from "./components/Effect";
import Fetch from "./components/Fetch";
import CustomHooks from "./components/CustomHook/CustomHooks";
import FormHandling from "./components/FormHandling";

function App() {

  return (
    <>
      <div className="bg-gray-200">
        <div className="text-yellow-800 text-4xl font-extrabold">
          <h1 className="text-center underline decoration-pink-500">Days 1-10: React Refresher</h1>
        </div>
        <br />
        {/* <Basics />
        <br />
        <State />
        <br />
        <ListRendering />
        <br />
        <Effect />
        <br /> */}
        {/* <Fetch /> */}
        <FormHandling />
      </div>
    </>
  );
}

export default App;
