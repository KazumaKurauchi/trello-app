import { v4 as uuidv4 } from "uuid";

const initialData = [
  {
    id: uuidv4(),
    title: "📝今からやること",
    tasks: []
  },
  {
    id: uuidv4(),
    title: "🚀今後やること",
    tasks: []
  },
  {
    id: uuidv4(),
    title: "🌳終わったこと",
    tasks: []
  }
];

export default initialData;