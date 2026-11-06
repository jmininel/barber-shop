import PhoneItem from "@/app/_components/phone-item"
import ServiceItem from "@/app/_components/service-item"
import SiderbarSheet from "@/app/_components/siderbar-sheet"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  // chamar o meu banco de dados
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-5 md:px-6 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:gap-8 lg:px-8 lg:py-10">
      <section>
        {/* IMAGEM */}
        <div className="relative h-[250px] w-full overflow-hidden rounded-xl md:h-[360px] lg:h-[440px]">
          <Image
            alt={barbershop.name}
            src={barbershop.imageUrl}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />

          <Button
            size="icon"
            variant="secondary"
            className="absolute left-4 top-4"
            asChild
          >
            <Link href="/">
              <ChevronLeftIcon />
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="absolute right-4 top-4"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SiderbarSheet />
          </Sheet>
        </div>

        {/* TÍTULO */}
        <div className="border-b border-solid py-5 lg:py-6">
          <h1 className="mb-3 text-xl font-bold md:text-2xl">{barbershop.name}</h1>
          <div className="mb-2 flex items-center gap-2">
            <MapPinIcon className="shrink-0 text-primary" size={18} />
            <p className="text-sm">{barbershop.address}</p>
          </div>

          <div className="flex items-center gap-2">
            <StarIcon className="fill-primary text-primary" size={18} />
            <p className="text-sm">5,0 (499 avaliações)</p>
          </div>
        </div>

        {/* DESCRIÇÃO */}
        <div className="space-y-2 border-b border-solid py-5 lg:py-6">
          <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
          <p className="text-sm leading-6">{barbershop.description}</p>
        </div>
      </section>

      <section className="space-y-5 py-5 lg:py-0">
        {/* SERVIÇOS */}
        <div className="space-y-3 lg:rounded-xl lg:border lg:bg-card lg:p-5">
          <h2 className="text-xs font-bold uppercase text-gray-400">Serviços</h2>
          <div className="space-y-3">
            {barbershop.services.map((service) => (
              <ServiceItem
                key={service.id}
                barbershop={JSON.parse(JSON.stringify(barbershop))}
                service={JSON.parse(JSON.stringify(service))}
              />
            ))}
          </div>
        </div>

        {/* CONTATO */}
        <div className="space-y-3 lg:rounded-xl lg:border lg:bg-card lg:p-5">
          <h2 className="text-xs font-bold uppercase text-gray-400">Contato</h2>
          {barbershop.phones.map((phone) => (
            <PhoneItem key={phone} phone={phone} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default BarbershopPage