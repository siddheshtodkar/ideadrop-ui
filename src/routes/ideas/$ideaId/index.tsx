import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: IdeaIdPage,
})

function IdeaIdPage() {
  return <div>Hello "/ideas/$ideaId/"!</div>
}
