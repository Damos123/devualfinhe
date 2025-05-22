"use client"

import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  CheckCircle2,
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  Twitter,
  Clock,
  BookOpen,
  Lightbulb,
  Target,
  Calendar,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Github,
} from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"
import { Reveal } from "@/components/reveal-animation"
import { ProjectCard } from "@/components/project-card"
import { ProjectForm } from "@/components/project-form"
import { ProjectGallery } from "@/components/project-gallery"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TikTokIcon } from "@/components/tiktok-icon"
import { ResponsiveTable } from "@/components/responsive-table"

// Importar GSAP
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Dados dos projetos
const projectsData = [
  {
    id: "academic-system",
    title: "Sistema de Gestão Acadêmica",
    description: "Plataforma web para gerenciamento de alunos, professores e disciplinas.",
    longDescription:
      "Sistema completo desenvolvido com React, Node.js e MongoDB que permite o gerenciamento de matrículas, notas, frequência e comunicação entre alunos e professores. Implementa autenticação JWT, dashboard analítico e geração de relatórios em PDF.",
    image: "/images/project1.png",
    tags: ["React", "Node.js", "MongoDB", "JWT"],
    githubUrl: "https://github.com/ualfinhe/academic-system",
    liveUrl: "https://academic-system-demo.vercel.app",
    images: [
      { src: "/images/project1.png", alt: "Tela principal do sistema acadêmico" },
      { src: "/images/project1-detail1.png", alt: "Dashboard de notas" },
      { src: "/images/project1-detail2.png", alt: "Gerenciamento de alunos" },
    ],
    technologies: [
      "React com Hooks e Context API",
      "Node.js com Express",
      "MongoDB com Mongoose",
      "Autenticação JWT",
      "Recharts para visualização de dados",
      "Material-UI para interface",
    ],
    features: [
      "Gerenciamento de alunos, professores e disciplinas",
      "Sistema de notas e frequência",
      "Dashboard analítico com gráficos",
      "Geração de relatórios em PDF",
      "Sistema de mensagens entre usuários",
      "Controle de acesso baseado em perfis",
    ],
  },
  {
    id: "image-recognition",
    title: "App de Reconhecimento de Imagens",
    description: "Aplicativo mobile que identifica objetos em tempo real usando IA.",
    longDescription:
      "Aplicativo desenvolvido com React Native e TensorFlow.js que utiliza a câmera do dispositivo para identificar objetos em tempo real. O modelo de IA foi treinado com mais de 10.000 imagens e consegue identificar mais de 100 objetos diferentes com precisão superior a 90%.",
    image: "/images/project2.png",
    tags: ["React Native", "TensorFlow", "AI", "Mobile"],
    githubUrl: "https://github.com/ualfinhe/image-recognition",
    images: [
      { src: "/images/project2.png", alt: "Tela principal do app de reconhecimento" },
      { src: "/images/project2-detail1.png", alt: "Reconhecimento de objetos" },
      { src: "/images/project2-detail2.png", alt: "Histórico de reconhecimentos" },
    ],
    technologies: [
      "React Native",
      "Expo",
      "TensorFlow.js",
      "MobileNet para classificação de imagens",
      "AsyncStorage para persistência local",
      "React Navigation",
    ],
    features: [
      "Reconhecimento de objetos em tempo real",
      "Mais de 100 categorias de objetos",
      "Funciona offline após download inicial",
      "Histórico de reconhecimentos",
      "Compartilhamento de resultados",
      "Modo de baixo consumo de bateria",
    ],
  },
  {
    id: "data-dashboard",
    title: "Dashboard de Análise de Dados",
    description: "Painel interativo para visualização e análise de grandes conjuntos de dados.",
    longDescription:
      "Dashboard desenvolvido com D3.js e Vue.js que permite a visualização interativa de dados em tempo real. Implementa gráficos dinâmicos, filtros avançados e exportação de relatórios. Integrado com API RESTful para obtenção de dados de diferentes fontes.",
    image: "/images/project3.png",
    tags: ["Vue.js", "D3.js", "Data Analysis", "REST API"],
    githubUrl: "https://github.com/ualfinhe/data-dashboard",
    liveUrl: "https://data-dashboard-demo.vercel.app",
    images: [
      { src: "/images/project3.png", alt: "Dashboard principal" },
      { src: "/images/project3-detail1.png", alt: "Gráficos interativos" },
      { src: "/images/project3-detail2.png", alt: "Filtros avançados" },
    ],
    technologies: [
      "Vue.js 3 com Composition API",
      "D3.js para visualizações",
      "Pinia para gerenciamento de estado",
      "Axios para requisições HTTP",
      "Tailwind CSS para estilização",
      "Vite como bundler",
    ],
    features: [
      "Visualizações interativas em tempo real",
      "Filtros avançados por múltiplos parâmetros",
      "Exportação de dados em CSV, Excel e PDF",
      "Temas claro e escuro",
      "Responsivo para desktop e tablet",
      "Suporte a múltiplas fontes de dados",
    ],
  },
]

// Links de redes sociais
const socialLinks = {
  facebook: "https://facebook.com/ualfinhe",
  twitter: "https://twitter.com/ualfinhe",
  instagram: "https://instagram.com/ualfinhe",
  linkedin: "https://linkedin.com/in/ualfinhe",
  tiktok: "https://tiktok.com/@ualfinhe",
}

const weeklyScheduleData = [
  {
    day: "Segunda",
    focus: "Algoritmos e Estruturas de Dados",
    time: "2h",
    goal: "Resolver 3 problemas de complexidade média",
  },
  {
    day: "Terça",
    focus: "Desenvolvimento Web Frontend",
    time: "2h",
    goal: "Praticar React e aprender novos hooks",
  },
  {
    day: "Quarta",
    focus: "Banco de Dados",
    time: "2h",
    goal: "Otimização de consultas SQL",
  },
  {
    day: "Quinta",
    focus: "Backend e APIs",
    time: "2h",
    goal: "Desenvolver endpoints RESTful",
  },
  {
    day: "Sexta",
    focus: "Inteligência Artificial",
    time: "2h",
    goal: "Implementar algoritmos de ML",
  },
  {
    day: "Sábado",
    focus: "Projeto Pessoal",
    time: "4-6h",
    goal: "Desenvolvimento de aplicação completa",
  },
  {
    day: "Domingo",
    focus: "Revisão e Planejamento",
    time: "2h",
    goal: "Avaliar progresso e definir próximos passos",
  },
]

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  // Inicializar GSAP
  useEffect(() => {
    // Registrar ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)

    // Animação do header quando a página é carregada
    gsap.from("header", {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })

    // Animação do hero quando a página é carregada
    gsap.from(".hero-content", {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    })

    // Animação da imagem do hero
    gsap.from(".hero-image", {
      opacity: 0,
      x: 50,
      duration: 1,
      delay: 0.8,
      ease: "power3.out",
    })
  }, [])

  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Ualfinhe Logo"
              width={32}
              height={32}
              className="rounded-full object-cover"
              priority
            />
            <span className="text-xl font-bold">Ualfinhe</span>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Alternar menu</span>
          </Button>

          {/* Mobile Menu */}
          <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:underline underline-offset-4 transition-transform duration-300 hover:-translate-y-1"
            >
              Recursos
            </Link>
            <Link
              href="#projects"
              className="text-sm font-medium hover:underline underline-offset-4 transition-transform duration-300 hover:-translate-y-1"
            >
              Projetos
            </Link>
            <Link
              href="#study-plan"
              className="text-sm font-medium hover:underline underline-offset-4 transition-transform duration-300 hover:-translate-y-1"
            >
              Plano de Estudos
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:underline underline-offset-4 transition-transform duration-300 hover:-translate-y-1"
            >
              Depoimentos
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:underline underline-offset-4 transition-transform duration-300 hover:-translate-y-1"
            >
              Serviços
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:underline underline-offset-4 transition-transform duration-300 hover:-translate-y-1"
            >
              Contato
            </Link>
            <Button asChild className="btn-special">
              <Link href="#project-form">Iniciar Projeto</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 hero-content">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Ciência da Computação com Inovação
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Soluções tecnológicas e projetos acadêmicos desenvolvidos com paixão pela computação e inovação.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="btn-special text-lg">
                    <Link href="#projects">
                      Conhecer Projetos
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="btn-special text-lg">
                    <Link href="#study-plan">Ver Plano de Estudos</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="/images/hero-image.png"
                width={550}
                height={550}
                alt="Imagem Principal"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square hero-image"
                priority
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <Reveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Áreas de Conhecimento</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Explorando diversas áreas da Ciência da Computação com foco em soluções inovadoras.
                  </p>
                </div>
              </div>
            </Reveal>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <Reveal direction="left" delay={0.2}>
                <div className="flex flex-col justify-center space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Desenvolvimento Web</h3>
                    <p className="text-muted-foreground">
                      Criação de sites e aplicações web modernas utilizando as tecnologias mais recentes do mercado.
                    </p>
                  </div>
                </div>
              </Reveal>
              <Reveal direction="up" delay={0.4}>
                <div className="flex flex-col justify-center space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Inteligência Artificial</h3>
                    <p className="text-muted-foreground">
                      Pesquisa e implementação de algoritmos de IA para resolver problemas complexos e automatizar
                      tarefas.
                    </p>
                  </div>
                </div>
              </Reveal>
              <Reveal direction="right" delay={0.6}>
                <div className="flex flex-col justify-center space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Análise de Dados</h3>
                    <p className="text-muted-foreground">
                      Extração de insights valiosos a partir de grandes conjuntos de dados utilizando técnicas
                      avançadas.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Reveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Projetos de Software</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Conheça alguns dos meus projetos desenvolvidos durante a graduação e em trabalhos freelance.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="mx-auto max-w-5xl py-12">
              <Tabs defaultValue="grid" className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList>
                    <TabsTrigger value="grid">Galeria</TabsTrigger>
                    <TabsTrigger value="details">Detalhes</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="grid" className="space-y-8">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projectsData.map((project, index) => (
                      <Reveal key={project.id} direction="up" delay={0.2 * (index + 1)}>
                        <ProjectCard
                          title={project.title}
                          description={project.description}
                          longDescription={project.longDescription}
                          image={project.image}
                          tags={project.tags}
                          githubUrl={project.githubUrl}
                          liveUrl={project.liveUrl}
                        />
                      </Reveal>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-8">
                  <div className="grid gap-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {projectsData.map((project) => (
                        <Button
                          key={project.id}
                          variant={selectedProject === project.id ? "default" : "outline"}
                          onClick={() => setSelectedProject(project.id)}
                          className="mb-2"
                        >
                          {project.title}
                        </Button>
                      ))}
                    </div>

                    {selectedProject ? (
                      <div className="mt-8">
                        {projectsData
                          .filter((p) => p.id === selectedProject)
                          .map((project) => (
                            <Reveal key={project.id}>
                              <div className="rounded-lg border bg-background p-6 shadow-sm">
                                <div className="space-y-8">
                                  <div className="space-y-4">
                                    <h3 className="text-2xl font-bold">{project.title}</h3>
                                    <p className="text-muted-foreground">{project.description}</p>
                                  </div>

                                  <div className="grid gap-6 md:grid-cols-2">
                                    <div className="relative aspect-video overflow-hidden rounded-lg">
                                      <Image
                                        src={project.image || "/placeholder.svg"}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover"
                                      />
                                    </div>
                                    <div className="space-y-4">
                                      <h4 className="text-xl font-semibold">Sobre o Projeto</h4>
                                      <p className="text-muted-foreground">{project.longDescription}</p>
                                      <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                          <span
                                            key={tag}
                                            className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                                          >
                                            {tag}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                      <h4 className="text-xl font-semibold">Tecnologias Utilizadas</h4>
                                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                        {project.technologies.map((tech, index) => (
                                          <li key={index}>{tech}</li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div className="space-y-4">
                                      <h4 className="text-xl font-semibold">Funcionalidades</h4>
                                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                        {project.features.map((feature, index) => (
                                          <li key={index}>{feature}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <h4 className="text-xl font-semibold">Galeria de Imagens</h4>
                                    <ProjectGallery
                                      images={project.images}
                                      title={project.title}
                                      description={project.description}
                                    />
                                  </div>

                                  <div className="flex flex-wrap gap-4">
                                    {project.githubUrl && (
                                      <Button asChild className="btn-special">
                                        <a
                                          href={project.githubUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center gap-2"
                                        >
                                          <Github className="h-4 w-4" />
                                          Ver Código no GitHub
                                        </a>
                                      </Button>
                                    )}
                                    {project.liveUrl && (
                                      <Button variant="outline" asChild className="btn-special">
                                        <a
                                          href={project.liveUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center gap-2"
                                        >
                                          <ExternalLink className="h-4 w-4" />
                                          Ver Demonstração
                                        </a>
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </Reveal>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">Selecione um projeto para ver mais detalhes.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Study Plan Section */}
        <section id="study-plan" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <Reveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Meu Plano de Estudos</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Como organizo meu tempo livre para evoluir constantemente na área de Ciência da Computação.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:gap-12">
              {/* Left column - Study Plan */}
              <div className="space-y-8">
                <Reveal direction="left" delay={0.2}>
                  <div className="rounded-lg border p-6 shadow-sm bg-background">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Clock className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-bold">Gerenciamento de Tempo</h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>2 horas diárias dedicadas a estudos técnicos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Técnica Pomodoro: 25 minutos de foco, 5 de descanso</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Fins de semana: projetos práticos de 4-6 horas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Revisão semanal de progresso aos domingos</span>
                      </li>
                    </ul>
                  </div>
                </Reveal>

                <Reveal direction="left" delay={0.4}>
                  <div className="rounded-lg border p-6 shadow-sm bg-background">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-bold">Recursos de Aprendizado</h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Cursos online: Coursera, Udemy, edX</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Documentação oficial de tecnologias</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Livros técnicos e artigos científicos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Comunidades: GitHub, Stack Overflow, Reddit</span>
                      </li>
                    </ul>
                  </div>
                </Reveal>
              </div>

              {/* Right column - Evolution Strategy */}
              <div className="space-y-8">
                <Reveal direction="right" delay={0.2}>
                  <div className="rounded-lg border p-6 shadow-sm bg-background">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Lightbulb className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-bold">Estratégia de Evolução</h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Aprender fazendo: aplicar conhecimento em projetos reais</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Contribuir para projetos open source</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Participar de hackathons e competições de programação</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Ensinar outros: blog, tutoriais, mentorias</span>
                      </li>
                    </ul>
                  </div>
                </Reveal>

                <Reveal direction="right" delay={0.4}>
                  <div className="rounded-lg border p-6 shadow-sm bg-background">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Target className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-bold">Metas e Acompanhamento</h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Metas trimestrais para dominar novas tecnologias</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Diário de aprendizado para registrar progresso</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Feedback de colegas e mentores</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Portfólio atualizado com projetos concluídos</span>
                      </li>
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Weekly Schedule */}
            <Reveal direction="up" delay={0.6}>
              <div className="mx-auto max-w-5xl mt-8">
                <div className="rounded-lg border p-6 shadow-sm bg-background">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold">Cronograma Semanal de Estudos</h3>
                  </div>
                  <ResponsiveTable data={weeklyScheduleData} />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Reveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Depoimentos</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    O que professores e colegas dizem sobre meus projetos e colaborações.
                  </p>
                </div>
              </div>
            </Reveal>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:gap-12">
              <Reveal direction="left" delay={0.2}>
                <div className="flex flex-col justify-between rounded-lg border p-6 shadow-sm bg-background">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      "Os projetos desenvolvidos demonstram um profundo conhecimento técnico e uma capacidade
                      excepcional de resolver problemas complexos de forma criativa."
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pt-4">
                    <Image
                      src="/images/avatar-sarah.png"
                      width={40}
                      height={40}
                      alt="Profa. Ana Silva"
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">Profa. Ana Silva</p>
                      <p className="text-xs text-muted-foreground">Departamento de Ciência da Computação</p>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal direction="right" delay={0.4}>
                <div className="flex flex-col justify-between rounded-lg border p-6 shadow-sm bg-background">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      "A dedicação e o conhecimento técnico demonstrados nos trabalhos em grupo são impressionantes. Um
                      colega que sempre contribui com ideias inovadoras."
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pt-4">
                    <Image
                      src="/images/avatar-michael.png"
                      width={40}
                      height={40}
                      alt="Carlos Mendes"
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">Carlos Mendes</p>
                      <p className="text-xs text-muted-foreground">Colega de Curso</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <Reveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Serviços Oferecidos</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Soluções personalizadas para atender às suas necessidades tecnológicas.
                  </p>
                </div>
              </div>
            </Reveal>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {/* Básico */}
              <Reveal direction="up" delay={0.2}>
                <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm h-full">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Básico</h3>
                    <p className="text-muted-foreground">Ideal para pequenos projetos e startups.</p>
                  </div>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-bold">R$150</span>
                    <span className="ml-1 text-muted-foreground">/hora</span>
                  </div>
                  <ul className="mt-6 space-y-2 flex-1">
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                      <span>Consultoria técnica</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                      <span>Desenvolvimento básico</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                      <span>Suporte por e-mail</span>
                    </li>
                  </ul>
                  <Button className="mt-8 btn-special" variant="outline">
                    <Link href="#project-form">Contratar</Link>
                  </Button>
                </div>
              </Reveal>

              {/* Avançado */}
              <Reveal direction="up" delay={0.4}>
                <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm ring-2 ring-primary h-full">
                  <div className="space-y-2">
                    <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      Mais Popular
                    </div>
                    <h3 className="text-2xl font-bold">Avançado</h3>
                    <p className="text-muted-foreground">Para projetos de médio porte com necessidades específicas.</p>
                  </div>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-bold">R$250</span>
                    <span className="ml-1 text-muted-foreground">/hora</span>
                  </div>
                  <ul className="mt-6 space-y-2 flex-1">
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                      <span>Desenvolvimento completo</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                      <span>Análise de requisitos</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                      <span>Documentação detalhada</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                      <span>Suporte prioritário</span>
                    </li>
                  </ul>
                  <Button className="mt-8 btn-special">
                    <Link href="#project-form">Contratar</Link>
                  </Button>
                </div>
              </Reveal>

              {/* Premium */}
              <Reveal direction="up" delay={0.6}>
                <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm h-full">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Premium</h3>
                    <p className="text-muted-foreground">Para projetos complexos e de grande escala.</p>
                  </div>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-bold">R$400</span>
                    <span className="ml-1 text-muted-foreground">/hora</span>
                  </div>
                  <ul className="mt-6 space-y-2 flex-1">
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                      <span>Solução completa personalizada</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                      <span>Arquitetura avançada</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                      <span>Análise de desempenho</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                      <span>Consultoria estratégica</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                      <span>Suporte 24/7</span>
                    </li>
                  </ul>
                  <Button className="mt-8 btn-special" variant="outline">
                    <Link href="#project-form">Contato</Link>
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Project Form Section */}
        <section id="project-form" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Reveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Iniciar um Projeto</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Preencha o formulário abaixo com detalhes do seu projeto e entrarei em contato em breve.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="mx-auto grid max-w-3xl gap-6 py-12">
              <Reveal direction="up" delay={0.2}>
                <div className="rounded-lg border p-6 shadow-sm bg-background">
                  <ProjectForm />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <Reveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Entre em Contato</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Tem um projeto em mente ou quer discutir uma colaboração? Envie uma mensagem!
                  </p>
                </div>
              </div>
            </Reveal>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2">
              <Reveal direction="left" delay={0.2}>
                <div className="rounded-lg border p-6 shadow-sm bg-background">
                  <h3 className="text-xl font-bold mb-4">Informações de Contato</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">contato@ualfinhe.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Telefone</p>
                        <p className="text-sm text-muted-foreground">(11) 98765-4321</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Localização</p>
                        <p className="text-sm text-muted-foreground">São Paulo, SP - Brasil</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Horário de Atendimento</p>
                        <p className="text-sm text-muted-foreground">Segunda a Sexta, 9h às 18h</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal direction="right" delay={0.4}>
                <div className="rounded-lg border p-6 shadow-sm bg-background">
                  <form className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input id="name" placeholder="Seu nome" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="seu.email@exemplo.com" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="message">Mensagem</Label>
                      <Textarea
                        id="message"
                        className="min-h-[120px]"
                        placeholder="Descreva seu projeto ou dúvida..."
                        required
                      />
                    </div>
                    <Button type="submit" className="btn-special">
                      Enviar Mensagem
                    </Button>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section id="get-started" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Reveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Pronto para Transformar suas Ideias em Realidade?
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Entre em contato para discutirmos como posso ajudar no seu próximo projeto tecnológico.
                  </p>
                </div>
                <div className="mx-auto w-full max-w-sm space-y-2">
                  <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                    <Button size="lg" className="btn-special text-lg">
                      <Link href="#project-form">Iniciar Projeto</Link>
                    </Button>
                    <Button variant="outline" size="lg" className="btn-special text-lg">
                      <Link href="#projects">Ver Projetos</Link>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Primeira consulta gratuita de 30 minutos.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/logo.png"
                  alt="Ualfinhe Logo"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                  priority
                />
                <span className="text-xl font-bold">Ualfinhe</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Estudante de Ciência da Computação apaixonado por tecnologia e inovação.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Navegação</h3>
              <nav className="flex flex-col space-y-2">
                <Link
                  href="#features"
                  className="text-sm text-muted-foreground hover:underline transition-transform duration-300 hover:-translate-y-1"
                >
                  Recursos
                </Link>
                <Link
                  href="#projects"
                  className="text-sm text-muted-foreground hover:underline transition-transform duration-300 hover:-translate-y-1"
                >
                  Projetos
                </Link>
                <Link
                  href="#study-plan"
                  className="text-sm text-muted-foreground hover:underline transition-transform duration-300 hover:-translate-y-1"
                >
                  Plano de Estudos
                </Link>
                <Link
                  href="#testimonials"
                  className="text-sm text-muted-foreground hover:underline transition-transform duration-300 hover:-translate-y-1"
                >
                  Depoimentos
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Sobre</h3>
              <nav className="flex flex-col space-y-2">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:underline transition-transform duration-300 hover:-translate-y-1"
                >
                  Formação
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:underline transition-transform duration-300 hover:-translate-y-1"
                >
                  Blog
                </Link>
                <Link
                  href="#projects"
                  className="text-sm text-muted-foreground hover:underline transition-transform duration-300 hover:-translate-y-1"
                >
                  Projetos
                </Link>
                <Link
                  href="#contact"
                  className="text-sm text-muted-foreground hover:underline transition-transform duration-300 hover:-translate-y-1"
                >
                  Contato
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Social</h3>
              <nav className="flex flex-col space-y-2">
                <Link
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:underline flex items-center gap-2 transition-transform duration-300 hover:-translate-y-1"
                >
                  <Facebook className="h-4 w-4" />
                  <span>Facebook</span>
                </Link>
                <Link
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:underline flex items-center gap-2 transition-transform duration-300 hover:-translate-y-1"
                >
                  <Twitter className="h-4 w-4" />
                  <span>Twitter</span>
                </Link>
                <Link
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:underline flex items-center gap-2 transition-transform duration-300 hover:-translate-y-1"
                >
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </Link>
                <Link
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:underline flex items-center gap-2 transition-transform duration-300 hover:-translate-y-1"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </Link>
                <Link
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:underline flex items-center gap-2 transition-transform duration-300 hover:-translate-y-1"
                >
                  <TikTokIcon className="h-4 w-4" />
                  <span>TikTok</span>
                </Link>
              </nav>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-center">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Ualfinhe. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
