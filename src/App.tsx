import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { Navigate, Route, Routes } from "react-router-dom"
import NewNode from "./NewNode"
import useLocalStroage from './useLocalStroage';

export interface Note extends INodeData {
  id: string;
}

interface IRowNote {
  id:string
}

export interface INodeData {
  title: string;
  markdown: string;
  tags: ITag[]
}

export interface IRowNoteData {
  title: string;
  markdown: string;
  tagIds: string[];
}

export interface ITag {
  id: string;
  label: string;
}

function App()  {

  const [notes, setNotes] = useLocalStroage<IRowNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStroage<ITag[]>("TAGS", [])

  return (

    <Container className="my-4">
  <Routes>
    <Route path="/" element={<h1>Home</h1>} />
    <Route path="/new" element={<NewNode/>} />
    <Route path="/:id">
      <Route index element={<h1>Show</h1>} />
      <Route path="edit"  element={<h1>Edit</h1>} />
    </Route>
    <Route path="*" element={<Navigate to="/"/>} />
  </Routes>
    </Container>
  )
    
   
}

export default App
