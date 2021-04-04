import React, { useEffect, useState, useMemo } from 'react'
import { createEditor, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { useSelector } from 'react-redux'

export default function SlateUpdate({text, id, setEditing}){
   const [currentUserId, channel] = useSelector( state => {
      const currentUserId = state.session.currentUser.id;
      const channel = state.actioncable.messages;
      return [currentUserId, channel]
   })
   function handleSubmit(){
      let messageObject = {
         id: id,
         editing: true,
         body: value[0].children[0].text
      }
      channel.send(messageObject)
      setEditing(false)
   }
   const initialValue = [
      {
         type: 'paragraph',
         italics: true,
         children: [
            { text: text },
         ],
      },
   ]
   const [value, setValue] = useState(initialValue)
   const editor = useMemo(() => withHistory(withReact(createEditor())), [])
   useEffect( () => {
      Transforms.select(editor, {
       anchor: { path: [0, 0], offset: text.length },
       focus: { path: [0, 0], offset: text.length },
     })

   }, [])

   return   <Slate 
               editor={editor} 
               value={value} 
               onChange={value => setValue(value)}
               autoFocus={true} >
                     <Editable autoFocus={true}
                     onKeyDown={ e => {
                        console.log(e.key)
                        if(e.key === "Enter") {
                           e.preventDefault()
                           handleSubmit()
                        } else if( e.key === "Escape" ){
                           e.preventDefault
                           setValue(initialValue)
                           setEditing(false)
                        }
                     }}
                     onBlur={() => {
                        setValue(initialValue)
                        setEditing(false)
                     }}
                     />
            </Slate>
}