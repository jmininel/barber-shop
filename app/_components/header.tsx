import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"

import SiderbarSheet from "./siderbar-sheet"
import Link from "next/link"

const Header = () => {
  return (
    <div>
      <Card>
        <CardContent className="flex flex-row items-center justify-around p-5">
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
    </div>
  )
}

export default Header
