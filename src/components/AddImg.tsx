import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Field, FieldGroup } from './ui/field'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { addImg } from '@/store/UsersSlice'

export default function AddImg({ open, setOpen, idI }) {
  const dispatch = useDispatch()

  function handleSubmit(e) {
    e.preventDefault()
    
    const fileInput = e.target.image
    if (!fileInput.files || fileInput.files.length === 0) return

    const formData = new FormData()
    
    // Агар якчанд файл ё як файл бошад ба FormData илова мекунем:
    for (let i = 0; i < fileInput.files.length; i++) {
      formData.append("images", fileInput.files[i])
    }

    // Фиристодани маълумот ба Redux Action
    // Эзоҳ: Агар addImg({ id: idI, formData }) гирад, ба ҳамин тарз фиристед
    dispatch(addImg({ id: idI, formData }))

    // Бастани модал ва тоза кардани форма
    e.target.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Илова кардани расм</DialogTitle>
          </DialogHeader>

          <FieldGroup className="py-4 space-y-3">
            <Field>
              <Label htmlFor="image">Расм / Файл</Label>
              <Input id="image" name="image" type="file" multiple accept="image/*" />
            </Field>
          </FieldGroup>

          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Бекор кардан
              </Button>
            </DialogClose>
            <Button type="submit">Зоҳир кардан</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}