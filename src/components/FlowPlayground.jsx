/* eslint-disable react/prop-types */
import { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import MessageNode from "./MessageNode";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditing,
  setNodesList,
  setSelectedNode,
} from "../redux/features/nodeSlice";

const initialNodes = [];

const FlowPlayground = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const nodeTypes = useMemo(() => ({ Message: MessageNode }), []);
  const proOptions = { hideAttribution: true };

  const dispatch = useDispatch();
  const nodesList = useSelector((state) => state.node.nodeList);

  useEffect(() => {
    console.log(nodesList);
    setNodes(nodesList);
  }, [nodesList]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      const label = event.dataTransfer.getData("label");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: `${Date.now()}`,
        type,
        position,
        data: { label },
      };

      //   dispatch(setNodesList(newNode));
      setNodes((nds) => nds.concat(newNode));
      console.log(nodes);
    },
    [reactFlowInstance]
  );

  const handleNodeClick = (e, selectedNode) => {
    console.log(selectedNode);
    dispatch(setSelectedNode(selectedNode));

    dispatch(setEditing(true));
  };

  return (
    <div className="h-full">
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={handleNodeClick}
        proOptions={proOptions}
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowPlayground;
