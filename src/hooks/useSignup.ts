import { useState, useEffect } from "react";
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

      await projectFirestore.collection("users").doc(res.user.uid).set({
        displayName,
      });

      const stats = (
        await projectFirestore.collection("stats").doc("homePageStats").get()
      ).data();
      if (!stats) {
        alert("No stats");
      } else {
        await projectFirestore
          .collection("stats")
          .doc("homePageStats")
          .update({
            totalUsers: stats!.totalUsers + 1,
          });
      }

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err: any) {
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
