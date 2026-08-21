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
import {   editUserAtom } from "./data.atom"
import { useFormik } from "formik";

export function EditAtom({ open, setOpen,user}) {
    const [,editU]=useAtom(editUserAtom)

 const { values, handleSubmit, handleChange, resetForm } = useFormik({
    initialValues: {
      name: user?.name,
      desc: user?.description,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
        editU({
          id: user?.id,
          name: values.name,
          description: values.desc,
        })
      
      resetForm()
      setOpen(false) 
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Profile / Task</DialogTitle>
          </DialogHeader>

          <FieldGroup className="py-4 space-y-3">
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={values.name}
                onChange={handleChange}
                name="name"
                required
              />
            </Field>
            <Field>
              <Label htmlFor="desc">Description</Label>
              <Input
                id="desc"
                value={values.desc}
                onChange={handleChange}
                name="desc"
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