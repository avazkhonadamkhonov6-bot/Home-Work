import React, { useEffect, useState } from 'react'
import { CountState } from './components/count'
import { DialogDemo } from './components/DialogEdit'
import { Button } from './components/ui/button'
import { DialogAdd } from './components/DialogAdd'

export default function App() {
  const { Users, getUsers, deleteUser, editUser, addUser } = CountState()
  const [nameE, setNameE] = useState('')
  const [emailE, setEmailE] = useState('')
  const [phoneE, setPhoneE] = useState('')
  const [openE, setOpenE] = useState(false)
  const [editId, setEditId] = useState(null)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Модалҳо */}
        <DialogDemo
          open={openE}
          setOpen={setOpenE}
          name={nameE}
          setName={setNameE}
          email={emailE}
          setEmail={setEmailE}
          phone={phoneE}
          setPhone={setPhoneE}
          editUser={editUser}
          editId={editId}
        />
        <DialogAdd
          open={open}
          setOpen={setOpen}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          addUser={addUser}
        />

        {/* Сарлавҳа ва Тӯгма */}
        <div className="flex flex-col sm:flex-row justify-between items-center pb-6 mb-8 border-b border-gray-200 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Корбарон (Users)
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Рӯйхати ҳамаи корбарон ва идоракунии онҳо
            </p>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow-md transition-all duration-200"
          >
            + Илова кардани корбар
          </Button>
        </div>

        {/* Сеткаи карточкаҳо (Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Users.map((e) => (
            <div
              key={e.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col justify-between p-5"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                {/* Аватар / Расм */}
                <img
                  src={e.img || 'https://via.placeholder.com/96'}
                  alt={e.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-indigo-100 shadow-inner"
                />

                {/* Маълумот */}
                <div className="w-full">
                  <h2 className="text-lg font-semibold text-slate-800 truncate">
                    {e.name}
                  </h2>
                  <p className="text-sm text-slate-500 truncate mt-0.5">
                    {e.email}
                  </p>
                  <p className="text-xs font-medium text-slate-400 mt-1">
                    {e.phone}
                  </p>
                </div>
              </div>

              {/* Тӯгмаҳои амалиёт */}
              <div className="flex gap-2 pt-5 mt-4 border-t border-slate-100">
                <button
                  className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-150"
                  onClick={() => {
                    setNameE(e.name)
                    setEmailE(e.email)
                    setPhoneE(e.phone)
                    setEditId(e.id)
                    setOpenE(true)
                  }}
                >
                  Вироиш (Edit)
                </button>
                <button
                  className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-150"
                  onClick={() => deleteUser(e.id)}
                >
                  Нест кардан
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}