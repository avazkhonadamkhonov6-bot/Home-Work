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
import { addUserAtom } from "./data.atom"

export function AddModal({ open, setOpen }) {
const [,addUser]=useAtom(addUserAtom)

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", e.target.name.value)
    formData.append("description", e.target.description.value)
    const files = e.target.image.files
    console.log(files);
    

    for (const file of files) {
      formData.append(`Images`,file)
    }
   addUser(formData)
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
              <Label htmlFor="image">Image / File</Label>
              <Input id="image" multiple name="image" type="file" />
            </Field>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required />
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" type="text" required />
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