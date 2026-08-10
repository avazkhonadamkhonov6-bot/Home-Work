import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogDemo(props) {
    let {open,setOpen,name,setName,editId,email,setEmail,phone,setPhone,editUser,status}=props
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input 
                id="name-1" 
                name="name" 
                defaultValue={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </Field>
            <Field>
              <Label htmlFor="username-1">Username</Label>
              <Input 
                id="username-1" 
                name="username" 
                defaultValue={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </Field>
             <Field>
              <Label htmlFor="username-1">Username</Label>
              <Input 
                id="username-1" 
                name="username" 
                defaultValue={phone} 
                onChange={(e) => setPhone(e.target.value)} 
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit" onClick={(e) => {
              e.preventDefault();
              editUser(editId, { name: name, email: email, phone: phone });
              setOpen(false);
            }}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
