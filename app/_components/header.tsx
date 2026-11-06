import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"

import SiderbarSheet from "./siderbar-sheet"
import Link from "next/link"

const Header = () => {
  return (
    <header>
      <Card>
        <CardContent className="mx-auto flex max-w-7xl flex-row items-center justify-between p-5 md:px-6 lg:px-8">
          <Link href="/">
           <Image
            src="/logo.png"
            alt="Logo Barber Shop"
            width={100}
            height={18}
          />
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SiderbarSheet />
          </Sheet>
        </CardContent>
      </Card>
    </header>
  )
}

export default Header
