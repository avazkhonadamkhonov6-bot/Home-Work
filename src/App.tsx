import { useAtom, useSetAtom } from 'jotai'
import React, { useState } from 'react'
import { deleteAtom, deleteImgAtom, loadableDataAtom } from './components/data.atom'
import { Button } from './components/ui/button'
import { Trash2, Plus, Edit3, ImagePlus, UserX, Loader2 } from 'lucide-react'
import { EditAtom } from './components/EditAtom'
import { AddAtom } from './components/AddAtom'
import { AddImgAtom } from './components/AddImg'

// 1. Импорти Swiper ва стилҳои он
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function App() {
  const [dataA] = useAtom(loadableDataAtom)
  const deletUser = useSetAtom(deleteAtom)
  const deletImg = useSetAtom(deleteImgAtom)
  
  const [open, setOpen] = useState(false)
  const [openE, setOpenE] = useState(false)
  const [openI, setOpenI] = useState(false)
  const [user, setUser] = useState(null)
  const [id, setId] = useState(null) // Ислоҳшуда: номи мутағайир

  const handelEdit = (e) => {
    setOpenE(true)
    setUser(e)
  }

  if (dataA.state === 'loading') {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="flex items-center gap-3 text-lg font-medium text-gray-600">
          <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
          <span>Loading content...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-800">
      <EditAtom open={openE} setOpen={setOpenE} user={user} />
      <AddAtom open={open} setOpen={setOpen} />
      <AddImgAtom open={openI} setOpen={setOpenI} id={id} />

      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">User Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Manage users, descriptions, and media galleries.</p>
          </div>
          <Button onClick={() => setOpen(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
            <Plus className="h-4 w-4" /> Add User
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataA?.data?.map((e) => (
            <div key={e.id} className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
              <div className="space-y-4">
                
                {/* 2. Намоиши расмҳо тавассути Swiper Slider */}
                {e.images && e.images.length > 0 && (
                  <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                    <Swiper
                      modules={[Navigation, Pagination]}
                      navigation
                      pagination={{ clickable: true }}
                      spaceBetween={10}
                      slidesPerView={1}
                      className="h-48 w-full"
                    >
                      {e.images.map((img) => (
                        <SwiperSlide key={img.id}>
                          <div className="group relative h-full w-full bg-slate-200">
                            <img
                              src={`https://to-dos-api.softclub.tj/images/${img.imageName}`}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                            <button
                              onClick={() => deletImg(img.id)}
                              className="absolute top-2 right-2 z-10 rounded-md bg-white/80 p-1.5 text-red-600 backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-50 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-lg font-semibold text-slate-900 truncate">{e.name}</h2>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      e.isCompleted ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20' : 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20'
                    }`}>
                      {e.isCompleted ? "Active" : 'Inactive'}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-3">{e.description}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 gap-2">
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => handelEdit(e)} className="h-8 border-slate-200 text-slate-700 hover:bg-slate-100">
                    <Edit3 className="h-3.5 w-3.5 mr-1" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => { setOpenI(true); setId(e.id); }} className="h-8 border-slate-200 text-indigo-600 hover:bg-indigo-50">
                    <ImagePlus className="h-3.5 w-3.5 mr-1" /> Add Img
                  </Button>
                </div>
                <Button variant="ghost" size="sm" onClick={() => deletUser(e.id)} className="h-8 text-red-600 hover:bg-red-50 hover:text-red-700">
                  <UserX className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}