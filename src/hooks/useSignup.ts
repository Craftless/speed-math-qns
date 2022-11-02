import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";
import { auth, projectDatabase, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      const res = await auth.createUserWithEmailAndPassword(email, password);

      if (!res || !res.user) {
        throw new Error("Could not complete signup");
      }

      // add display name to user
      await res.user.updateProfile({ displayName });

      await projectDatabase.ref(`userInfo/${res.user.uid}`).update({
        displayName
      })

      // await projectFirestore.collection("users").doc(res.user.uid).set({
      //   displayName,
      // });

      await projectFirestore
        .collection("stats")
        .doc("homePageStats")
        .set(
          {
            totalUsers: firebase.firestore.FieldValue.increment(1),
            totalGamesPlayed: firebase.firestore.FieldValue.increment(0),
          },
          { merge: true }
        );
      await projectFirestore.collection("userData").doc(res.user.uid).set({
        totalGamesPlayed: 0,
        totalScore: 0,
        totalCorrect: 0,
        totalSkipped: 0,
        totalWrong: 0,
      });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err: any) {
      alert(err);
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
