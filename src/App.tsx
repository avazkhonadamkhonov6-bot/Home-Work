import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser } from './store/UsersSlice'
import { Button } from './components/ui/button'
import { AddModal } from './components/AddModal'
import { EditModal } from './components/EditModal'
import { Trash2, Edit3, UserPlus, UserCheck, UserX } from 'lucide-react' // Истифодаи иконкаҳо

export default function App() {
  const { data } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  
  const [open, setOpen] = useState(false)
  const [openE, setOpenE] = useState(false)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [id, setId] = useState(null)
  const [status, setStatus] = useState(false)

  const handleEdit = (user) => {
    setOpenE(true)
    setName(user.name)
    setAge(user.age)
    setStatus(user.status)
    setId(user.id)
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 sm:p-10">
      <AddModal open={open} setOpen={setOpen} />
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">User Management</h1>
          <p className="text-sm text-slate-500 mt-1">Рӯйхати корбарон ва идоракунии онҳо</p>
        </div>
        <Button 
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all rounded-xl px-5 py-2.5"
        >
          <UserPlus size={18} />
          Add User
        </Button>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {data.map((e) => (
          <div 
            key={e.id} 
            className="group relative bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                  e.status 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' 
                    : 'bg-rose-50 text-rose-700 border border-rose-200/60'
                }`}>
                  {e.status ? <UserCheck size={13} /> : <UserX size={13} />}
                  {e.status ? "Active" : "Inactive"}
                </span>
                <span className="text-xs font-medium text-slate-400">ID: {e.id}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-800 truncate mb-1">{e.name}</h2>
              <p className="text-sm text-slate-500 mb-4">{e.age} years old</p>
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-slate-100 mt-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleEdit(e)}
                className="flex-1 flex items-center justify-center gap-1.5 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 border-slate-200 rounded-xl"
              >
                <Edit3 size={15} />
                Edit
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => dispatch(deleteUser(e.id))}
                className="flex items-center justify-center bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 shadow-none rounded-xl px-3"
              >
                <Trash2 size={15} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <EditModal 
        open={openE} 
        setOpen={setOpenE} 
        name={name} 
        setName={setName} 
        age={age} 
        setAge={setAge} 
        status={status} 
        setStatus={setStatus} 
        id={id} 
      />
    </div>
  )
}