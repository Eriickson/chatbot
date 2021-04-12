import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();

  return (
    <header className="w-full py-5 text-white bg-purple-700">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a>
              <h3 className="text-3xl font-semibold">Chatbot</h3>
            </a>
          </Link>
          <ul className="flex space-x-3 text-lg">
            <li
              className={
                router.pathname == "/add-saucer"
                  ? "text-white border-white border-b-2"
                  : "text-purple-200 border-b-2 border-transparent"
              }
            >
              <Link href="/add-saucer">
                <a>
                  <h3 className="font-semibold ">Administrar Menú</h3>
                </a>
              </Link>
            </li>
            <li
              className={
                router.pathname == "/bookings"
                  ? "text-white border-white border-b-2"
                  : "text-purple-200 border-b-2 border-transparent"
              }
            >
              <Link href="/bookings">
                <a>
                  <h3 className="font-semibold">Reservas</h3>
                </a>
              </Link>
            </li>
            <li
              className={
                router.pathname == "/place-orders"
                  ? "text-white border-white border-b-2"
                  : "text-purple-200 border-b-2 border-transparent"
              }
            >
              <Link href="/place-orders">
                <a>
                  <h3 className="font-semibold">Perdidos</h3>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
