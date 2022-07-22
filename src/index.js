import React, {useState} from 'react'
import styles from './styles.module.css'
import Utils from './utils';
import Services from './services';

export const Session = (props) => {

  const [signedIn, setSignedIn] = useState(true);

  function sendSuccess() {
    setSignedIn(true);
    if(props.onSessionCheck != null) props.onSessionCheck(true);
  }

  function sendFailure() {
    setSignedIn(false);
    if(props.onSessionCheck != null) props.onSessionCheck(false);
  }

  Utils.useInterval(() => {
    
    async function checkCredentials() {

      if(props.email == null || props.token == null || props.email == "" || props.token == "") {
        sendFailure();
        return;
      }

      const resultCredentials = await Services.getCredentials(props.awsRegion, props.awsSecret, props.awsKey, props.email);
      if(resultCredentials.Item != null) {
        const tokens = resultCredentials.Item.tokens;
        if(tokens == null) {
          sendFailure();
        } else {
          if(tokens.includes(props.token)) {
            sendSuccess();
          } else {
            sendFailure();
          }
        }
        
      } else {
        sendFailure();
      }

    }

    checkCredentials();

  }, props.interval);

  return (
    <div>
      {signedIn && <div className="signedIn"></div>}
      {!signedIn && <div className="signedOff"></div>}
    </div>

  )
  
}
