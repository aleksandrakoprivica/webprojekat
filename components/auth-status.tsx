import { unstable_getServerSession } from "next-auth/next";

export default async function AuthStatus() {
  const session = await unstable_getServerSession();
  return (
    <div className="absolute top-0 w-full right-0 z-[1000] text-right text-black ">
      {session && <p className="text-sm">Signed in as {session.user?.email}</p>}
    </div>
  );
}
