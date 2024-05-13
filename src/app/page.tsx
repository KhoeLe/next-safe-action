import { ComboboxDemo } from "@/components/combobox-demo";
import LoginForm from "@/components/login-form";
import { Button } from "@/components/ui/button";
import { HomeIcon, ItalicIcon, OrbitIcon } from "lucide-react";
import Link from "next/link";
import React, { cache } from "react";



const getGithubUser = cache(async () => {
  const response = await fetch("https://api.github.com/users/khoele");
  return await response.json();
});

async function UserProfile() {
  const user = await getGithubUser();
  return <div>
    <pre className="border rounded-md min-w-fit text-blue-400">
      {JSON.stringify(user, null , 1)}
    </pre>

  </div>
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>

        <h1 className="text-indigo-400">Testing ComboBox</h1>
        <ComboboxDemo />

        <LoginForm />

      </div>



    <div className="flex items-center flex-row">
    <Button className="" variant={'link'}>
        <OrbitIcon className="w-6 h-6 mr-2" />
        <Link href="/optimistic">
          Optimistic Page
        </Link>
      </Button>

      <Button variant={'link'}>
        <ItalicIcon className="w-6 h-6 mr-2" />
        <Link href="/work-items">
          WorkItems Page
        </Link>
      </Button>
    </div>

    </main>
  );
}
