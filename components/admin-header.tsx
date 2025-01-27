export function AdminHeader() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    weekday: 'long',
  })

  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold">Welcome, Raphael!</h1>
      <p className="text-muted-foreground">{currentDate}</p>
    </header>
  )
}

