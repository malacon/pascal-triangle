import { Link, useMatches } from "remix"
import { LinkType, navigationLinks } from "~/routes/text"

const useNextLink = () => {
  const base = "/text/"
  const matches = useMatches()
  const currentLink = matches[matches.length - 1].pathname.replace(base, "")
  return navigationLinks.reduce<LinkType | undefined>(
    (link, section, i, linkSections) => {
      const idx = section.links.findIndex(l => l.url === currentLink)
      if (idx < 0) return link
      if (idx >= 0 && section.links.length - 1 > idx) {
        return section.links[idx + 1]
      } else if (idx >= 0 && linkSections.length - 1 >= i + 1) {
        return linkSections[i + 1].links[0]
      }
      return link
    },
    undefined
  )
}

export const NextButton = () => {
  const nextLink = useNextLink()

  return nextLink ? (
    <Link
      to={`/text/${nextLink.url}`}
      className="my-1 p-2 w-full bg-green-600 text-gray-100 rounded text-center hover:bg-green-700"
    >
      Next :: ({nextLink.name})
    </Link>
  ) : null
}
