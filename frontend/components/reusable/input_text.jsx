import React, { useEffect, useState, useMemo } from 'react'
import { createEditor, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'

export default function InputText({ text="", placeholder, handleSubmit, }){

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

   return   (
         <div className="inputtextSlate">
               <Slate 
               editor={editor} 
               value={value} 
               onChange={value => setValue(value)}
               >
                     <Editable 
                     onKeyDown={ e => {
                        if(e.key === "Enter") {
                           e.preventDefault()
                           handleSubmit(value[0].children[0].text)
                           Transforms.select(editor, {
                              anchor: { path: [0, 0], offset: text.length },
                              focus: { path: [0, 0], offset: text.length },
                           })
                           setValue(initialValue)
                        } else if( e.key === "Escape" ){
                           e.preventDefault
                           Transforms.select(editor, {
                              anchor: { path: [0, 0], offset: text.length },
                              focus: { path: [0, 0], offset: text.length },
                           })
                           setValue(initialValue)
                        }
                     }}
                     placeholder={placeholder}
                     onBlur={() => {
                        setValue(initialValue)
                     }}
                     />
            </Slate>
         </div>
            )
}