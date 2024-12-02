import { Header } from '@/components/layout/Header'
import { AddressForm } from '@/components/form/AddressForm'

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center gap-4 p-4 sm:p-6 md:p-8">
      <Header />
      <AddressForm />
    </main>
  )
}
