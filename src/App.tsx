import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { Navigate, Route, Routes } from "react-router-dom"
import NewNode from "./NewNode"
import useLocalStroage from './useLocalStroage';
import { useMemo } from "react";
import {v4 as uuidV4} from 'uuid';
import NoteList from "./NoteList";



export interface IRowNote extends IRowNoteData {
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

  const notesWithTags = useMemo(() => {
      return notes.map(note => {
        return {...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
      })
  }, [notes,tags])

  function onCreateNote({tags, ...data}: INodeData) {
    setNotes(prevNotes => {
      return [...prevNotes,
         {...data, id:uuidV4(), tagIds: tags.map(tag => tag.id)}]
    })
  }

  function onAddTag(tag:ITag) {
    setTags(prev => [...prev, tag])
}

  return (

    <Container className="my-4">
      <Routes>
        <Route path="/" element={<NoteList availableTags={tags} notes={notes}/>} />
        <Route path="/new" element={<NewNode onSubmit={onCreateNote} onAddTag={onAddTag} availableTags={tags}/>} />
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

