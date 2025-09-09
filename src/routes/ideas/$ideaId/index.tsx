import { createFileRoute } from '@tanstack/react-router'

const fetchIdea = async ({ params }) => {
  const res = await fetch(`/api/ideas/${params.ideaId}`)
  if (!res.ok)
    throw new Error('Failed to fetch ideas')
  return res.json()
}

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: IdeaDetailsPage,
  loader: fetchIdea
})

function IdeaDetailsPage() {
  const idea = Route.useLoaderData()
  return <div>Hello {idea.title}!</div>
}