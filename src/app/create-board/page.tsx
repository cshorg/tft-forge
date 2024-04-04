import CreateBoardForm from "./create-board-form"

export default function CreateBoard() {
  return (
    <main className="container mx-auto flex flex-col gap-10 py-6">
      <h1 className="text-4xl font-semibold">Create Board</h1>
      <CreateBoardForm />
    </main>
  )
}
