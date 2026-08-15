import { Button } from "@/components/ui/button"
import {
  Dialog,
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

export function EditModal({ open, setOpen,name,setName,age,setAge,status,setStatus,id }) {
  const dispatch = useDispatch()  
    
  function addUse(e) {
    e.preventDefault()
  
    dispatch(
      editUser({
        id: id,
        name: name,
        age: age,
        status:status
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
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
              />
            </Field>

            <Field>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                name="age"
                type="text"
                required
              />
            </Field>
            <Field>
              <Label htmlFor="statu">Status</Label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                id="statu"
                name="statu"
                className="w-full rounded-md border p-2 bg-background"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </Field>
          </FieldGroup>

          <DialogFooter>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}