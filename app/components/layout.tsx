import Triangle, { TriangleSettings } from "./triangle"

export const Body = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="overflow-hidden h-screen flex flex-col"
      children={children}
    />
  )
}

export const BodyHeader = ({ title }: { title: string }) => {
  return (
    <header className="bg-slate-700 text-gray-100 p-2">
      <h3 className="text-2xl font-bold">{title}</h3>
    </header>
  )
}

export const BodyContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex-1 flex flex-row space-x-4 overflow-hidden"
      children={children}
    />
  )
}

export const LeftContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex flex-col space-y-2 flex-1 overflow-auto p-2"
      children={children}
    />
  )
}

export const RightContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[400px] margin-auto overflow-auto" children={children} />
  )
}

export const TriangleContentScrollable = ({
  generator,
  size,
  settings,
}: {
  generator: number
  size: number
  settings: TriangleSettings
}) => {
  return (
    <div className="overflow-auto w-fit">
      <Triangle generator={generator} size={size} settings={settings} />
    </div>
  )
}

export const Description = ({ children }: { children: React.ReactNode }) => {
  return <p className="description italic" children={children} />
}
