import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

class CloudFirestore {
  collections(
    collectionName: string,
  ): Promise<FirebaseFirestoreTypes.CollectionReference> {
    return new Promise((resolve, reject) => {
      try {
        const firestores = firestore().collection(collectionName);
        resolve(firestores);
      } catch (e) {
        reject(e);
      }
    });
  }
  getDocument(
    collectionName: string,
    docId: string,
  ): Promise<FirebaseFirestoreTypes.DocumentData | null> {
    return new Promise((resolve, reject) => {
      try {
        const docRef = firestore().collection(collectionName).doc(docId);
        docRef
          .get()
          .then(docSnap => {
            const data = docSnap.data();
            resolve(data ?? null); // explicitly handle undefined
          })
          .catch(err => reject(err));
      } catch (e) {
        reject(e);
      }
    });
  }
}

const Firestore = new CloudFirestore();
export {Firestore};
