"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface GoogleAuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GoogleAuthDialog({ open, onOpenChange }: GoogleAuthDialogProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const handleSignOut = () => {
    setIsLoggedIn(false)
  }

  const handleSignIn = () => {
    setIsLoggedIn(true)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center justify-center py-4">
          {/* Google Logo */}
          <div className="mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="24" viewBox="0 0 75 24">
              <path
                fill="#4285F4"
                d="M31.77 12.2c0-.65-.06-1.28-.17-1.88H24v3.56h4.35a3.72 3.72 0 0 1-1.61 2.44v2.02h2.6c1.52-1.4 2.4-3.46 2.4-5.9z"
              />
              <path
                fill="#34A853"
                d="M24 19c2.18 0 4-.72 5.34-1.95l-2.6-2.02a5.5 5.5 0 0 1-2.74.75c-2.1 0-3.9-1.42-4.54-3.33h-2.7v2.08A8 8 0 0 0 24 19z"
              />
              <path
                fill="#FBBC05"
                d="M19.46 12.45c-.16-.48-.25-1-.25-1.52 0-.53.09-1.04.25-1.52v-2.08h-2.7A8 8 0 0 0 16 12c0 1.3.31 2.52.86 3.6l2.7-2.08z"
              />
              <path
                fill="#EA4335"
                d="M24 8.58c1.18 0 2.24.4 3.08 1.2l2.3-2.3A8 8 0 0 0 24 5a8 8 0 0 0-7.14 4.4l2.7 2.08c.64-1.9 2.44-3.33 4.54-3.33z"
              />
              <path fill="none" d="M16 16h16V8H16z" />
            </svg>
          </div>

          {isLoggedIn ? (
            <>
              {/* Logged In View */}
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold mb-1">John Doe</h3>
              <p className="text-muted-foreground mb-6">john.doe@example.com</p>
              <div className="flex flex-col w-full gap-2">
                <Button variant="outline" className="w-full" onClick={handleSignOut}>
                  Sign out
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Sign In View */}
              <h3 className="text-xl font-semibold mb-2">Sign in with Google</h3>
              <p className="text-muted-foreground text-center mb-6">
                Choose an account to continue to Sling RFP Management
              </p>
              <div className="flex flex-col w-full gap-2">
                <Button className="w-full flex items-center justify-start px-4" onClick={handleSignIn}>
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                  </div>
                </Button>
                <Button variant="outline" className="w-full mt-2">
                  Use another account
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
