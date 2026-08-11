import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function EditUser(props) {
    let {open,setOpen,name,setName,idx,phone,setPhone,editUser}=props
  return (
    <Dialog open={open}>
      <form>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" defaultValue={name} onChange={(e)=>setName(e.target.value)} />
            </Field>
            <Field>
              <Label htmlFor="username-1">Phone</Label>
              <Input id="username-1"  defaultValue={phone} onChange={(e)=>setPhone(e.target.value)} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button onClick={()=>setOpen(false)} variant="outline">Cancel</Button>} />
<Button 
  type="submit" 
  onClick={(e) => {
    e.preventDefault()
   editUser({ id: idx, name, phone })
    setOpen(false)
    setName('')
    setPhone('')
  }}
>
  Save changes
</Button>          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
