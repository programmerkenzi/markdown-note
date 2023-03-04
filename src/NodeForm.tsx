import { FormEvent, useRef, useState } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import CreatableReactSelect from "react-select/creatable"
import { INodeData, ITag } from "./App"
import {v4 as uuidV4} from 'uuid';

interface INodeForm{
    onSubmit : (data:INodeData) => void;
    onAddTag : (tag:ITag) => void;
    availableTags: ITag[]
}

function NodeForm({onSubmit, onAddTag,availableTags}:INodeForm) {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<ITag[]>([])

    function handleSubmit(e : FormEvent) {
        e.preventDefault()

        const title = titleRef.current!.value
        const markdown = markdownRef.current!.value
        
        onSubmit({title, markdown, tags:selectedTags})
    }
    
  

  return (
    <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
            <Row>
                <Col>
                    <Form.Group controlId="title" >
                        <Form.Label>Title</Form.Label>
                        <Form.Control ref={titleRef} required type="text" placeholder="Title" />
                        </Form.Group>  
                </Col>
                <Col>
                    <Form.Group controlId="tags" >
                        <Form.Label>tags</Form.Label>
                        <CreatableReactSelect value={selectedTags.map(tag => {
                            return {label: tag.label, value: tag.id}
                        })} 
                        onCreateOption={
                            label => {
                                const newTag = {id: uuidV4(), label}
                                onAddTag(newTag)
                                setSelectedTags( prev => [...prev, newTag])
                            }
                        }
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
                    <Form.Group controlId="markdown" >
                        <Form.Label>Body</Form.Label>
                        <Form.Control required as="textarea" ref={markdownRef} rows={15} />
                    </Form.Group>  
            <Stack direction="horizontal"  gap={2} className="justify-content-end">
                    <Button type="submit" variant="primary">Save</Button>
                    <Link to="..">
                    <Button type="button" variant="outline-secondary">Cancel</Button>
                    </Link>
            </Stack>
        </Stack>
    </Form>
  )
}

export default NodeForm