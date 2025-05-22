import { NextResponse } from "next/server"
import { saveProjectForm } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    // Validação básica
    if (!formData.name || !formData.email || !formData.projectType || !formData.description) {
      return NextResponse.json({ error: "Campos obrigatórios não preenchidos" }, { status: 400 })
    }

    // Salvar no Supabase
    const data = await saveProjectForm(formData)

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error processing form submission:", error)
    return NextResponse.json({ error: "Erro ao processar o formulário" }, { status: 500 })
  }
}
