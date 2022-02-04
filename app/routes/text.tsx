import { Link, NavLink, Outlet } from "remix"

type Link = { name: string; url: string }
type LinksSection = { name: string; links: Array<Link> }

export default function TextRoute() {
  const links: Array<LinksSection> = [
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

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-row">
      <div className="w-64 p-2 border-r overflow-y-auto">
        <header className="pb-4">
          <h1 className="text-2xl font-bold">Pascal's Triangle</h1>
          <span>
            (
            <a
              className="text-blue-700 underline"
              target="_blank"
              href="https://web.nmsu.edu/~davidp/hist_projects/pascalII.pdf"
            >
              original text
            </a>
            )
          </span>
        </header>
        <nav>
          {links.map((section, i) => (
            <ul key={section.name} className={`first:border-t border-b py-2`}>
              {section.links.map(link => (
                <li className={`hover:bg-gray-300 w-full`}>
                  <NavLink
                    key={link.url}
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
      <div className="flex-1 p-2 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}
