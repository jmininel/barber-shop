import Image from "next/image"
import { Button } from "./_components/ui/button"
import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import { SearchIcon } from "lucide-react"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearckOption } from "./_constants/search"
import BookingItem from "./_components/booking-item"

const Home = async () => {
  const barbershops = await db.barbershop.findMany({})

  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Juliana</h2>
        <p>Segunda-feira 05 Agosto</p>

        <div className="mt-4 flex justify-center">
          <div className="flex w-full items-center gap-2 rounded-lg sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5">
            <Input
              type="text"
              placeholder="Faça sua busca"
              className="w-full rounded-l-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Button className="rounded-r-lg bg-indigo-500 p-2 text-white hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none">
              <SearchIcon />
            </Button>
          </div>
        </div>

        <div className="mt-6 flex gap-3 overflow-x-scroll opacity-100 transition-opacity duration-1000 ease-in-out md:pointer-events-none md:hidden md:opacity-0 [&::-webkit-scrollbar]:hidden">
          {quickSearckOption.map((option) => (
            <Button className="gap-2" variant="secondary" key={option.title}>
              <Image
                src={option.imageUrl}
                width={16}
                height={16}
                alt={option.title}
              />
              {option.title}
            </Button>
          ))}
        </div>

        <div className="relative mt-6 h-[150px] w-full md:hidden">
          <Image
            src="/banner-01.png"
            alt="Agende com os melhores na Barber-Shop"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        <BookingItem />

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
