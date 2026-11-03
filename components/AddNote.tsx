'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
export default function AddNote() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const r = useRouter()
  async function submit(e: any) {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/notes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, content }) })
    setTitle(''); setContent(''); setLoading(false); r.refresh()
  }
  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-4 space-y-2">
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full border p-2 rounded text-sm" required />
      <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Content" className="w-full border p-2 rounded text-sm" rows={2} />
      <button type="submit" disabled={loading} className="bg-indigo-600 text-white px-4 py-1 rounded text-sm disabled:opacity-50">Add note</button>
    </form>
  )
}
