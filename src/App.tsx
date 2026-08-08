import React, { useState } from 'react'
import { useStore } from './components/count'
import { DialogDemo } from './components/DialogDemo'
import { DialogAdd } from './components/DialogAdd'

export default function App() {
  const { Users, addUser, deleteUser, editUser, search } = useStore()

  const [newName, setNewName] = useState('')
  const [newAge, setNewAge] = useState('')
  const [openEdit, setOpenEdit] = useState(false)
  const [idx, setIdx] = useState(null)
  const [openAdd, setOpenAdd] = useState(false)
  const [nameE, setName] = useState('')
  const [age, setAge] = useState('')

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <DialogAdd
        open={openAdd}
        setOpen={setOpenAdd}
        nameE={nameE}
        age={age}
        setName={setName}
        setAge={setAge}
        addUser={addUser}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
              User List
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage and organize your users efficiently
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                className="w-full bg-slate-100 border-0 pl-4 pr-4 py-2.5 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                type="text"
                placeholder="Search users..."
                onChange={(e) => search(e.target.value)}
              />
            </div>

            <button
              onClick={() => setOpenAdd(true)}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-indigo-200 hover:shadow-md active:scale-95 text-sm"
            >
              + Add User
            </button>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Users.map((user) => (
            <div
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              key={user.id}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                    {user.name}
                  </h2>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      user.status
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {user.status ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="text-sm text-slate-500 mb-6 space-y-1">
                  <p>
                    <span className="font-medium text-slate-700">Age:</span> {user.age}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                <button
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 rounded-xl text-sm transition-colors"
                  onClick={() => {
                    setOpenEdit(true)
                    setNewName(user.name)
                    setNewAge(user.age)
                    setIdx(user.id)
                  }}
                >
                  Edit
                </button>

                <button
                  className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-600 font-medium py-2 rounded-xl text-sm transition-colors"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DialogDemo
        open={openEdit}
        setOpen={setOpenEdit}
        setName={setNewName}
        nameE={newName}
        age={newAge}
        setAge={setNewAge}
        edit={editUser}
        idx={idx}
      />
    </div>
  )
}