import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { quickSearckOption } from "../_constants/search"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"

const Header = () => {
  return (
    <div>
      <Card>
        <CardContent className="flex flex-row items-center justify-between p-5">
          <Image
            src="/logo.png"
            alt="Logo Barber Shop"
            width={100}
            height={18}
          />
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto-y-auto">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>

              <div className="flex items-center gap-3 border-b border-solid py-5">
                <Avatar>
                  <AvatarImage src="https://www.stryx.com/cdn/shop/articles/man-looking-attractive.jpg?v=1666662774" />
                </Avatar>

                <div>
                  <p className="font-bold">Tom Hask</p>
                  <p className="text-xs">tomhask@hotmail.com</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 border-b border-solid py-5">
                <SheetClose asChild>
                  <Button className="justify-start gap-2" asChild>
                    <Link href="/">
                      <HomeIcon size={18} />
                      Inicio
                    </Link>
                  </Button>
                </SheetClose>

                <Button variant="ghost" className="justify-start gap-2">
                  <CalendarIcon size={18} />
                  Agendamentos
                </Button>
              </div>

              <div className="flex flex-col gap-2 border-b border-solid py-5">
                {quickSearckOption.map((option) => (
                  <Button
                    key={option.title}
                    className="justify-start gap-2"
                    variant="ghost"
                  >
                    <Image
                      src={option.imageUrl}
                      width={18}
                      height={18}
                      alt="Botoes de serviços"
                    />
                    {option.title}
                  </Button>
                ))}
              </div>

              <div className="flex flex-col gap-2 py-5">
                <Button variant="ghost" className="justify-start gap-2">
                  <LogOutIcon size={18} />
                  Sair da conta
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </div>
  )
}

export default Header
