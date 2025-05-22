"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useEffect } from "react"
import { TikTokIcon } from "@/components/tiktok-icon"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

// Links de redes sociais
const socialLinks = {
  facebook: "https://facebook.com/ualfinhe",
  twitter: "https://twitter.com/ualfinhe",
  instagram: "https://instagram.com/ualfinhe",
  linkedin: "https://linkedin.com/in/ualfinhe",
  tiktok: "https://tiktok.com/@ualfinhe",
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Impedir rolagem do body quando o menu estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-y-auto">
      <div className="container flex h-16 items-center justify-between">
        <div></div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
          <span className="sr-only">Fechar menu</span>
        </Button>
      </div>
      <nav className="container grid gap-6 py-6">
        {/* Adicionar efeito de flutuação aos links do menu mobile */}
        <Link
          href="#features"
          className="text-lg font-medium hover:underline underline-offset-4 transition-transform duration-300 hover:-translate-y-1"
          onClick={onClose}
        >
          Recursos
        </Link>
        <Link
          href="#projects"
          className="text-lg font-medium hover:underline underline-offset-4 transition-transform duration-300 hover:-translate-y-1"
          onClick={onClose}
        >
          Projetos
        </Link>
        <Link
          href="#study-plan"
          className="text-lg font-medium hover:underline underline-offset-4 transition-transform duration-300 hover:-translate-y-1"
          onClick={onClose}
        >
          Plano de Estudos
        </Link>
        <Link
          href="#testimonials"
          className="text-lg font-medium hover:underline underline-offset-4 transition-transform duration-300 hover:-translate-y-1"
          onClick={onClose}
        >
          Depoimentos
        </Link>
        <Link
          href="#pricing"
          className="text-lg font-medium hover:underline underline-offset-4 transition-transform duration-300 hover:-translate-y-1"
          onClick={onClose}
        >
          Serviços
        </Link>
        <Link
          href="#contact"
          className="text-lg font-medium hover:underline underline-offset-4 transition-transform duration-300 hover:-translate-y-1"
          onClick={onClose}
        >
          Contato
        </Link>
        <Button asChild className="mt-4 h-[50px] text-lg transition-transform duration-300 hover:-translate-y-1">
          <Link href="#project-form" onClick={onClose}>
            Iniciar Projeto
          </Link>
        </Button>

        {/* Redes sociais no menu mobile */}
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-lg font-medium mb-4">Siga-me nas redes sociais</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="sr-only">Facebook</span>
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="sr-only">Instagram</span>
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href={socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="sr-only">TikTok</span>
              <TikTokIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
