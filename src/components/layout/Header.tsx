import { Badge } from '../ui/Badge'

export function Header() {
  return (
    <header className="flex flex-col items-center space-y-4 py-8">
      <div className="text-center">
        <Badge>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            reXplorer
          </h1>
        </Badge>
      </div>
      <p className="text-base text-secondary sm:text-lg md:text-xl lg:text-2xl">
        explore your ethereum address
      </p>
    </header>
  )
}
