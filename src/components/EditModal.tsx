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
import { useDispatch } from "react-redux"
import { editUser } from "@/store/UsersSlice"

export function EditModal({
  open,
  setOpen,
  id,
  name,
  setName,
  age,
  setAge
}) {
  const dispatch = useDispatch()

  function handleEdit(e) {
    e.preventDefault()
    dispatch(
      editUser({
        id: id,
        name: name,
        description: age,
      })
    )

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleEdit}>
          <DialogHeader>
            <DialogTitle>Edit Profile / Task</DialogTitle>
          </DialogHeader>

          <FieldGroup className="py-4 space-y-3">
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                required
              />
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                name="description"
                type="text"
                required
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
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