import { useCallback, useState } from "react";
import "./App.css";
import FlowPlayground from "./components/FlowPlayground";
import SideBar from "./components/SideBar";
import { useDispatch } from "react-redux";
import { setEditing } from "./redux/features/nodeSlice";
import { useReactFlow } from "reactflow";
import { Alert, Snackbar } from "@mui/material";

function App() {
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const reactFlowInsatnce = useReactFlow();

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  //save the workflow
  const handleSaveClick = useCallback(() => {
    dispatch(setEditing(false));
    const nodes = reactFlowInsatnce.getNodes();
    const edges = reactFlowInsatnce.getEdges();

    //check if there are any nodes with no source handles
    const hasEmptyHandles = nodes.some((node) => {
      const sourceHandles = edges.filter((edge) => edge.source === node.id);
      const targetHandles = edges.filter((edge) => edge.target === node.id);
      return sourceHandles.length === 0 && targetHandles.length === 0;
    });

    if (hasEmptyHandles) {
      setError(true);
      setOpen(true);
      return;
    } else {
      setError(false);
      setOpen(true);
    }

    localStorage.setItem(
      "workflow",
      JSON.stringify(reactFlowInsatnce.toObject())
    );
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <header className="px-4 py-3 bg-gray-200 flex items-center justify-end border-orange-500 border-t-2 gap-4">
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity={error ? "error" : "success"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {error ? "Cannot save the flow !" : "Workflow saved successfully !"}
          </Alert>
        </Snackbar>

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
