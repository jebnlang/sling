"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ExclusionsGuide() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Finding the Exclusions Feature</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <div className="w-full max-w-3xl border rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=600&width=800"
            alt="Screenshot showing the Matching Content tab with the Exclusions section highlighted"
            width={800}
            height={600}
            className="w-full"
          />
          <div className="p-4 bg-yellow-50 border-t">
            <ol className="list-decimal list-inside space-y-2">
              <li>Navigate to a company's profile page</li>
              <li>
                Click on the <strong>"Matching Content"</strong> tab (second tab)
              </li>
              <li>
                Scroll down to find the <strong>"Matching Exclusions"</strong> card
              </li>
              <li>Use the input field to add exclusions one by one or click "Bulk Edit" to add multiple at once</li>
            </ol>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          The Exclusions feature allows you to specify what a company does not do, which helps filter out irrelevant
          RFPs in future matching.
        </div>
      </CardContent>
    </Card>
  )
}
