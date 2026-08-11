import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { addUser, deleteUser, editUser, setSearchWord } from './store/UsersSlice'
import { AddUser } from './components/AddUser'
import { EditUser } from './components/EditUser'

export default function App() {
  const data = useSelector(state => state.users.data)
  const searchWord = useSelector(state => state.users.searchWord)
  const dispatch = useDispatch() 
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [open, setOpen] = useState(false)
  const [nameE, setNameE] = useState('')
  const [phoneE, setPhoneE] = useState('')
  const [openE, setOpenE] = useState(false)
  const [idx, setIdx] = useState(null)
  const handleAddUser = (newUser) => {
    dispatch(addUser(newUser))
  }
  const handlEditUser = (edit) => {
    dispatch(editUser(edit))
  }
  const filteredData = data?.filter((user) =>
    user.name.toLowerCase().includes(searchWord?.toLowerCase() || '') ||
    user.phone.toLowerCase().includes(searchWord?.toLowerCase() || '')
  )
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <AddUser
          open={open}
          setOpen={setOpen}
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          addUser={handleAddUser}
        />
        <EditUser
          name={nameE}
          setName={setNameE}
          phone={phoneE}
          setPhone={setPhoneE}
          open={openE}
          setOpen={setOpenE}
          editUser={handlEditUser}
          idx={idx}
        />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Users Directory</h1>
            <p className="text-sm text-slate-500 mt-1">Manage user accounts and statuses</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="w-full sm:w-64">
              <Input
                type="text"
                placeholder="Search name or phone..."
                value={searchWord}
                onChange={(e) => dispatch(setSearchWord(e.target.value))}
                className="rounded-xl border-slate-200 focus:ring-indigo-500"
              />
            </div>
            <Button 
              className="w-full sm:w-auto whitespace-nowrap bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow"
              onClick={() => setOpen(true)}
            >
              + Add New User
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData?.length > 0 ? (
            filteredData.map((e) => (
              <div 
                key={e.id} 
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-lg font-semibold text-slate-900 truncate">{e.name}</h2>
                    <span 
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        e.status 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {e.status ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 font-mono">{e.phone}</p>
                </div>
                <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100">
                  <Button 
                    variant="outline"
                    className="flex-1 rounded-lg hover:bg-slate-50 border-slate-200 text-slate-700"
                    onClick={() => {
                      setOpenE(true)
                      setIdx(e.id)
                      setNameE(e.name)
                      setPhoneE(e.phone)
                    }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="destructive"
                    className="flex-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 shadow-none"
                    onClick={() => dispatch(deleteUser(e.id))}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 bg-white rounded-2xl border border-slate-200 text-slate-500">
              User not found
            </div>
          )}
        </div>
      </div>
    </div>
  )
}