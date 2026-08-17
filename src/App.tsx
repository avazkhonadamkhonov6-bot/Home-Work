import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletImg, deletUser, getData } from './store/UsersSlice'
import { Button } from './components/ui/button'
import { AddModal } from './components/AddModal'
import { EditModal } from './components/EditModal'
import { Trash2, Edit3, UserPlus, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import AddImg from './components/AddImg'

export default function App() {
  const { data, isLoading } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [openE, setOpenE] = useState(false)
  const [openI, setOpenI] = useState(false)
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [status, setStatus] = useState(false)
  const [idx, setIdx] = useState(null)
  const [idI, setIdI] = useState(null)

  useEffect(() => {
    dispatch(getData())
  }, [dispatch])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-700">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-3" />
        <h1 className="text-xl font-semibold tracking-wide">Дар ҳоли боргирӣ...</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Рӯйхати Вазифаҳо ва Корбарон</h1>
            <p className="text-slate-500 text-sm mt-1">Идоракунӣ ва таҳрири маълумотҳо</p>
          </div>
          <Button 
            onClick={() => setOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/20"
          >
            <UserPlus className="w-5 h-5" />
            Илова кардани нав
          </Button>
        </div>

        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((e) => (
              <div 
                key={e.id} 
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {e.images && e.images.length > 0 && (
                    <div className="grid grid-cols-1 gap-3 mb-4">
                      {e.images.map((img) => (
                        <div key={img.id} className="relative overflow-hidden rounded-xl group/img">
                          <img 
                            src={`https://to-dos-api.softclub.tj/images/${img.imageName}`} 
                            alt={e.name}
                            className="w-full h-62 object-cover rounded-xl" 
                          />
                          <button
                            type="button"
                            onClick={() => dispatch(deletImg(img.id))}
                            className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-rose-600 text-rose-600 hover:text-white rounded-lg backdrop-blur-sm transition-all shadow-md cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h2 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {e.name}
                    </h2>
                    {e.isCompleted ? (
                      <span className="flex items-center gap-1 text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-200 px-2.5 py-1 rounded-full shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Актив
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-medium bg-rose-50 text-rose-600 border border-rose-200 px-2.5 py-1 rounded-full shrink-0">
                        <XCircle className="w-3.5 h-3.5" /> Ноактив
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-6">
                    {e.description || "Тавсиф мавҷуд нест."}
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setOpenE(true)
                      setName(e.name)
                      setDesc(e.description)
                      setStatus(e.isCompleted)
                      setIdx(e.id)
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg"
                  >
                    <Edit3 className="w-4 h-4 text-slate-500" />
                    Таҳрир
                  </Button>
                  <Button 
                    variant="destructive"
                    size="sm"
                    onClick={() => dispatch(deletUser(e.id))}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 shadow-none rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button onClick={()=>{setOpenI(true),setIdI(e.id)}}>Add Img</Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
            <p className="text-slate-500 font-medium">Ҳеҷ маълумоте ёфт нашуд.</p>
          </div>
        )}
        <AddModal open={open} setOpen={setOpen} />
        <AddImg open={openI} setOpen={setOpenI} idI={idI} />
        <EditModal 
          open={openE} 
          setOpen={setOpenE} 
          name={name} 
          setName={setName} 
          age={desc} 
          setAge={setDesc}
          id={idx}  
        />
      </div>
    </div>
  )
}