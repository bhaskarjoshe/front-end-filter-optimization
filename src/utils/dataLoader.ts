import Papa from "papaparse";

interface DataRow {
  number: number;
  mod3: number;
  mod4: number;
  mod5: number;
  mod6: number;
}

export const csvData = async (filePath: string): Promise<DataRow[]> => {
  const response = await fetch(filePath);
  const csvText = await response.text();

  return new Promise((resolve) => {
    Papa.parse<DataRow>(csvText, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        resolve(result.data);
      },
    });
  });
};
