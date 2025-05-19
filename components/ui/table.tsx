"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Table = React.forwardRef<React.ElementRef<"table">, React.ComponentPropsWithoutRef<"table">>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative w-full overflow-auto">
        <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
      </div>
    )
  },
)
Table.displayName = "Table"

const TableHeader = React.forwardRef<React.ElementRef<"thead">, React.ComponentPropsWithoutRef<"thead">>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("[&_tr:last-child]:border-0 border-b bg-muted text-left", className)} {...props} />
  ),
)
TableHeader.displayName = "TableHeader"

export const TableHead = React.forwardRef<React.ElementRef<"th">, React.ComponentPropsWithoutRef<"th">>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn("h-12 px-4 py-2 font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", className)}
      {...props}
    />
  ),
)
TableHead.displayName = "TableHead"

const TableBody = React.forwardRef<React.ElementRef<"tbody">, React.ComponentPropsWithoutRef<"tbody">>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  ),
)
TableBody.displayName = "TableBody"

const TableRow = React.forwardRef<React.ElementRef<"tr">, React.ComponentPropsWithoutRef<"tr">>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b transition-colors hover:bg-accent-foreground/5 data-[state=selected]:bg-accent text-sm [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  ),
)
TableRow.displayName = "TableRow"

const TableCell = React.forwardRef<React.ElementRef<"td">, React.ComponentPropsWithoutRef<"td">>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0 group relative", className)}
      {...props}
    />
  ),
)
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<React.ElementRef<"caption">, React.ComponentPropsWithoutRef<"caption">>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />
  ),
)
TableCaption.displayName = "TableCaption"

export { Table, TableHeader, TableBody, TableRow, TableCell, TableCaption }
