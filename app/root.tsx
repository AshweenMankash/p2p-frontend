import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Styles from "~/styles/app.css";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : [
    { rel: "stylesheet", href: Styles }
  ]),
];

export default function App() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gradient-to-tr from-black to-slate-900 flex flex-col h-lvh" style={{scrollbarWidth:"none"}}>

        <nav className="flex items-center justify-around justify-items-start py-6 text-gray-200 ">

          <div className="flex text-2xl font-bold text-white">

            <Link to={"/"}>P2P</Link>
          </div>
          <div className="flex items-around gap-5 justify-end">
            <a className="text-green text-sm text-gray-400  hover:text-white border-none border-black p-2" href={"https://railway.app"} target="_blank">Hosted on</a>
            <a className="bg-clip-text bg-gradient-to-tr from-pink-700 to-orange-300 text-transparent text-sm border-none border-black p-2" href={"https://github.com/AshweenMankash"} target="_blank">My Github :)</a>
            <Link to="/login" className=" px-5 py-1 self-center rounded-3xl bg-blue-600 text-sm text-center font-base">Login</Link>
            {/* <Link className="text-base font-sm leading-6 text-gray-400 hover:text-white border-none border-black p-2" to={"/about"}>Pricing</Link> */}
          </div>
        </nav>
        <Outlet />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}


// export function link(){
//   return [
//     {rel: "stylesheet", href: Styles}
//   ]
// }