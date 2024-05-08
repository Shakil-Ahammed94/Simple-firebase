

import './App.css'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase/firebase.config';
import { useState } from 'react';
const auth = getAuth(app);
const googleProvider=new GoogleAuthProvider();

function App() {
  const [user,setUser]=useState(null);
  const handleGoogleSignIn=()=>{
    signInWithPopup(auth,googleProvider)
    .then(result=>{
      const loggedUser=result.user;
      setUser(loggedUser);
      console.log(loggedUser);
    })
    .catch(error=>{
      console.log(error)
    })
  }

  const handleSignOut=()=>{
    signOut(auth)
    .then(rersult=>{
      console.log('result')
      setUser(null)
    })
    .catch(error=>{
      console.log(error)
    })
  }
  
  return (
    <>
      
      <h1>firebase+ React</h1>
      { user?
        
         <button onClick={handleSignOut}>Sign out</button>:
         <button onClick={ handleGoogleSignIn}>Sign in</button>
      }
     
      {
        user && <div>
          <h4>user:{user.displayName}</h4>
          <h4>Email:{user.email}</h4>
          <img src={user.photoURL} alt="" />
        
        </div>
      }


      
    </>
  )
}

export default App
