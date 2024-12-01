import { Header } from '@/components/layout/Header'
import { AddressForm } from '@/components/form/AddressForm'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-8">
      <Header />
      <AddressForm />
    </main>
  )
}
