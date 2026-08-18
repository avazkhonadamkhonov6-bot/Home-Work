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
import {  editAtom } from "./data.atom"

export function EditAtom({ open, setOpen,name,setName,age,setAge,status,setStatus,id }) {
    const [,editU]=useAtom(editAtom)

  function handleSubmit(e) {
    e.preventDefault()
    const upUser={
        id:id,
        name:name,
        status:status,
        age:age
    }
    editU(upUser)
    e.target.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={(e)=>handleSubmit(e)}>
          <DialogHeader>
            <DialogTitle>Edit  User</DialogTitle>
          </DialogHeader>

          <FieldGroup className="py-4 space-y-3">
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input value={name} onChange={(e)=> setName(e.target.value)} id="name" name="name" required />
            </Field>
            <Field>
              <Label htmlFor="age">Age</Label>
              <Input value={age} onChange={(e)=>setAge(e.target.value)} id="age" name="age" type="text" required />
            </Field>
              <Field>
                <select value={status} name="status" onChange={(e)=>setStatus(e.target.value)}>
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