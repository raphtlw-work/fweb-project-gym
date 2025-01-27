import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "@radix-ui/react-icons"

export function AddMembers({ onAddMember }: { onAddMember: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Members</CardTitle>
      </CardHeader>
      <CardContent>
        <Button className="w-full h-32" onClick={onAddMember}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add New Member
        </Button>
      </CardContent>
    </Card>
  )
}

