import firebase from "../config/firebase";
import { setUserProfileData } from "./firestoreService";

export function firebaseObjectToArray(snapshot){
  if(snapshot){
    return Object.entries(snapshot).map(e=>Object.assign({},e[1],{id:e[0]}));
  }

}
export function signInWithEmail(creds) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(creds.email, creds.password);
}

export function signOutFirebase() {
  return firebase.auth().signOut();
}

export async function registerInFirebase(creds) {
  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password);
      await result.user.updateProfile({
          displayName:creds.displayName,
      });
      return await setUserProfileData(result.user);
  } catch (error) {
    throw error;
  }
}

export function updateUserPassword(creds){
  //this is a sync action, no need to await
  const user = firebase.auth().currentUser;
  return user.updatePassword(creds.newPassword1);

}

export function uploadToFireBaseStorage(file, filename){
  const user = firebase.auth().currentUser;
  const storageRef = firebase.storage().ref();

  return storageRef.child(`${user.uid}/user_images/${filename}`).put(file);

}

export function deleteFromFirebaseStorage(filename){
  const userUid = firebase.auth().currentUser.uid;
  const storageRef = firebase.storage().ref();
  const photoRef = storageRef.child(`${userUid}/user_images/${filename}`);
  return photoRef.delete();

}

export function addEventChatComment(eventId,values){
  const user =  firebase.auth().currentUser;
  const newComment = {
    displayName:user.displayName,
    photoURL:user.photoURL,
    uid:user.uid,
    text:values.comment,
    date:Date.now(),
    parentId:values.parentId,
  }
  return firebase.database().ref(`chat/${eventId}`).push(newComment);
}

export function getEventChatRef(eventId){
  return firebase.database().ref(`chat/${eventId}`).orderByKey();
}

export function getUserFeedRef(){
  const user = firebase.auth().currentUser;
  return firebase.database().ref(`posts/${user.uid}`).orderByKey().limitToLast(5);
}