import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import { PiNuclearPlantLight } from "react-icons/pi";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Forgot Password
  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateUserProfile = async (profileData) => {
    if (!auth.currentUser) return;

    try {
      await updateProfile(auth.currentUser, profileData);

      setUser({ ...auth.currentUser });
    } catch (err) {
      // log
    }
  };

  //   ----------------------user observer

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const userInfo = {
    createUser,
    user,
    loading,
    signInUser,
    signInWithGoogle,
    signOutUser,
    updateUser,
    forgotPassword,
    updateUserProfile,
  };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
