"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      className="text-stone-400 bg-orange-200 text-xl font-bold mr-3 mt-3.5 transition-all"
      onClick={() => signOut()}
    >
      SIGN OUT
    </button>
  );
}
