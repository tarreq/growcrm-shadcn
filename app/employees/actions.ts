"use server"

import { revalidatePath } from "next/cache"
import { createServerSupabaseClient } from "@/lib/supabase-server"

export async function addEmployee(formData: FormData) {
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const approved = formData.get("approved") === "on"

    const supabase = await createServerSupabaseClient()
    const { error } = await supabase.from("employees").insert({
        firstName,
        lastName,
        email,
        phone: phone || null,
        approved,
    }).select()

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath("/employees")
    return { success: true }
}
