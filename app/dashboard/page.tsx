import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import AddNote from '@/components/AddNote'
import DeleteNoteButton from '@/components/DeleteNoteButton'
export default async function Dash() {
  const s = await getSession()
  if (!s) redirect('/login')
  const uid = (s.user as any).id
  const notes = await prisma.note.findMany({ where: { ownerId: uid }, orderBy: { updatedAt: 'desc' } })
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Notes</h1>
        <Link href="/api/auth/signout" className="text-sm text-red-600">Sign out</Link>
      </div>
      <AddNote />
      <div className="space-y-3">
        {notes.map((n: any) => (
          <div key={n.id} className="bg-white p-4 rounded shadow flex justify-between items-start">
            <div>
              <p className="font-medium">{n.title}</p>
              <p className="text-sm text-gray-600 mt-1">{n.content}</p>
            </div>
            <DeleteNoteButton id={n.id} />
          </div>
        ))}
        {notes.length === 0 && <p className="text-gray-500">No notes yet</p>}
      </div>
    </div>
  )
}
