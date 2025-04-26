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
}

const Firestore = new CloudFirestore();
export {Firestore};
