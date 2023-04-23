import './App.css';
import {GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut} from 'firebase/auth';
import app from './firebase/firebase.init';
import { useState } from 'react';
const auth = getAuth(app);


function App() {
 const [user,setUser] = useState({});
 const googleProvider = new GoogleAuthProvider();
 const githubProvider = new GithubAuthProvider();
 const handleGooogleSignIn = () => {
  signInWithPopup(auth,googleProvider)
  .then(result=>{
    const user = result.user;
    setUser(user);
    console.log(user);
  }).catch( error =>{
      console.error('érror: ',error);
  })
 }
 const handleSignOut = () =>{
        signOut(auth)
        .then(()=>{
            setUser({});
        }).catch(()=>{
          setUser({});
        })
 }
 const handleGithubProvider = () => {
      signInWithPopup(auth,githubProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      }).catch(error => {
           console.error('error', error);
        })
 }
  return (
    <div className="App">
        { user.uid ?
           <button onClick={handleSignOut}> signOut</button>
           :
           <>
               <button onClick={handleGooogleSignIn }>Sign In </button>
               <button onClick={handleGithubProvider}>Github Sign In</button>
           </>
           
        }
       { user.uid && 
         <div>
            <h1>name: {user.displayName}</h1>
            <p>email: {user.email}</p>
            <img src={user.photoURL} alt="" />
        </div>
       }
    </div>
  );
}

export default App;
