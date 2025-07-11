import Papa from "papaparse";

export type DynamicRow = Record<string, string|number>


export const csvData = async (filePath: string): Promise<DynamicRow[]> => {
  const response = await fetch(filePath);
  const csvText = await response.text();

  return new Promise((resolve) => {
    Papa.parse<DynamicRow>(csvText, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        resolve(result.data);
      },
    });
  });
};
