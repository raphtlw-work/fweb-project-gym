export function EquipmentHeader() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    weekday: 'long',
  })

  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold">Equipment List</h1>
      <p className="text-muted-foreground">{currentDate}</p>
    </header>
  )
}

