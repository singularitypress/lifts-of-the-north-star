import Link from "next/link";
import React, { ReactNode, useState } from "react";
import { Container } from "@components/global";
import { LoginButton } from "@components/experience-fragments";
import { useRouter } from "next/router";

interface IProps {
  logo: ReactNode;
  items: {
    label: string;
    href: string;
    type?: "button" | "link";
  }[];
}

export const Nav = ({ logo, items }: IProps) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();

  const transition = "transition ease-in duration-200";

  const closeIcon = <i className="fa-solid fa-xmark text-2xl"></i>;
  const openIcon = <i className="fa-solid fa-bars"></i>;

  return (
    <>
      <button
        className="flex justify-center items-center fixed right-4 top-4 z-50 w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 md:hidden"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {open ? closeIcon : openIcon}
      </button>
      <nav
        className={`z-40 transition-all duration-500 md:transition-none ${
          open ? "-translate-y-0" : "-translate-y-full"
        } md:translate-y-0 h-screen md:h-auto fixed flex justify-center py-5 px-4 xl:px-0 top-0 left-0 w-screen backdrop-blur-lg bg-slate-100/75 dark:bg-slate-900/75 md:bg-slate-100/30 md:dark:bg-slate-900/30 border-b border-slate-900/10 dark:border-slate-100/10 `}
      >
        <Container>
          <div className="flex flex-col md:flex-row h-full justify-center md:place-content-between md:items-center">
            <Link href="/" className="font-bold" onClick={() => setOpen(false)}>
              {logo}
            </Link>
            <ul className="flex flex-col md:flex-row place-content-between mt-8 md:mt-0">
              {items.map(({ label, href, type = "link" }) => {
                const active =
                  pathname === href
                    ? "border-b-2 border-b-slate-900 dark:border-b-slate-100"
                    : "";

                return (
                  <li key={href} className="mb-8 md:mb-0 flex md:items-center">
                    {type === "link" ? (
                      <Link
                        href={href}
                        className={`${transition} ${active} border-dotted hover:border-b-2 border-b-transparent hover:border-b-slate-900 dark:hover:border-b-slate-100 md:ml-8 font-bold`}
                        onClick={() => setOpen(false)}
                      >
                        {label}
                      </Link>
                    ) : (
                      <Link
                        href={href}
                        className={`${transition} ${active} border-dotted md:ml-8 rounded-fill px-4 py-2 rounded-full font-bold border-2 bg-slate-100 border-slate-100 text-slate-900 hover:bg-transparent hover:text-slate-100 dark:bg-slate-900 dark:border-slate-900 dark:text-slate-100 dark:hover:bg-slate-100 dark:hover:text-slate-900`}
                        onClick={() => setOpen(false)}
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                );
              })}
              <li className="md:ml-8">
                <LoginButton />
              </li>
            </ul>
          </div>
        </Container>
      </nav>
    </>
  );
};
