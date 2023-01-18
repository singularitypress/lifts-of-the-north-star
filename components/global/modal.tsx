import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

// Tailwind CSS React Modal
export const Modal = ({ children, visible, setVisible }: Props) => {
  const transition = "transition ease-in duration-200";

  // modal ref
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible) {
      modalRef.current?.classList.add("opacity-100");
      modalRef.current?.classList.remove("opacity-0");
      modalRef.current?.classList.add("z-50");
      modalRef.current?.classList.remove("-z-50");
    } else {
      modalRef.current?.classList.add("opacity-0");
      modalRef.current?.classList.remove("opacity-100");
      modalRef.current?.classList.add("-z-50");
      modalRef.current?.classList.remove("z-50");
    }
  }, [visible]);

  return (
    <div ref={modalRef} className={`modal ${transition} opacity-0 -z-50 fixed w-screen h-screen top-0 flex items-center justify-center`}>
      <div className="modal-content max-h-screen overflow-scroll z-40 bg-slate-100 dark:bg-slate-900 border border-slate-900/10 dark:border-slate-100/10 rounded-2xl p-8">
        {children}
      </div>
      <div
        className="modal-overlay w-full h-full absolute top-0 z-10 bg-slate-100/25 dark:bg-slate-900/25 backdrop-blur-xl"
        onClick={() => setVisible(false)}
      ></div>
    </div>
  );
};
