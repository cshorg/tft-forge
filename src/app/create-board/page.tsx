import CreateBoardForm from "./create-board-form"

export default async function CreateBoard() {
  const res = await fetch(
    "https://raw.communitydragon.org/14.6/cdragon/tft/en_us.json",
    { cache: "no-store" }
  )
  const data = await res.json()

  return (
    <main className="container mx-auto flex flex-col gap-10 pt-[100px]">
      <CreateBoardForm data={data} />
    </main>
  )
}
