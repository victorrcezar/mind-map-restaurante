export interface MindMapNode {
  id: string;
  name: string;
  children?: MindMapNode[];
  _collapsed?: boolean; // UI state for collapsing
  color?: string; // Optional custom color
}

export interface TreeContextType {
  data: MindMapNode;
  setData: (data: MindMapNode) => void;
  centerView: () => void;
}
