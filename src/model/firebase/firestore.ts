import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  collection,
  CollectionReference,
  DocumentData,
} from 'firebase/firestore';
import { app } from './config';

const db = getFirestore(app);

export const cocktailsCollection = collection(db, 'cocktails');

export const createDocument = async (
  data: any,
  collection: string,
  document: string
) => {
  try {
    return await setDoc(doc(db, collection, document), data);
  } catch (error) {
    throw error;
  }
};

export const getAllDocuments = async (
  collection: CollectionReference<DocumentData>
) => {
  try {
    return await (
      await getDocs(collection)
    ).docs.map((e) => {
      return { ...e.data(), id: e.id };
    });
  } catch (error) {
    throw error;
  }
};

export const updateDocument = async (
  data: any,
  collection: string,
  document: string
) => {
  try {
    return await updateDoc(doc(db, collection, document), data);
  } catch (error) {
    throw error;
  }
};

export const deleteDocument = async (collection: string, document: string) => {
  try {
    return await deleteDoc(doc(db, collection, document));
  } catch (error) {
    throw error;
  }
};