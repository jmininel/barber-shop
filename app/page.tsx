import Image from "next/image"
import { Button } from "./_components/ui/button"
import Header from "./_components/header"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearckOption } from "./_constants/search"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"

const Home = async () => {
  const barbershops = await db.barbershop.findMany({})

  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-5 md:px-6 lg:px-8">
        <section className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col gap-2 md:mt-2">
            <h2 className="text-2xl font-bold md:text-3xl">Olá, Juliana</h2>
            <p className="text-sm text-muted-foreground md:text-base">
              Segunda-feira 05 Agosto
            </p>
          </div>

          <Search />

          <div className="mt-2 flex gap-3 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
            {quickSearckOption.map((option) => (
              <Button
                className="gap-2 whitespace-nowrap md:px-4"
                variant="secondary"
                key={option.title}
              >
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
        </section>

        <section className="mt-6">
          <div className="relative h-[180px] w-full overflow-hidden rounded-2xl md:h-[280px]">
            <Image
              src="/banner-01.png"
              alt="Agende com os melhores na Barber-Shop"
              fill
              className="rounded-2xl object-cover"
            />
          </div>
        </section>

        <section className="mt-6 md:mt-8">
          <BookingItem />
        </section>

        <section className="mt-8">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
            Recomendados
          </h2>
          <div className="flex gap-4 overflow-auto pb-2 [&::-webkit-scrollbar]:hidden">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </section>

        <section className="mt-8 pb-8">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
            Populares
          </h2>
          <div className="flex gap-4 overflow-auto pb-2 [&::-webkit-scrollbar]:hidden">
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
