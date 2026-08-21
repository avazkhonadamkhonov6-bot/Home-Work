import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Field, FieldGroup } from "./ui/field"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useSetAtom } from "jotai"
import { addImg } from "./data.atom"
import { useFormik } from "formik"

export function AddImgAtom({ open, setOpen, id }) {
  const addImgU = useSetAtom(addImg)

  const { handleSubmit, setFieldValue, resetForm, values } = useFormik({
    initialValues: {
      img: [],
    },
    onSubmit: async (values) => {
      if (!values.img.length) return

      const formData = new FormData()
      for (const file of values.img) {
        formData.append('images', file)
      }

      await addImgU({ id, formData })
      resetForm()
      setOpen(false)
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Images</DialogTitle>
          </DialogHeader>

          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="img">Images</Label>
              <Input
                id="img"
                name="img"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = e.currentTarget.files
                  setFieldValue('img', files ? Array.from(files) : [])
                }}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={!values.img.length}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}