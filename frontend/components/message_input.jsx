import React, { useRef, useEffect, useMemo, useState  } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { createEditor, Editor  } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import ImageUpload from "./image_upload"
import { createMessage} from "../actions/message_actions"
export default function MessageInput(props) {
   const dispatch = useDispatch()
   const {id} = useParams()
   const channelId = useSelector(state => {
      let channelId = state.session.channelId
      if(id === "@me") {
         return state.entities.users[channelId].friendshipId
      }
      return channelId
   })
   const editor = useMemo(() => withReact(createEditor()), [])
   const [image, setImage] = useState({imageUrl: null, imageFile: null})
   const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ])
   const userId = useSelector( state => state.session.currentUser.id)
   const imageUpload = useRef(null)
   const type = id === "@me" ? "Friend" : "Channel"

   const friendIds = useSelector( state => state.entities.friends )
   if( id === "@me" && friendIds.length === 0 ) return null
   function handleSubmit(){
      if(image.imageUrl){
         const message = new FormData()
         message.append( 'message[author_id]', userId )
         message.append( 'message[imageable_id]', channelId ) 
         message.append( 'message[body]', "")
         message.append( 'message[photo]', image.imageFile )
         message.append( 'message[imageable_type]', type)
         createMessage(channelId, message)(dispatch)
         setImage({imageUrl: null, imageFile: null})
      } else {
         let messageObject = {
            userId: userId,
            imageable_id: channelId,
            imageable_type: type,
            body: value[0].children[0].text
         }
         editor.deleteBackward("block")
         props.messageChannel.send(messageObject)
      }
      
   }
   function handleUpload(e) {
      const reader = new FileReader();
      const file = e.currentTarget.files[0];
      reader.onloadend = () => {
         setImage({ imageUrl: reader.result, imageFile: file });

      }

      if (file) {
         reader.readAsDataURL(file);
      } else {
         this.setState({ imageUrl: "", imageFile: null });
      }
   }

   return channelId ? <div className="input">
      <div className="span-container">
      <div className="circle" onClick={() => {imageUpload.current.click()}}>
         +
      </div>
      <span className="mifc" >

            <Slate
            editor={editor}
            value={value}
            onChange={value => setValue(value)}
         >
         <Editable 
         onKeyDown={ e => {
            if(e.key === "Enter") {
               e.preventDefault()
               handleSubmit()

            }
         }}
         />
         </Slate>
            <input type="file"
                     style={ {display: 'none'} }
                     ref={imageUpload}
                     onChange={e => handleUpload(e)}
                  />

      </span>
      </div>{
         image.imageUrl ? 
         <ImageUpload image={image } setImage={setImage} handleSubmit={handleSubmit} />
         : null
      }
   </div> : <div className="input"></div>
}
