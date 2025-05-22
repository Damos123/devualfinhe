"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  longDescription: string
  image: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
}

export function ProjectCard({
  title,
  description,
  longDescription,
  image,
  tags,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-lg border bg-background overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-2 h-full flex flex-col">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
          priority
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-muted-foreground mb-4">{description}</p>

        {expanded && (
          <div className="mt-4 text-sm text-muted-foreground">
            <p>{longDescription}</p>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="text-xs flex items-center gap-1"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Menos detalhes
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Mais detalhes
              </>
            )}
          </Button>

          <div className="flex gap-2">
            {githubUrl && (
              <Button variant="outline" size="icon" asChild>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
            )}
            {liveUrl && (
              <Button variant="outline" size="icon" asChild>
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">Ver projeto</span>
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
