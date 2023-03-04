
import { INodeData, ITag } from './App';
import NodeForm from './NodeForm';

interface INewNode {
  onSubmit : (data : INodeData) => void;
  onAddTag : (tag : ITag) => void;
  availableTags : ITag[];
}

function NewNode({onSubmit, onAddTag,availableTags}: INewNode) {
  return (
    <>
    <h1 className="mb-4">New Note</h1>
    <NodeForm  onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}  />
    </>
  )
}

export default NewNode