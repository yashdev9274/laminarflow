"use client"

import { useState } from "react"
import { ArrowLeftIcon, ArrowRightIcon, Info, InfoIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function TransactionsInfo() {
  const [step, setStep] = useState(1)

  const stepContent = [
    {
      title: "Welcome to Transaction by LaminarFLow",
      description:
        "Discover a powerful way of creating transactional details to enhance your financial workflow.",
    },
    {
      title: "Customizable",
      description:
        "You can customize any transactional record according to your needs.",
    },
    {
      title: "Ready to Start?",
      description:
        "Begin with clicking on plus sign to generate new transactions.",
    },
    {
      title: "Next Step",
      description:
        "Fill out the details in form and create new record.",
    },
    {
      title: "Edit/Download respective record",
      description:
        "You can edit as well as download your transactional data.",
    },
  ]

  const totalSteps = stepContent.length

  const handleContinue = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) setStep(1)
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" className="rounded w-7 h-7 p-0 flex items-center justify-center">
          <InfoIcon className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-0 p-0 [&>button:last-child]:text-white rounded">
        <div className="p-2">
          <img
            className="w-full rounded-md"
            src="/LF-transactions.png"
            width={382}
            height={216}
            alt="dialog"
          />
        </div>
        <div className="space-y-6 px-6 pt-3 pb-6 rounded">
          <DialogHeader>
            <DialogTitle>{stepContent[step - 1].title}</DialogTitle>
            <DialogDescription>
              {stepContent[step - 1].description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex justify-center space-x-1.5 max-sm:order-1">
              {[...Array(totalSteps)].map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "bg-primary size-1.5 rounded-full",
                    index + 1 === step ? "bg-primary" : "opacity-20"
                  )}
                />
              ))}
            </div>
            <DialogFooter>
              {step > 1 ? (
                <Button
                  className="group rounded"
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                >
                  <ArrowLeftIcon
                    className="-ms-1 me-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
                    size={16}
                    aria-hidden="true"
                  />
                  Back
                </Button>
              ) : (
                <DialogClose asChild>
                  <Button type="button" variant="ghost" className="rounded">
                    Skip
                  </Button>
                </DialogClose>
              )}
              
              {step < totalSteps ? (
                <Button
                  className="group rounded"
                  type="button"
                  onClick={handleContinue}
                >
                  Next
                  <ArrowRightIcon
                    className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
                    size={16}
                    aria-hidden="true"
                  />
                </Button>
              ) : (
                <DialogClose asChild>
                  <Button type="button">Okay</Button>
                </DialogClose>
              )}
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
