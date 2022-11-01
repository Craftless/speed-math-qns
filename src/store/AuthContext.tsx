import React, { createContext, useReducer, useEffect } from "react";
import { auth } from "../firebase/config";
import firebase from "firebase/compat/app";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface IAuthContext {
  user: firebase.User | null;
  authIsReady: boolean;
  dispatch: any;
}

export const authReducer = (
  state: { user: firebase.User | null; authIsReady: boolean },
  action: any
) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null as firebase.User | null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);

  console.log("AuthContext state:", state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
