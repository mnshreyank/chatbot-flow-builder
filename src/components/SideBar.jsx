/* eslint-disable react/prop-types */
import { BiMessageRoundedDetail } from "react-icons/bi";
import SettingPanel from "./SettingPanel";
import { useSelector } from "react-redux";

//Add more custom nodes to this list
const nodeList = [
  {
    id: 1,
    type: "Message",
    icon: BiMessageRoundedDetail,
    name: "Message",
    label: "textNode",
    draggable: true,
  },
];

const SideBar = () => {
  //Drag the node and store the data
  const handleDragStart = (e, node) => {
    e.dataTransfer.setData("application/reactflow", node.type);
    e.dataTransfer.setData("label", node.label);
    e.dataTransfer.effectAllowed = "move";
  };

  const isEditing = useSelector((state) => state.node.isEditing);

  return (
    <div>
      {!isEditing && (
        <div className="flex flex-col gap-4 px-4">
          {nodeList.map((node) => {
            const Icon = node.icon;
            return (
              <div
                key={node.id}
                draggable={node.draggable}
                className="flex flex-col items-center gap-1 w-fit border-blue-500 border-2 px-8 py-2 cursor-pointer text-blue-500 rounded-md hover:scale-110 transform transition-transform ease-linear duration-200 bg-white"
                onDragStart={(e) => handleDragStart(e, node)}
              >
                <Icon fontSize={24} />
                <p className="font-semibold">{node.name}</p>
              </div>
            );
          })}
        </div>
      )}

      {isEditing && <SettingPanel />}
    </div>
  );
};

export default SideBar;
