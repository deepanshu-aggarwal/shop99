import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore"
import { firestore } from "../firebase.config"

// Saving the items to firebase
export const saveItem = async(data) => {
    await setDoc(
        doc(firestore, 'foodItems', `${Date.now()}`), 
        data, 
        {merge: true}
    )
}

// fetch the items data from firebase
export const getAllItems = async () => {
    const items = await getDocs(
      query(collection(firestore, "foodItems"), orderBy("id", "desc"))
    );
    return items.docs.map((doc) => doc.data());
  };