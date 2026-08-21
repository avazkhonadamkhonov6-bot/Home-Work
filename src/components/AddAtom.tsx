import { useDispatch } from "react-redux"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Field, FieldGroup } from "./ui/field"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useFormik } from "formik"
import { useAtom } from "jotai"
import { addUserAtom } from "./data.atom"

export function AddAtom({ open, setOpen }) {
  const [,addUser] = useAtom(addUserAtom)

  const { values, handleSubmit, handleChange, setFieldValue, resetForm } = useFormik({
    initialValues: {
      name: '',
      desc: '',
      img: [],
    },
    onSubmit: (values) => {
      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('description', values.desc)
      for (const file of values.img) {
        formData.append('images', file)
      }

      addUser(formData)
      resetForm()
      setOpen(false) 
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
          </DialogHeader>
          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="img">Images</Label>
              <Input
                id="img"
                name="img"
                type="file"
                multiple
                onChange={(e) => {
                  setFieldValue('img', [...e.currentTarget.files])
                }}
              />
            </Field>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Pedro Duarte"
              />
            </Field>
            <Field>
              <Label htmlFor="desc">Description</Label>
              <Input
                id="desc"
                name="desc"
                value={values.desc}
                onChange={handleChange}
                placeholder="Developer"
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button type="button" onClick={() => setOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}