import React, { useState } from "react";
import { MindMapNode } from "../types";
import { COLORS } from "../constants";
import { ChevronDown, Circle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileNodeProps {
  node: MindMapNode;
  depth: number;
  isLast: boolean;
}

const MobileNode: React.FC<MobileNodeProps> = ({ node, depth, isLast }) => {
  // Automatically open the root node (depth 0) so the user sees content immediately
  const [isOpen, setIsOpen] = useState(depth === 0);
  const hasChildren = node.children && node.children.length > 0;
  
  // Dynamic styling based on depth
  const color = depth === 0 ? "#1e293b" : COLORS[(depth - 1) % COLORS.length];
  const isRoot = depth === 0;

  const toggleOpen = () => {
    if (hasChildren) setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col w-full relative">
      {/* Node Card */}
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={toggleOpen}
        className={`
          relative flex items-center p-4 my-2 rounded-xl transition-all duration-200
          ${hasChildren ? "cursor-pointer active:scale-[0.98]" : ""}
          ${isRoot 
            ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 mb-6 mx-4" 
            : "bg-white text-slate-800 shadow-sm border border-slate-100 ml-4 mr-4"
          }
        `}
        style={{
           borderLeft: isRoot ? 'none' : `4px solid ${color}`
        }}
      >
        {/* Connector Line (Horizontal) - only for children */}
        {!isRoot && (
           <div className="absolute -left-4 top-1/2 w-4 h-[2px] bg-slate-200" />
        )}

        {/* Content */}
        <div className="flex-1 pr-2">
          <h3 className={`font-medium leading-snug ${isRoot ? "text-lg text-center" : "text-sm"}`}>
            {node.name}
          </h3>
        </div>

        {/* Toggle Icon */}
        {hasChildren && (
          <motion.div 
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`${isRoot ? "text-slate-400" : "text-slate-400"}`}
          >
            <ChevronDown size={20} />
          </motion.div>
        )}
        {!hasChildren && !isRoot && (
            <Circle size={8} className="text-slate-300 fill-slate-300" />
        )}
      </motion.div>

      {/* Children Container */}
      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden flex relative"
          >
            {/* Vertical Tree Line */}
            <div className="absolute left-[34px] top-0 bottom-2 w-[2px] bg-slate-200" />
            
            <div className="flex-1 flex flex-col pb-2 pl-6"> 
              {node.children!.map((child, index) => (
                <MobileNode
                  key={child.id}
                  node={child}
                  depth={depth + 1}
                  isLast={index === node.children!.length - 1}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface MobileMindMapProps {
  data: MindMapNode;
}

const MobileMindMap: React.FC<MobileMindMapProps> = ({ data }) => {
  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar bg-slate-50 pb-32 pt-6 transition-colors duration-300">
       <div className="max-w-md mx-auto relative">
          <div className="px-6 mb-2 flex items-center justify-between">
             <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Modo de Análise</p>
             <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Toque para expandir</span>
          </div>
          <MobileNode node={data} depth={0} isLast={true} />
       </div>
    </div>
  );
};

export default MobileMindMap;