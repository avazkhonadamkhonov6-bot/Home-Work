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

export function DialogDemo({
  open,
  nameE,
  setOpen,
  setName,
  edit,
  age,
  setAge,
  idx,
}) {
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
                value={nameE}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>

            <Field>
              <Label htmlFor="Age">User Age</Label>
              <Input
                id="Age"
                name="Age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose
              render={
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              }
            />

            <Button
              onClick={() => {
                edit(idx, nameE, age)
                setOpen(false)
              }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}