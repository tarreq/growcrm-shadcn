"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { IconCircleCheckFilled, IconLoader, IconDotsVertical } from "@tabler/icons-react"

export type Client = {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string | null
    approved: boolean
}

export const columns: ColumnDef<Client>[] = [
    {

        id: "select",
        header: ({ table }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "firstName",
        header: "First Name",
        cell: ({ row }) => (
            <div className="flex h-8 items-center">
                {row.original.firstName}
            </div>
        ),
    },
    {
        accessorKey: "lastName",
        header: "Last Name",
        cell: ({ row }) => (
            <div className="flex h-8 items-center">
                {row.original.lastName}
            </div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <div className="flex h-8 items-center">
                {row.original.email}
            </div>
        ),
    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => (
            <div className="flex h-8 items-center">
                {row.original.phone}
            </div>
        ),
    },
    {
        accessorKey: "approved",
        header: "Status",
        cell: ({ row }) => (
            <div className="flex h-8 items-center">
                <Badge variant="outline" className="text-muted-foreground px-1.5">
                    {row.original.approved ? (
                        <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
                    ) : (
                        <IconLoader />
                    )}
                    {row.original.approved ? "Approved" : "Pending"}
                </Badge>
            </div>
        ),
    },
    {
        id: "actions",
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                        size="icon"
                    >
                        <IconDotsVertical />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Make a copy</DropdownMenuItem>
                    <DropdownMenuItem>Favorite</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
]
