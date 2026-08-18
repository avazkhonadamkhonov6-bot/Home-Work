import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAtom } from "jotai"
import { addUAtom } from "./data.atom"

export function AddAtom({ open, setOpen }) {
    const [,AddU]=useAtom(addUAtom)

  function handleSubmit(e) {
    e.preventDefault()
    const newUser={
        id:Date.now(),
        name:e.target.name.value,
        status:e.target.status.value,
        age:e.target.age.value
    }
    AddU(newUser)
    e.target.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={(e)=>handleSubmit(e)}>
          <DialogHeader>
            <DialogTitle>Add New Task / User</DialogTitle>
          </DialogHeader>

          <FieldGroup className="py-4 space-y-3">
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required />
            </Field>
            <Field>
              <Label htmlFor="age">Age</Label>
              <Input id="age" name="age" type="text" required />
            </Field>
              <Field>
                <select name="status">
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>
              </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}