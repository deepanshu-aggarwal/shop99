import React from 'react'
// import { firestore } from '../firebase.config'
// import { useCollectionData } from 'react-firebase-hooks/firestore';
import 'firebase/firestore';

const Chatbot = () => {
  
  // const messageRef = firestore.collection('messages')
  // const query = messageRef.orderBy('createdAt').limit(25)
  // const [message] = useCollectionData(query, {idField: 'id'})
  return (
    <div className='fixed bottom-[1.5rem] right-[2.5rem]' >
      <div>
        {/* {message && message.map(msg => <div key={msg.id}>{msg.message}</div>)} */}
      </div>
    </div>
  )
}

export default Chatbot