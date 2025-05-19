import type React from "react"
import "@/app/globals.css"
import { AppSidebar } from "@/components/app-sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SolicitationsProvider } from "@/contexts/solicitations-context"
import { TasksProvider } from "@/contexts/tasks-context"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SolicitationsProvider>
            <TasksProvider>
              <SidebarProvider>
                <div className="flex min-h-screen">
                  <AppSidebar />
                  <main className="flex-1 overflow-x-hidden">{children}</main>
                </div>
                <Toaster />
              </SidebarProvider>
            </TasksProvider>
          </SolicitationsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
