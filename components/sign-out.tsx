"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      className="text-stone-400 bg-black transition-all"
      onClick={() => signOut()}
    >
      SIGN OUT
    </button>
  );
}
