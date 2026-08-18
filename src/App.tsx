import React, { useState } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { dataAtom, deleteAtom } from './components/data.atom'
import { Button } from './components/ui/button'
import { AddAtom } from './components/AddAtom'
import { EditAtom } from './components/EditAtom'
import { Plus, Trash2, Edit3, User, CheckCircle2, XCircle } from 'lucide-react'

export default function App() {
  const data = useAtomValue(dataAtom)
  const deletU = useSetAtom(deleteAtom)

  const [open, setOpen] = useState(false)
  const [openE, setOpenE] = useState(false)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [status, setStatus] = useState(false)
  const [id, setId] = useState(null)

  const handelEdit = (user) => {
    setOpenE(true)
    setName(user.name)
    setAge(user.age)
    setId(user.id)
    setStatus(user.status)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10 font-sans">
      <AddAtom open={open} setOpen={setOpen} />
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Рӯйхати корбарон
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Ҷамъи корбарон: {data?.length || 0}
            </p>
          </div>
          <Button onClick={() => setOpen(true)} className="gap-2 rounded-xl">
            <Plus className="w-4 h-4" /> Илова кардани корбар
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((e) => (
            <div
              key={e.id}
              className="group relative bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-800 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-semibold">
                      {e.name ? e.name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                    </div>
                    <div>
                      <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 capitalize">
                        {e.name}
                      </h2>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {e.age} сола
                      </span>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      e.status
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800'
                        : 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-800'
                    }`}
                  >
                    {e.status ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Фаъол
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" /> Ғайрифаъол
                      </>
                    )}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handelEdit(e)}
                  className="flex-1 gap-1.5 rounded-xl border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Таҳрир
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deletU(e.id)}
                  className="rounded-xl px-3"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <EditAtom
        name={name}
        setName={setName}
        age={age}
        setAge={setAge}
        status={status}
        setStatus={setStatus}
        id={id}
        open={openE}
        setOpen={setOpenE}
      />
    </div>
  )
}