import * as FileSystem from "expo-file-system";

const filename = (path: string) => {
  let _filename = path.split("/").pop();
  if (!_filename) {
    return;
  }
  return _filename;
};

export default async function getMeditationFilePath(
  meditationUri: string
): Promise<string> {
  let base = await FileSystem.documentDirectory;
  if (!base || !meditationUri) {
    return "";
  }

  const path = base + filename(meditationUri) || "";

  return path;
}
