import { useMemo } from "react";
import { ITag } from "./App";

interface INoteCard {
    title: string;
    tagIds: string[];
    tags: ITag[];
    content: string;
}

function NoteCard({title, tags, contents, tagIds}: INoteCard) {

    const tagsData = useMemo(() => 
        tags.filter(tag => tagIds.includes(tag.id))
    , [tagIds])

  return (
    <div>NoteCard</div>
  )
}

export default NoteCard