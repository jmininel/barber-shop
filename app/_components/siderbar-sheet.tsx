"use client"

import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearckOption } from "../_constants/search"
import Link from "next/link"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Avatar, AvatarImage } from "./ui/avatar"
import { signIn, signOut, useSession } from "next-auth/react"

const SiderbarSheet = () => {

  const { data } = useSession()

  const handleLoginWithGoogleClick = async () => {
    await signIn("google")
  }

  const handleLogoutClick = async () => {
    await signOut()
  }

  return (
    <SheetContent className="overflow-y-auto-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      {data?.user ? (
        <div className="flex items-center border-b border-solid py-5 gap-3">
          <Avatar>
            <AvatarImage src={data.user.image || ""} />
          </Avatar>

          <div>
            <p className="font-bold">{data.user.name || "Usuário"}</p>
            <p className="text-xs">{data.user.email || ""}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
          <h2 className="font-bold">Olá, faça seu login!</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <LogInIcon size="icon" />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[90%]">
              <DialogHeader>
                <DialogTitle>Faça login na plataforma</DialogTitle>
                <DialogDescription>
                  Conecte-se usando sua conta do Google
                </DialogDescription>
              </DialogHeader>
              <Button
                variant="outline"
                className="gap-1 font-bold"
                onClick={handleLoginWithGoogleClick}>
                <Image
                  src="/google.svg"
                  width={18}
                  height={18}
                  alt="Fazer login com a conta do Google"
                />
                Google
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      )}

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" asChild variant="ghost">
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
            asChild
          >
          <Link href={`/search?q=${encodeURIComponent(option.title)}`}>
            <Image
              src={option.imageUrl}
              width={18}
              height={18}
              alt="Botoes de serviços"
            />
            {option.title}
            </Link>
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-2 py-5">
        <Button variant="ghost" className="justify-start gap-2" onClick={handleLogoutClick}>
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SiderbarSheet
