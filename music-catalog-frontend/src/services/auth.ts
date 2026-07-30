import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth";

import { auth } from "../firebase/firebase";

export const register = async (
    name: string,
    email: string,
    password: string
) => {
    const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    await updateProfile(credential.user, {
        displayName: name,
    });

    return credential.user;
};

export const login = async (
    email: string,
    password: string
) => {
    const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );

    return credential.user;

};

export const logout = async () => {
    await signOut(auth);
};