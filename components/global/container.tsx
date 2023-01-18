import React, { ReactNode } from "react";

export const Container = ({
  children = <></>,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};
