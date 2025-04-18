"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, X } from "lucide-react"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  label?: string
}

export function ColorPicker({ color, onChange, label }: ColorPickerProps) {
  const [value, setValue] = useState(color)
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Update internal value when color prop changes
  useEffect(() => {
    setValue(color)
  }, [color])

  // Predefined colors palette
  const presetColors = [
    "#000000",
    "#ffffff",
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#607d8b",
    "#9e9e9e",
    "#f1f5f9",
    "#1e293b",
    "#0f172a",
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleBlur = () => {
    onChange(value)
  }

  const handlePresetClick = (presetColor: string) => {
    setValue(presetColor)
    onChange(presetColor)
  }

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal h-10"
            onClick={() => {
              setIsOpen(true)
              setTimeout(() => inputRef.current?.focus(), 0)
            }}
          >
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full border" style={{ backgroundColor: value }} />
              <span>{value}</span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3">
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="h-9 w-9 rounded-md border" style={{ backgroundColor: value }} />
              <div className="flex-1">
                <Input
                  ref={inputRef}
                  type="text"
                  value={value}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="h-9"
                />
              </div>
            </div>
            <div>
              <Input type="color" value={value} onChange={handleChange} onBlur={handleBlur} className="h-9 w-full" />
            </div>
            <div className="grid grid-cols-6 gap-1">
              {presetColors.map((presetColor) => (
                <button
                  key={presetColor}
                  className="h-6 w-6 rounded-md border relative"
                  style={{ backgroundColor: presetColor }}
                  onClick={() => handlePresetClick(presetColor)}
                  type="button"
                >
                  {presetColor === value && (
                    <Check
                      className={`absolute inset-0 h-full w-full p-1 ${
                        presetColor === "#ffffff" || presetColor === "#ffeb3b" || presetColor === "#f1f5f9"
                          ? "text-black"
                          : "text-white"
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setValue(color)
                  setIsOpen(false)
                }}
              >
                <X className="mr-1 h-4 w-4" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  onChange(value)
                  setIsOpen(false)
                }}
              >
                <Check className="mr-1 h-4 w-4" />
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
