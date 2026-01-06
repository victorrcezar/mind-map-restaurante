import React from "react";
import { ArrowUpToLine, Undo2, Redo2 } from "lucide-react";

interface ToolbarProps {
  onCenter: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ 
  onCenter, 
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false
}) => {
  return (
    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
      <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-xl shadow-lg border border-white/50 ring-1 ring-slate-200/50 flex flex-col gap-1">
        
        {/* Undo / Redo Group */}
        <div className="flex items-center justify-between gap-1">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`flex-1 flex items-center justify-center px-2 py-2 rounded-lg transition-all active:scale-95 ${
              canUndo 
                ? "hover:bg-slate-100 text-slate-700" 
                : "text-slate-300 cursor-not-allowed"
            }`}
            title="Undo"
          >
            <Undo2 size={18} />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`flex-1 flex items-center justify-center px-2 py-2 rounded-lg transition-all active:scale-95 ${
              canRedo
                ? "hover:bg-slate-100 text-slate-700" 
                : "text-slate-300 cursor-not-allowed"
            }`}
            title="Redo"
          >
            <Redo2 size={18} />
          </button>
        </div>

        <div className="h-[1px] bg-slate-200 mx-2 my-1" />

        <button
          onClick={onCenter}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-all active:scale-95"
          title="Scroll to Top"
        >
          <ArrowUpToLine size={18} />
          <span className="text-sm font-medium">Voltar ao Topo</span>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;