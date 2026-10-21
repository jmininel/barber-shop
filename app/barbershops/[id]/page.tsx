import PhoneItem from "@/app/_components/phone-item"
import ServiceItem from "@/app/_components/service-item"
import SiderbarSheet from "@/app/_components/siderbar-sheet"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import { ChevronsLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: {
    id: string
    imageUrl: string
    name: string
    address: string
    description: string
    services: {
      id: string
      name: string
      price: number
    }[]
    phones: string[]
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id
    },
    include: {
      services: true,
    },
  })
   

  if (!barbershop) {
    return notFound()
  }

  return (
     <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl md:py-6">
        <div className="overflow-hidden bg-background md:rounded-[28px] md:border md:border-border/60 md:shadow-xl">
          {/*Image*/}
          <div className="relative h-[250px] w-full md:h-[420px] lg:h-[500px]">
            <Image
              src={barbershop?.imageUrl}
              fill
              priority
              quality={90}
              sizes="(max-width: 768px) 100vw, 1200px"
              className="h-full w-full object-cover object-center"
              alt="Imagem da barberaria"
            />

            <Button
              size="icon"
              variant="secondary"
              className="absolute left-4 top-4"
            >
              <Link href="/">
                <ChevronsLeftIcon />
              </Link>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="absolute right-4 top-4"
                  size="icon"
                  variant="outline"
                >
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SiderbarSheet />
            </Sheet>
          </div>

          <div className="md:px-8 md:pb-8">
            {/*title*/}
            <div className="border-b border-solid p-5 md:border-0 md:p-0 md:pt-6">
              <h1 className="mb-3 text-xl font-bold md:text-3xl">
                {barbershop?.name}
              </h1>
              <div className="mb-3 flex items-center gap-1">
                <MapPinIcon className="text-primary" size={18} />
                <p className="text-sm md:text-base">{barbershop?.address}</p>
              </div>

              <div className="flex items-center gap-1">
                <StarIcon className="fill-primary text-primary" size={18} />
                <p className="text-sm md:text-base">5,0 (499 avaliações)</p>
              </div>
            </div>

            {/*Description*/}
            <div className="space-y-2 border-b border-solid p-5 md:border-0 md:p-0 md:py-6">
              <h2 className="text-xs font-bold uppercase text-gray-400">
                Sobre nós
              </h2>
              <p className="text-justify text-sm md:text-base">
                {barbershop?.description}
              </p>
            </div>

            {/*services*/}
            <div className="space-y-3 border-b border-solid p-5 md:border-0 md:p-0 md:py-6">
              <h2 className="text-xs font-bold uppercase text-gray-400">
                Serviços
              </h2>
              <div className="space-y-3">
                {barbershop.services.map((service) => (
                  <ServiceItem
                    key={service.id}
                    service={service}
                    barbershop={barbershop}
                  />
                ))}
              </div>
            </div>

            {/*contact*/}
            <div className="space-y-5 p-5 md:p-0 md:pt-6">
              {barbershop.phones.map((phone) => (
                <PhoneItem key={phone} phone={phone} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarbershopPage
