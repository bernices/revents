import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { closeModal } from "../../app/common/modals/modelReducer";
import { socialLogin } from "../../app/firestore/firestoreService";

export default function SocialLogin() {
    const dispatch = useDispatch();

    function handleSocialLogin(provider){
        dispatch(closeModal());
        socialLogin(provider);
    }


  return (
    <>
      <Button
        icon="facebook"
        fluid
        color="facebook"
        style={{ marginBottom: 10 }}
        content='Login with Facebook'
        onClick={()=> handleSocialLogin('facebook')}
      />
        <Button
        icon="google"
        fluid
        color="google plus"
        content='Login with Google'
        onClick={()=> handleSocialLogin('google')}

      />
      
    </>
  );
}
