import { create } from 'zustand'

export const useStore = create((set, get) => ({
  Users: [
    { id: 1, name: 'ali', age: 22, status: false },
    { id: 2, name: 'ahmed', age: 25, status: true },
    { id: 3, name: 'muhamed', age: 30, status: false },
    { id: 4, name: 'usmon', age: 35, status: true },
    { id: 5, name: 'karim', age: 40, status: false },
    { id: 6, name: 'bilol', age: 45, status: true },
    { id: 7, name: 'sardor', age: 50, status: false },
    { id: 8, name: 'muhammad', age: 55, status: true },
    { id: 9, name: 'abdulaziz', age: 60, status: false },
    { id: 10, name: 'muhammadsusur', age: 65, status: true },
    {id:11,name:'nekruz',age:70,status:false},
    {id:12,name:'ibrohim',age:75,status:true},
  ],
  addUser: (name: string, age: number) =>
    set((state) => ({
      Users: [
        ...state.Users,
        {
          id: Math.random(),
          name: name,
          age: age,
          status: false
        }
      ]
    })),

  deleteUser: (id: number) =>set((state) => ({ Users: state.Users.filter((user) => user.id !== id) })),
  editUser: (id: number, newName: string, newAge: number) => set((state) => ({ Users: state.Users.map((user) => user.id === id   ? { ...user, name: newName, age: newAge }   : user  )})),
  search: (query: string) => set((state) => ({ Users: state.Users.filter((user) => user.name.toLowerCase().includes(query.toLowerCase())) })),
}))