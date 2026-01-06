import { GoogleGenAI, Type } from "@google/genai";
import { MindMapNode } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are an expert at structuring information into hierarchical mind maps. 
Your goal is to output a clean, nested JSON structure representing a mind map.
The root node should be the central topic.
Keep node names concise (under 8 words if possible).
`;

export const generateMindMapFromText = async (prompt: string): Promise<MindMapNode> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Create a comprehensive mind map about: ${prompt}`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          name: { type: Type.STRING },
          children: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                children: {
                  type: Type.ARRAY,
                  items: { 
                     type: Type.OBJECT,
                     properties: {
                        id: { type: Type.STRING },
                        name: { type: Type.STRING },
                        children: { type: Type.ARRAY, items: { type: Type.OBJECT, nullable: true } } 
                     }
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!response.text) throw new Error("No response from AI");
  return JSON.parse(response.text) as MindMapNode;
};

export const generateMindMapFromImage = async (
  base64Image: string,
  mimeType: string
): Promise<MindMapNode> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType,
          },
        },
        {
          text: "Analyze this image of a mind map. Reconstruct its hierarchy exactly into a JSON structure. If the text is in Portuguese, keep it in Portuguese. The structure must start with the central main topic as the root.",
        },
      ],
    },
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
         type: Type.OBJECT,
         properties: {
           id: { type: Type.STRING },
           name: { type: Type.STRING },
           children: {
             type: Type.ARRAY,
             items: {
               type: Type.OBJECT,
               properties: {
                 id: { type: Type.STRING },
                 name: { type: Type.STRING },
                 children: {
                   type: Type.ARRAY,
                   items: { 
                      type: Type.OBJECT,
                      properties: {
                         id: { type: Type.STRING },
                         name: { type: Type.STRING },
                         children: { type: Type.ARRAY, items: { type: Type.OBJECT, nullable: true } } 
                      }
                   },
                 },
               },
             },
           },
         },
       },
    },
  });

  if (!response.text) throw new Error("No response from AI");
  return JSON.parse(response.text) as MindMapNode;
};
