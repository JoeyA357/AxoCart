import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/authContext'
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth'
import Add from "../../../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userType, setUserType] = useState('');
    //const [isRegistering, setIsRegistering] = useState(false)

    const navigate = useNavigate();
  
    const onSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();
      const displayName = e.target[0].value;
      const email = e.target[1].value;
      const password = e.target[2].value;
      const file = e.target[4].files[0];

    try {
        //Create user
        setLoading(true);
        const res = await createUserWithEmailAndPassword(auth, email, password);
        
        //Create a unique image name
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);
        // await setDoc(doc(db, "users", res.user.uid), {
        //             uid: res.user.uid,
        //             displayName,
        //             email,
        //             photoURL: downloadURL,
        //           });
    //     try{
    //     //create empty user chats on firestore
    //     await setDoc(doc(db, "userChats", res.user.uid), {});
    //     navigate("/");
    //   } catch (err) {
    //     console.log(err);
    //           setErr(true);
    //           setLoading(false);
    //         }
  
        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              //Update profile
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              //create user on firestore
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
                userType,
              });
  
              //create empty user chats on firestore
              await setDoc(doc(db, "userChats", res.user.uid), {});
              navigate("/");
            } catch (err) {
              console.log(err);
              setErr(true);
              setLoading(false);
            }
          });
        });
      } catch (err) {
        setErr(true);
        setLoading(false);
      }
    };

    const handleUserTypeChange = (e) => {
      setUserType(e.target.value);
    };
    

    // return (
    //     <>
    //         {/* {userLoggedIn && (<Navigate to={'/home'} replace={true} />)} */}

    //         <main className="w-full h-screen flex self-center place-content-center place-items-center">
    //             <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
    //                 <div className="text-center mb-6">
    //                     <div className="mt-2">
    //                         <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Create a New Account</h3>
    //                     </div>

    //                 </div>
    //                 <form
    //                     onSubmit={onSubmit}
    //                     className="space-y-4"
    //                 >
    //                     <div>
    //                         <label className="text-sm text-gray-600 font-bold">
    //                             username
    //                         </label>
    //                         {/* <input
    //                             type="username"
    //                             autoComplete='username'
    //                             required
    //                             value={displayName} onChange={(e) => { setUsername(e.target.value) }}
    //                             className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
    //                         /> */}
    //                         <input required type="text" placeholder="display name"
    //                          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
    //                         />
    //                     </div>

    //                     <div>
    //                         <label className="text-sm text-gray-600 font-bold">
    //                             Email
    //                         </label>
    //                         {/* <input
    //                             type="email"
    //                             autoComplete='email'
    //                             required
    //                             value={email} onChange={(e) => { setEmail(e.target.value) }}
    //                             className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
    //                         /> */}
    //                         <input required type="email" placeholder="email" 
    //                         className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
    //                         />

    //                     </div>

    //                     <div>
    //                         <label className="text-sm text-gray-600 font-bold">
    //                             Password
    //                         </label>
    //                         {/* <input
    //                             disabled={isRegistering}
    //                             type="password"
    //                             autoComplete='new-password'
    //                             required
    //                             value={password} onChange={(e) => { setPassword(e.target.value) }}
    //                             className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
    //                         /> */}
    //                         <input required type="password" placeholder="password" 
    //                         className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
    //                         />
    //                     </div>

    //                     {/* <div>
    //                         <label className="text-sm text-gray-600 font-bold">
    //                             Confirm Password
    //                         </label>
    //                         <input
    //                             disabled={isRegistering}
    //                             type="password"
    //                             autoComplete='off'
    //                             required
    //                             value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value) }}
    //                             className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
    //                         />
    //                     </div> */}

    //                     <div>
    //                         <label htmlFor="file">
    //                         <img src={Add} alt="" />
    //                         <span>Add an avatar</span>
    //                         </label>
    //                     </div>

    //                     {err && (
    //                         <span className='text-red-600 font-bold'>{err}</span>
    //                     )}
    //                     <input required style={{ display: "none" }} type="file" id="file" className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"/>
    //                     <button
    //                         type="submit"
    //                         disabled={loading}
    //                         className={`w-full px-4 py-2 text-white font-medium rounded-lg ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
    //                     >
    //                         {loading ? 'Signing Up...' : 'Sign Up'}
    //                     </button>
                        
    //                     <div className="text-sm text-center">
    //                         Already have an account? {'   '}
    //                         <Link to={'/login'} className="text-center text-sm hover:underline font-bold">Continue</Link>
    //                     </div>
    //                 </form>
    //             </div>
    //         </main>
    //     </>
    // )
    return (
      <div className="formContainer">
        <div className="formWrapper">
          <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Register New Account</h3>
          <form onSubmit={onSubmit}>
            <label className="text-sm text-gray-600 font-bold">Display Name</label>
            <input required type="text" placeholder="display name..." className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"/>
            <label className="text-sm text-gray-600 font-bold">Email</label>
            <input required type="email" placeholder="email..." className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"/>
            <label className="text-sm text-gray-600 font-bold">Password</label>
            <input required type="password" placeholder="password..." className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"/>
            <select required value={userType} onChange={handleUserTypeChange}>
              <option value="">Customer or Seller?</option>
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
            </select>
            <input required style={{ display: "none" }} type="file" id="file" />
            <label htmlFor="file">
              <img src={Add} alt="" />
              <span>Add an avatar</span>
            </label>
            <button disabled={loading}>Sign up</button>
            {loading && "Uploading and compressing the image please wait..."}
            {err && <span>Something went wrong</span>}
          </form>
          <p>
            You do have an account? <Link to="/register">Login</Link>
          </p>
        </div>
      </div>
    );
  };
  
  export default Register;