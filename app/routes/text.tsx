import { Link, NavLink, Outlet, useCatch } from "remix"

type Link = { name: string; url: string }
type LinksSection = { name: string; links: Array<Link> }

export const links = (): Array<LinksSection> => [
  {
    name: "Definitions",
    links: [{ name: "Definitions", url: "definitions" }],
  },
  {
    name: "Consequences",
    links: [
      { name: "1st Consequence", url: "consequence/1" },
      { name: "2nd Consequence", url: "consequence/2" },
      { name: "3rd Consequence", url: "consequence/3" },
      { name: "4th Consequence", url: "consequence/4" },
      { name: "5th Consequence", url: "consequence/5" },
      { name: "6th Consequence", url: "consequence/6" },
      { name: "7th Consequence", url: "consequence/7" },
      { name: "8th Consequence", url: "consequence/8" },
    ],
  },
]
export default function TextRoute() {
  const navLinks = links()
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
          {navLinks.map((section, i) => (
            <ul key={section.name} className={`first:border-t border-b py-2`}>
              {section.links.map(link => (
                <li key={link.url} className={`hover:bg-gray-300 w-full`}>
                  <NavLink
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-gray-300 font-semibold" : ""
                      } block p-1 hover:font-semibold `
                    }
                    to={link.url}
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
        <Outlet />
      </div>
    </div>
  )
}

export function CatchBoundary() {
  let caught = useCatch()

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
                        to={link.url}
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
