import { useCallback, useState } from "react";
import "./App.css";
import FlowPlayground from "./components/FlowPlayground";
import SideBar from "./components/SideBar";
import { useDispatch } from "react-redux";
import { setEditing } from "./redux/features/nodeSlice";
import { ReactFlowProvider, useReactFlow } from "reactflow";

function App() {
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const reactFlowInsatnce = useReactFlow();

  const handleSaveClick = useCallback(() => {
    dispatch(setEditing(false));
    const nodes = reactFlowInsatnce.getNodes();
    const edges = reactFlowInsatnce.getEdges();
    const hasEmptyHandles = nodes.some((node) => {
      const sourceHandles = edges.filter((edge) => edge.source === node.id);
      const targetHandles = edges.filter((edge) => edge.target === node.id);
      return sourceHandles.length === 0 && targetHandles.length === 0;
    });

    console.log(hasEmptyHandles);

    if (hasEmptyHandles) {
      setError(true);
      return;
    } else {
      setError(false);
    }

    localStorage.setItem(
      "workflow",
      JSON.stringify(JSON.stringify(reactFlowInsatnce.toObject()))
    );
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <header className="px-4 py-3 bg-gray-200 flex items-center justify-end border-orange-500 border-t-2 gap-4">
        {error && (
          <p className=" bg-red-300 py-2 px-4 rounded-md font-bold items-center">
            Cannot Save Flow
          </p>
        )}

        <button
          className="text-blue-500 border-gray-400 bg-white border-2  rounded-md px-4 py-1 font-bold hover:border-blue-400 hover:border-2"
          onClick={handleSaveClick}
        >
          Save Changes
        </button>
      </header>
      <main className="w-full h-full flex">
        <div className="w-3/4 h-full  border-gray-400 border-r-2">
          <FlowPlayground />
        </div>
        <div className="w-1/4 py-4">
          <SideBar />
        </div>
      </main>
    </div>
  );
}

export default App;
