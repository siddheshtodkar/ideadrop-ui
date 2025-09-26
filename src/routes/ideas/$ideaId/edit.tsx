import { fetchIdea, updateIdea } from '@/api/ideas'
import { queryOptions, useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import React, { useState } from 'react'

const ideaQueryOptions = (id: string) => (
  queryOptions({
    queryKey: ['idea', id],
    queryFn: () => fetchIdea(id)
  })
)

export const Route = createFileRoute('/ideas/$ideaId/edit')({
  component: EditIdeaPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId))
  }
})

function EditIdeaPage() {
  const { ideaId } = Route.useParams()
  const navigate = useNavigate()
  const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId))

  const [title, setTitle] = useState(idea.title)
  const [summary, setSummary] = useState(idea.summary)
  const [description, setDescription] = useState(idea.description)
  const [tags, setTags] = useState(idea.tags.join(', '))

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => updateIdea(ideaId, { title, summary, description, tags: tags.split(',').map(tag => tag.trim()).filter(Boolean) }),
    onSuccess: () => {
      navigate({ to: '/ideas/$ideaId', params: { ideaId } })
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await mutateAsync()
  }

  return (
    <div className='space-y-4'>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Edit Idea</h1>
        <Link to='/ideas/$ideaId' params={{ ideaId }} className='text-sm text-blue-600 hover:underline'>Back To Idea</Link>
      </div>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="title" className='block text-gray-700 font-medium mb-1'>Title</label>
          <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Idea Title'
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ' />
        </div>
        <div className="">
          <label htmlFor="summary" className='block text-gray-700 font-medium mb-1'>Summary</label>
          <input type="text" name="summary" id="summary" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder='Enter Idea Summary'
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ' />
        </div>
        <div className="">
          <label htmlFor="description" className='block text-gray-700 font-medium mb-1'>Description</label>
          <textarea name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Write out the description of your Idea'
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ' />
        </div>
        <div className="">
          <label htmlFor="tags" className='block text-gray-700 font-medium mb-1'>Tags</label>
          <input type="text" name="tags" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder='Optional tags, comma separated'
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ' />
        </div>
        <div className="mt-5">
          <button className='block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed'
            type="submit" disabled={isPending}>{isPending ? 'Updateing...' : 'Update Idea'}</button>
        </div>
      </form>
    </div>
  )
}