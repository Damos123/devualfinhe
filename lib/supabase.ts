import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface ProjectFormData {
  name: string
  email: string
  projectType: string
  description: string
  budget: string
  deadline: string
  createdAt: string
}

export async function saveProjectForm(formData: Omit<ProjectFormData, "createdAt">) {
  const { data, error } = await supabase
    .from("project_forms")
    .insert([
      {
        ...formData,
        createdAt: new Date().toISOString(),
      },
    ])
    .select()

  if (error) {
    console.error("Error saving form data:", error)
    throw error
  }

  return data
}
