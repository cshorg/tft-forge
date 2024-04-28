import CreateBoardForm from "./create-board-form"

export async function getData() {
  const res = await fetch(
    "https://raw.communitydragon.org/14.6/cdragon/tft/en_us.json",
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default function CreateBoard() {
  return (
    <main className="container mx-auto flex justify-center items-center flex-col gap-10">
      <CreateBoardForm />
    </main>
  )
}
