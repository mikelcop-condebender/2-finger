import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  title: string;
  link: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, link, children }) => {
  return (
    <Link to={link} className="rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2">{title}</h2>
        {children}
      </div>
    </Link>
  );
};
