import cuid from "cuid";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Grid, Header } from "semantic-ui-react";
import { uploadToFireBaseStorage } from "../../firestore/firebaseService";
import { updateUserProfilePhoto } from "../../firestore/firestoreService";
import { getFileExtension } from "../util/util";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

export default function PhotoUploadWidget({setEditMode}) {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleUploadImage(){
    setLoading(true);
    const filename = cuid()+'.'+getFileExtension(files[0].name);
    const uploadTask = uploadToFireBaseStorage(image,filename);
    uploadTask.on('state_changed',snapshot => {
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      console.log('Upload is '+progress+ '% done');
    },error=>{
      toast.error(error.message);
    },()=>{
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL =>{
        updateUserProfilePhoto(downloadURL,filename).then(()=>{
          setLoading(false);
          handleCancelCrop();
          setEditMode(false);
        }).catch(error => {
          toast.error(error.message);
          setLoading(false);
        })
      })
    });
  }

function handleCancelCrop(){
  setFiles([]);
  setImage(null);
}

    return (
    <Grid>
      <Grid.Column width={4}>
        <Header color="teal" sub content="Step 1 - Add Photo" />
        <PhotoWidgetDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header color="teal" sub content="Step 2 - Resize" />
        {files.length > 0 && (
          <PhotoWidgetCropper
            setImage={setImage}
            imagePreview={files[0].preview}
          />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header color="teal" sub content="Step 3 - Preview & upload" />
        {files.length > 0 && 
          <>
            <div
              className="img-preview"
              style={{ minHeight: 200, minWidth: 200, overflow: "hidden" }}
            />
            <Button.Group>
            <Button loading={loading} style={{ width: 100 }} positive onClick={handleUploadImage} icon="check" />
            <Button loading={loading}  style={{ width: 100 }} icon="close" onClick={handleCancelCrop}/>
            </Button.Group>
          </>
        }
      </Grid.Column>
    </Grid>
  );
}
