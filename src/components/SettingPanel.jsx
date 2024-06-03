/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useReactFlow } from "reactflow";
import { setEditing } from "../redux/features/nodeSlice";

const SettingPanel = () => {
  const selectedNode = useSelector((state) => state.node.selectedNode);
  const [val, setVal] = useState(selectedNode?.data?.label);
  const dispatch = useDispatch();

  const { setNodes } = useReactFlow();

  const handleChange = (e) => {
    const newLabel = e.target.value;
    setVal(newLabel);
    setNodes((prev) =>
      prev.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, label: newLabel } }
          : node
      )
    );
  };

  console.log(selectedNode);
  return (
    <div
      className="w-full flex flex-col gap-4 "
      onMouseLeave={() => dispatch(setEditing(false))}
    >
      <h3 className="border-gray-400 border-b-2 text-center py-2 font-semibold flex items-center gap-4 px-4">
        <FaArrowLeft />
        <span className="text-center">{selectedNode?.type}</span>
      </h3>
      <div className="flex flex-col gap-2 border-gray-400 border-b-2 pb-8 px-4">
        <p>Text</p>
        <textarea
          className="border-gray-600 border-2 rounded-md p-2"
          onChange={handleChange}
          value={val}
        />
      </div>
    </div>
  );
};

export default SettingPanel;
