import { useSession, signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  const { data: session } = useSession();
  const buttonClass = `
    bg-slate-100
    dark:bg-slate-900
    border-2
    border-slate-900
    dark:border-slate-100
    rounded-md
    px-4
    py-2
    transition-all
    duration-200
    ease-in-out
    hover:bg-slate-900
    hover:text-slate-100
    dark:hover:bg-slate-100
    dark:hover:text-slate-900
    font-bold
  `;
  if (session) {
    return (
      <>
        Signed in as {session.user?.name} <br />
        <button className={buttonClass} onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <button className={buttonClass} onClick={() => signIn()}>
      Sign in
    </button>
  );
};
