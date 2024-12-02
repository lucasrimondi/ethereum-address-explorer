import { Header } from '@/components/layout/Header'
import { MainContent } from '../components/layout/MainContent'

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center gap-4 p-4 sm:p-6 md:p-8">
      <Header />
      <MainContent />
    </div>
  )
}
