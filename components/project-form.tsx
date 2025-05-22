"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle2, X } from "lucide-react"

export function ProjectForm() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    description: "",
    budget: "",
    deadline: "",
  })

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")

    try {
      const response = await fetch("/api/project-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erro ao enviar o formulário")
      }

      // Sucesso
      setFormState("success")

      // Resetar o formulário após 3 segundos
      setTimeout(() => {
        setFormState("idle")
        setFormData({
          name: "",
          email: "",
          projectType: "",
          description: "",
          budget: "",
          deadline: "",
        })
      }, 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormState("error")

      // Voltar para o estado inicial após 3 segundos
      setTimeout(() => {
        setFormState("idle")
      }, 3000)
    }
  }

  if (formState === "success") {
    return (
      <div className="rounded-lg border bg-background p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-xl font-bold mb-2">Proposta Enviada!</h3>
        <p className="text-muted-foreground">
          Obrigado pelo seu interesse! Entrarei em contato em breve para discutirmos seu projeto.
        </p>
      </div>
    )
  }

  if (formState === "error") {
    return (
      <div className="rounded-lg border bg-background p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
          <X className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="text-xl font-bold mb-2">Erro ao Enviar</h3>
        <p className="text-muted-foreground">
          Ocorreu um erro ao enviar sua proposta. Por favor, tente novamente mais tarde.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            name="name"
            placeholder="Seu nome completo"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="seu.email@exemplo.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectType">Tipo de Projeto</Label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        >
          <option value="">Selecione o tipo de projeto</option>
          <option value="website">Website</option>
          <option value="app">Aplicativo Mobile</option>
          <option value="desktop">Software Desktop</option>
          <option value="ai">Inteligência Artificial</option>
          <option value="other">Outro</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição do Projeto</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Descreva seu projeto, objetivos e funcionalidades desejadas..."
          value={formData.description}
          onChange={handleChange}
          className="min-h-[120px]"
          required
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="budget">Orçamento Estimado (R$)</Label>
          <Input
            id="budget"
            name="budget"
            type="text"
            placeholder="Ex: 5.000"
            value={formData.budget}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deadline">Prazo Desejado</Label>
          <Input id="deadline" name="deadline" type="date" value={formData.deadline} onChange={handleChange} />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={formState === "submitting"}>
        {formState === "submitting" ? "Enviando..." : "Enviar Proposta"}
      </Button>
    </form>
  )
}
