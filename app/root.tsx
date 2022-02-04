import {
  Link,
  Links,
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
import { links as navLinks } from "~/routes/text"

export function links() {
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

export function CatchBoundary() {
  let caught = useCatch()
  const links = navLinks()

  let message
  switch (caught.status) {
    case 401:
    case 404:
      return (
        <div className="w-screen h-screen overflow-hidden flex flex-row">
          <div className="w-64 p-2 border-r overflow-y-auto">
            <header className="pb-4">
              <h1 className="text-2xl font-bold">Pascal's Triangle</h1>
              <span>
                (
                <Link className="text-blue-700 underline" to="/">
                  Playground
                </Link>
                )
              </span>
            </header>
            <nav>
              {links.map((section, i) => (
                <ul
                  key={section.name}
                  className={`first:border-t border-b py-2`}
                >
                  {section.links.map(link => (
                    <li key={link.url} className={`hover:bg-gray-300 w-full`}>
                      <NavLink
                        className={({ isActive }) =>
                          `${
                            isActive ? "bg-gray-300 font-semibold" : ""
                          } block p-1 hover:font-semibold `
                        }
                        to={`text/${link.url}`}
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              ))}
            </nav>
          </div>
          <div className="flex-1 ">
            <div className="overflow-hidden h-screen flex flex-col">
              <header className="bg-slate-700 text-gray-100 p-2">
                <h3 className="text-2xl font-bold">PAGE NOT FOUND</h3>
              </header>
              <div className="p-4">
                The page you selected has not be implemented yet.
              </div>
            </div>
          </div>
        </div>
      )
      break

    default:
      throw new Error(
        `Unexpected caught response with status: ${caught.status}`
      )
  }
}
