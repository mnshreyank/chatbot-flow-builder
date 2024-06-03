/* eslint-disable react/prop-types */
import { Handle, Position } from "reactflow";
import { FaWhatsapp } from "react-icons/fa";

export default function MessageNode({ data }) {
  return (
    <div className="rounded-md shadow-lg border-gray-500 text-xl z-20">
      <Handle type="target" position={Position.Left} />
      <div className="">
        <div className="bg-green-200 flex items-center gap-2 py-2 px-6 rounded-md font-semibold">
          Send Message{" "}
          <FaWhatsapp color="green" className="bg-white rounded-lg" />
        </div>
        <p className="p-2 text-center min-h-8">{data?.label}</p>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
