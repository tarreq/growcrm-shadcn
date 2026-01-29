import { AppSidebar } from "@/components/app-sidebar"
import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { columns } from "./columns"
import { AddEmployee } from "@/components/AddEmployee"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Page() {
    const supabase = await createServerSupabaseClient()
    const { data: employees } = await supabase.from("employees").select("*")

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <DataTable data={employees || []} columns={columns} addButton={<AddEmployee />} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
