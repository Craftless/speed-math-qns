import React, { createContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { auth, projectStorage } from "../firebase/config";
import {
  getCurrentUserDisplayNameFromUser,
  getCurrentUserProfilePictureFromUser,
  updateUserProfile,
} from "../util/auth";
import { ref } from "firebase/storage";

let logoutTimer;

export interface IAuthContext {
  user: firebase.User | undefined;
  isLoggedIn: boolean;
  change: string;
  pfpCacheKey: string;
  updatePfp: (uri: string) => Promise<void>;
  updatePfpAvatar: (avatarIndex: number, colour?: string) => Promise<void>;
  updateUserDisplayName: (newName: string) => Promise<void>;
  getCurrentPfp: () => string | undefined;
  getCurrentDisplayName: () => string | null;
  authenticate: (user: firebase.User) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext({
  isLoggedIn: false,
  change: "",
  updatePfp: async (uri: string) => {},
  getCurrentDisplayName: () => {},
  authenticate: async (user: firebase.User) => {},
  logout: (dispatch: any) => {},
} as IAuthContext);

function AuthContextProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<firebase.User>();
  const [change, setChange] = useState("");
  const [pfpCacheKey, setPfpCacheKey] = useState("");



  useEffect(() => {
    console.log(`KEY: ${pfpCacheKey}`);
  }, [pfpCacheKey]);

  async function authenticate(user: firebase.User) {
    setUser(user);
    console.log("Authenticated");
  }

  function getCurrentUserProfilePicture() {
    if (user) {
      getCurrentUserProfilePictureFromUser(user);
    }
    alert("Cannot get profile picture of a user that does not exist!");
    return undefined;
  }

  function getCurrentUserDisplayName() {
    if (user) {
      return getCurrentUserDisplayNameFromUser(user);
    }
    alert("Cannot get display name of a user that does not exist!");
    return null;
  }

  async function updateUserProfilePicture(uri: string) {
    if (user) {
      const image = await uploadImageToCloud(uri, user);
      const downloadUrl = await image.ref.getDownloadURL();
      await updateUserProfile(user, { photoURL: downloadUrl });
      setPfpCacheKey(Math.random().toFixed(6).toString().replace(".", ""));
    }
  }
  async function updateUserProfilePictureWithAvatar(avatarIndex: number, colour?: string) {
    if (user) {
      await updateUserProfile(user, { photoURL: `${colour ? `${colour}_End_` : "" }$Avatar${avatarIndex}` });
    }
  }
  

  async function updateUserDisplayName(newName: string) {
    if (user) {
      await updateUserProfile(user, { displayName: newName });
    }
  }

  async function uploadImageToCloud(uri: string, user: firebase.User) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const uploadPath = `users/${user.uid}/pfp`;

    const image = await projectStorage.ref(uploadPath).put(blob);
    return image;
  }

  function logout() {
    setUser(undefined);
    alert("Logging out")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        change,
        isLoggedIn: !!user,
        pfpCacheKey,
        updatePfp: updateUserProfilePicture,
        updatePfpAvatar: updateUserProfilePictureWithAvatar,
        updateUserDisplayName,
        getCurrentPfp: getCurrentUserProfilePicture,
        getCurrentDisplayName: getCurrentUserDisplayName,
        authenticate: authenticate,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
