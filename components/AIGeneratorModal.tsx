import React, { useState, useRef } from "react";
import { X, Sparkles, Upload, FileText, Loader2 } from "lucide-react";

interface AIGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateText: (prompt: string) => Promise<void>;
  onGenerateImage: (file: File) => Promise<void>;
  isGenerating: boolean;
}

const AIGeneratorModal: React.FC<AIGeneratorModalProps> = ({
  isOpen,
  onClose,
  onGenerateText,
  onGenerateImage,
  isGenerating,
}) => {
  const [mode, setMode] = useState<"text" | "image">("text");
  const [prompt, setPrompt] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onGenerateText(prompt);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onGenerateImage(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-2 text-indigo-700">
            <Sparkles size={20} className="fill-indigo-100" />
            <h2 className="font-semibold text-lg">AI Assistant</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
            disabled={isGenerating}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setMode("text")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                mode === "text"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <FileText size={16} />
                Generate from Topic
              </div>
            </button>
            <button
              onClick={() => setMode("image")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                mode === "image"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Upload size={16} />
                Import from Image
              </div>
            </button>
          </div>

          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4 text-slate-500">
              <Loader2 size={40} className="animate-spin text-indigo-500" />
              <p className="text-center">
                {mode === "image" 
                  ? "Analyzing image structure...\nThis may take a moment."
                  : "Brainstorming and structuring..."}
              </p>
            </div>
          ) : (
            <>
              {mode === "text" ? (
                <form onSubmit={handleTextSubmit}>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    What should the mind map be about?
                  </label>
                  <textarea
                    className="w-full border border-slate-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none outline-none transition-all"
                    placeholder="E.g., A marketing strategy for a pizza restaurant, or A study plan for Biology..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <button
                    type="submit"
                    disabled={!prompt.trim()}
                    className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    Generate Map
                  </button>
                </form>
              ) : (
                <div className="text-center">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 rounded-xl p-8 hover:bg-slate-50 hover:border-indigo-400 transition-all cursor-pointer group"
                  >
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Upload size={32} className="text-slate-400 group-hover:text-indigo-500" />
                    </div>
                    <p className="text-slate-700 font-medium mb-1">
                      Click to upload an image
                    </p>
                    <p className="text-slate-500 text-sm">
                      Upload a photo of a whiteboard, a sketch, or an existing mind map chart.
                    </p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-4">
                    The AI will try to reconstruct the hierarchy from the visual layout.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIGeneratorModal;
