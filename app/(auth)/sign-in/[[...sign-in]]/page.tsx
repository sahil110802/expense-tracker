import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <div className="flex h-screen bg-green-200 justify-center items-center"><SignIn /></div>;
}