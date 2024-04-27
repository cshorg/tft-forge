import CreateBoardForm from "./create-board-form"

async function getData() {
  const res = await fetch(
    "https://raw.communitydragon.org/14.6/cdragon/tft/en_us.json",
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default async function CreateBoard() {
  const data = await getData()

  return (
    <main className="container mx-auto flex justify-center items-center flex-col gap-10">
      <CreateBoardForm data={data} />
    </main>
  )
}
