import BarbershopItem from "../_components/barbershop-item"
import Header from "../_components/header"
import Search from "../_components/search"
import { db } from "../_lib/prisma"

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const query = searchParams.q?.trim() ?? ""
  const barbershops = query
    ? await db.barbershop.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { address: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
            {
              services: {
                some: {
                  OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { description: { contains: query, mode: "insensitive" } },
                  ],
                },
              },
            },
          ],
        },
        include: {
          services: {
            where: {
              OR: [
                { name: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
              ],
            },
            select: {
              id: true,
              name: true,
            },
          },
        },
      })
    : []

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-5 md:px-6 lg:px-8">
        <Search />

        <section className="mt-8">
          <h1 className="mb-4 text-xl font-bold">
            {query ? `Resultados para "${query}"` : "Buscar barbearias"}
          </h1>

          {!query ? (
            <p className="text-sm text-muted-foreground">
              Digite o nome de uma barbearia, endereço ou serviço para buscar.
            </p>
          ) : barbershops.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {barbershops.map((barbershop) => (
                <div key={barbershop.id}>
                  <BarbershopItem barbershop={barbershop} />
                  {barbershop.services.length > 0 && (
                    <div className="mt-2 max-w-[240px]">
                      <p className="mb-1 text-xs font-semibold text-muted-foreground">
                        Serviços correspondentes
                      </p>
                      <ul className="text-sm">
                        {barbershop.services.map((service) => (
                          <li key={service.id}>{service.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Nenhuma barbearia encontrada para &quot;{query}&quot;.
            </p>
          )}
        </section>
      </main>
    </div>
  )
}

export default SearchPage
