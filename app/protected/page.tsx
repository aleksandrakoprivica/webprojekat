import SignOut from "@/components/sign-out";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import InitialScreen from "@/components/initial-screen";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col space-y-5 justify-start items-center mt-20">
        <InitialScreen session={session} />
        <div className={"absolute right-4 top-0"}>
          <SignOut />
        </div>
      </div>
    </div>
  );
}
