import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <Image
          width={512}
          height={512}
          src="/logo.png"
          alt="Platforms on Vercel"
          className="w-48 h-48"
        />
        <div className="text-center max-w-screen-sm mb-10">
          <h1 className="text-stone-200 font-bold text-2xl">Events platform</h1>
          <p className="text-stone-400 mt-5">
            Create and manage events or register for already created events in a
            few clicks!
          </p>
        </div>
        <div className={"flex flex-col gap-3 items-center"}>
          <h1 className="text-stone-200 font-bold text-2xl">
            Login/register as ADMIN
          </h1>
          <div className="flex space-x-3">
            <Link
              href="/admin/login"
              prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
              className="text-stone-400 w-[100px] flex items-center justify-center bg-cyan-600 rounded-xl underline hover:text-stone-200 transition-all"
            >
              <span className={"m-2"}>Login</span>
            </Link>
            <Link
              href="/admin/register"
              prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
              className="text-stone-400 flex w-[100px] items-center justify-center bg-slate-600 rounded-xl underline hover:text-stone-200 transition-all padding-[20px]"
            >
              <span className={"m-2"}>Register</span>
            </Link>
          </div>
          <h1 className="text-stone-200 font-bold text-2xl">
            Login/register as USER
          </h1>
          <div className="flex space-x-3">
            <Link
              href="/user/login"
              prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
              className="text-stone-400 w-[100px] flex items-center justify-center bg-cyan-600 rounded-xl underline hover:text-stone-200 transition-all"
            >
              <span className={"m-2"}>Login</span>
            </Link>
            <Link
              href="/user/register"
              prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
              className="text-stone-400 flex w-[100px] items-center justify-center bg-slate-600 rounded-xl underline hover:text-stone-200 transition-all padding-[20px]"
            >
              <span className={"m-2"}>Register</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
