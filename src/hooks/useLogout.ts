import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { reset } from "../store/redux/stats-slice";
import { useAppDispatch } from "./redux-hooks";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const reduxDispatch = useAppDispatch();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      // sign the user out
      await auth.signOut();

      // dispatch logout action
      dispatch({ type: "LOGOUT" });
      // reduxDispatch(reset({}));

      // update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
      window.location.reload();
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

  return { logout, error, isPending };
};
