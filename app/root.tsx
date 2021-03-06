import {
  Link,
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix"
import type { MetaFunction } from "remix"
import styles from "./tailwind.css"

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }]
}
export const meta: MetaFunction = () => {
  return { title: "Pascal's Arithmetical Triangle" }
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  )
}
