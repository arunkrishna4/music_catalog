import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth";

import { auth } from "../firebase/firebase";

function getFirebaseError(error: any): string {
    switch (error.code) {
        case "auth/invalid-email":
            return "Please enter a valid email address.";

        case "auth/email-already-in-use":
            return "An account with this email already exists.";

        case "auth/weak-password":
            return "Password must be at least 6 characters long.";

        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
            return "Incorrect email or password.";

        case "auth/too-many-requests":
            return "Too many login attempts. Please try again later.";

        default:
            return "Something went wrong. Please try again.";
    }
}

export const register = async (
    name: string,
    email: string,
    password: string
) => {
    try {
        const credential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        await updateProfile(credential.user, {
            displayName: name,
        });

        return credential.user;
    } catch (error: any) {
        throw new Error(getFirebaseError(error));
    }
};

export const login = async (
    email: string,
    password: string
) => {
    try {
        const credential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        return credential.user;
    } catch (error: any) {
        throw new Error(getFirebaseError(error));
    }
};

export const logout = async () => {
    await signOut(auth);
};