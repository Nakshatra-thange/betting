'use client';
import { signIn } from "next-auth/react";

export default function GoogleLoginBtn() {
  return (
    <button
      onClick={() => signIn("google")}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
    >
      Sign in with Google
    </button>
  );
}
