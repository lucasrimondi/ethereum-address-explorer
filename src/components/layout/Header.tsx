import { Badge } from '../ui/Badge'

export function Header() {
  return (
    <header className="flex flex-col items-center space-y-4 py-8">
      <div className="text-center">
        <Badge>
          <h1 className="text-2xl sm:text-3xl md:text-4xl">reXplorer</h1>
        </Badge>
      </div>
      <p className="text-lg text-secondary sm:text-xl md:text-2xl">
        explore your ethereum address
      </p>
    </header>
  )
}
