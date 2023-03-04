import { useRef, useState } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import CreatableReactSelect from "react-select/creatable"
import { INodeData, ITag } from "./App"

interface INodeFormProps {
    onSumit : (data:INodeData) => void;
}

function NodeForm({onSumit}:INodeFormProps) {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<ITag[]>([])

    function handleSubmit(e) {
        e.preventDefault()

        const title = titleRef.current!.value
        const markdown = markdownRef.current!.value
        
        onSumit({title, markdown, tags:[]})
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
                        onChange={tags  => {
                            setSelectedTags(tags.map(tag => {
                                return {label: tag.label, id: tag.value}
                            }))
                        }}
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