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
import { addUser } from "@/store/UsersSlice"
import { useDispatch } from "react-redux"

export function AddModal({ open, setOpen }) {
  const dispatch = useDispatch()

  function addUse(e) {
    e.preventDefault()
    const id = Date.now()
    dispatch(
      addUser({
        id: id,
        name: e.target.name.value,
        age: e.target.age.value,
        status:e.target.statu.value
      })
    )
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={addUse}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>

          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required />
            </Field>

            <Field>
              <Label htmlFor="age">Age</Label>
              <Input id="age" name="age" type="number" required />
            </Field>
            <Field>
              <Label htmlFor="statu">Status</Label>
              <select
                id="statu"
                name="statu"
                className="w-full rounded-md border p-2"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose >
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