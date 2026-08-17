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
import { postUser } from "@/store/UsersSlice"
import { useDispatch } from "react-redux"

export function AddModal({ open, setOpen }) {
  const dispatch = useDispatch()

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", e.target.name.value)
    formData.append("description", e.target.description.value)
    formData.append("isCompleted", e.target.statu.value === "true")
    if (e.target.image.files[0]) {
      formData.append("images", e.target.image.files[0])
    }
    dispatch(postUser(formData))
    e.target.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Task / User</DialogTitle>
          </DialogHeader>

          <FieldGroup className="py-4 space-y-3">
            <Field>
              <Label htmlFor="image">Image / File</Label>
              <Input id="image" name="image" type="file" />
            </Field>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required />
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" type="text" required />
            </Field>
            <Field>
              <Label htmlFor="statu">Status</Label>
              <select
                id="statu"
                name="statu"
                className="w-full rounded-md border p-2 text-sm bg-background"
              >
                <option value="false">Active (Incomplete)</option>
                <option value="true">Completed</option>
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