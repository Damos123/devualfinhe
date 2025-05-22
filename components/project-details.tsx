import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ProjectGallery } from "@/components/project-gallery"
import { Github, ExternalLink } from "lucide-react"

interface ProjectDetailsProps {
  title: string
  description: string
  longDescription: string
  technologies: string[]
  features: string[]
  images: { src: string; alt: string }[]
  githubUrl?: string
  liveUrl?: string
}

export function ProjectDetails({
  title,
  description,
  longDescription,
  technologies,
  features,
  images,
  githubUrl,
  liveUrl,
}: ProjectDetailsProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="relative aspect-video overflow-hidden rounded-lg">
        <Image src={images[0].src || "/placeholder.svg"} alt={images[0].alt} fill className="object-cover" priority />
      </div>

      <div className="space-y-4">
        <h4 className="text-xl font-semibold">Sobre o Projeto</h4>
        <p className="text-muted-foreground">{longDescription}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h4 className="text-xl font-semibold">Tecnologias Utilizadas</h4>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            {technologies.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="text-xl font-semibold">Funcionalidades</h4>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xl font-semibold">Galeria de Imagens</h4>
        <ProjectGallery images={images} title={title} description={description} />
      </div>

      <div className="flex flex-wrap gap-4">
        {githubUrl && (
          <Button asChild>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              Ver Código no GitHub
            </a>
          </Button>
        )}
        {liveUrl && (
          <Button variant="outline" asChild>
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Ver Demonstração
            </a>
          </Button>
        )}
      </div>
    </div>
  )
}
