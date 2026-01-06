import React, { useEffect, useRef, useState } from "react";
import { MindMapNode } from "../types";
import { COLORS } from "../constants";
import { ChevronRight, ChevronDown, Circle, ListTree } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MindMapCanvasProps {
  data: MindMapNode;
  shouldCenter: boolean;
  setShouldCenter: (val: boolean) => void;
}

// Recursive Tree Node Component for Desktop
const TreeNode: React.FC<{ node: MindMapNode; depth: number; isLast: boolean }> = ({ 
  node, 
  depth, 
  isLast 
}) => {
  const [isOpen, setIsOpen] = useState(depth === 0); // Root starts open
  const hasChildren = node.children && node.children.length > 0;
  const isRoot = depth === 0;

  // Modern Color Palette Logic
  const colorIndex = depth === 0 ? 0 : (depth - 1) % COLORS.length;
  const themeColor = isRoot ? "#1e293b" : COLORS[colorIndex];
  
  const toggle = () => {
    if (hasChildren) setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex flex-col w-full">
      {/* Connector Lines for non-root nodes */}
      {!isRoot && (
        <div 
          className="absolute -left-6 top-8 w-6 h-[2px] rounded-l-full"
          style={{ backgroundColor: themeColor, opacity: 0.3 }}
        />
      )}
      {!isRoot && !isLast && (
        <div 
          className="absolute -left-6 top-8 bottom-0 w-[2px]"
          style={{ backgroundColor: themeColor, opacity: 0.3 }}
        />
      )}

      {/* Node Card */}
      <motion.div
        layout
        onClick={toggle}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className={`
          group relative flex items-center p-4 my-2 mr-4 rounded-xl border transition-all duration-200
          ${hasChildren ? "cursor-pointer hover:shadow-md hover:-translate-y-0.5" : "cursor-default"}
          ${isRoot 
            ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20 mb-8 mx-auto w-full max-w-2xl border-slate-800" 
            : "bg-white/80 backdrop-blur-sm hover:bg-white text-slate-700 shadow-sm border-slate-100"
          }
        `}
        style={{
          borderLeftWidth: isRoot ? '1px' : '4px',
          borderLeftColor: themeColor
        }}
      >
        {/* Icon / Bullet */}
        <div className="mr-4 shrink-0">
          {hasChildren ? (
            <div 
              className={`p-1.5 rounded-full transition-colors ${isRoot ? "bg-white/10 group-hover:bg-white/20" : "bg-slate-50 group-hover:bg-indigo-50"}`}
            >
              {isOpen ? (
                 <ChevronDown size={isRoot ? 20 : 16} className={isRoot ? "text-white" : "text-slate-500"} />
              ) : (
                 <ChevronRight size={isRoot ? 20 : 16} className={isRoot ? "text-white" : "text-slate-500"} />
              )}
            </div>
          ) : (
            <Circle size={10} className={`${isRoot ? "text-white/50" : "text-slate-300"}`} fill="currentColor" />
          )}
        </div>

        {/* Text Content */}
        <div className="flex-1">
          <h3 className={`font-medium leading-relaxed tracking-tight ${isRoot ? "text-xl text-center" : "text-base"}`}>
            {node.name}
          </h3>
        </div>
      </motion.div>

      {/* Children Container (Recursive) */}
      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col pl-12 relative"
          >
             {/* Vertical Line for children indentation */}
             <div 
                className="absolute left-6 top-0 bottom-4 w-[2px] rounded-full"
                style={{ backgroundColor: themeColor, opacity: 0.15 }}
             />

            {node.children!.map((child, index) => (
              <TreeNode
                key={child.id || index}
                node={child}
                depth={depth + 1}
                isLast={index === node.children!.length - 1}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MindMapCanvas: React.FC<MindMapCanvasProps> = ({
  data,
  shouldCenter,
  setShouldCenter,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to top when "Center" is clicked
  useEffect(() => {
    if (shouldCenter && containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      setShouldCenter(false);
    }
  }, [shouldCenter, setShouldCenter]);

  return (
    <div className="w-full h-full bg-slate-50/50 relative overflow-hidden flex flex-col items-center">
       {/* Modern Background */}
       <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-[100px] mix-blend-multiply" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-[100px] mix-blend-multiply" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
       </div>

       {/* Scrollable Content Area */}
       <div 
          ref={containerRef}
          className="w-full h-full overflow-y-auto z-10 px-4 py-12 md:px-12 md:py-20 scroll-smooth custom-scrollbar"
       >
          <div className="max-w-4xl mx-auto pb-32">
             <div className="flex items-center justify-center gap-2 mb-8 opacity-50">
                <ListTree size={16} />
                <span className="text-xs font-semibold uppercase tracking-widest">Visualização em Lista</span>
             </div>
             
             <TreeNode node={data} depth={0} isLast={true} />
          </div>
       </div>

       {/* Custom Scrollbar Styles injection */}
       <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: rgba(148, 163, 184, 0.3);
            border-radius: 20px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: rgba(148, 163, 184, 0.5);
          }
       `}</style>
    </div>
  );
};

export default MindMapCanvas;