"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { toast } from "sonner"
import { IconPlus } from "@tabler/icons-react"

export function AddEmployee() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)

        try {
            const { addEmployee } = await import("@/app/employees/actions")
            const result = await addEmployee(formData)

            setLoading(false)

            if (!result.success) {
                toast.error(result.error || "Failed to add employee")
            } else {
                toast.success("Employee added successfully")
                setOpen(false)
            }
        } catch (error) {
            setLoading(false)
            toast.error("Failed to add employee")
            console.error(error)
        }
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                    <IconPlus />
                    <span className="hidden lg:inline">Add Employee</span>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Add New Employee</SheetTitle>
                    <SheetDescription>
                        Add a new employee to your database.
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4 p-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                placeholder="Enter first name"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                placeholder="Enter last name"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter email"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="Enter phone number"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="approved" name="approved" />
                            <Label htmlFor="approved" className="cursor-pointer">
                                Approved
                            </Label>
                        </div>
                    </div>
                    <SheetFooter>
                        <Button
                            type="button"
                            className="w-full"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Adding..." : "Add Employee"}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}
