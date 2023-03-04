import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import ReactSelect from "react-select"
import { ITag, IRowNote, INodeData } from "./App"
import { useMemo, useState } from "react"
import NoteCard from './NoteCard';

interface INodeList {
    availableTags : ITag[]
    notes : IRowNote[]
}

function NoteList({availableTags, notes}:INodeList) {

    const [selectedTags, setSelectedTags] = useState<ITag[]>([])
    const [title, setTitle] = useState("")

    const filterNotes = useMemo(() => {
        return notes.filter(note => {
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase()))
            && (selectedTags.length === 0 || selectedTags.every(tag => note.tagIds.some(noteTagId => noteTagId === tag.id)))
        })
    } , [selectedTags, title])

  return (
   <>
   <Row className="align-align-items-center mb-4">
          <Col><h1>Notes</h1></Col>
          <Col xs="auto">
              <Stack gap={2} direction="horizontal">
                  <Link to="/new">
                      <Button variant="primary">Create</Button>
                  </Link>
                  <Button variant="outline-secondary">Edit Tags</Button>
              </Stack>
          </Col>

      </Row>
      <Form>
        <Row className="mb-4">
            <Col>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" 
                    onChange={e => setTitle(e.target.value)}
                    />
                </Form.Group>
            </Col>
            <Col>
                    <Form.Group controlId="tags" >
                        <Form.Label>tags</Form.Label>
                        <ReactSelect 
                        
                        value={selectedTags.map(tag => {
                            return {label: tag.label, value: tag.id}
                        })} 
                        
                        onChange={tags  => {
                            setSelectedTags(tags.map(tag => {
                                return {label: tag.label, id: tag.value}
                            }))
                        }}
                        options={availableTags.map(tag => { return {label: tag.label, value: tag.id} })}
                        isMulti
                        />
                        </Form.Group>  
                </Col>
        </Row>
        <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
            {filterNotes.map(note => (
                <Col key={note.title}>
                    <NoteCard id={note.id} title={note.title} tags={availableTags} tagIds={note.tagIds}  />
                </Col>
            ))}
        </Row>
      </Form>
      </>
  )
}

export default NoteList