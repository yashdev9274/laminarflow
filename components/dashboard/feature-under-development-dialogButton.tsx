'use client';
 
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from '@/components/animate-ui/headless/dialog';
import Link from 'next/link';
 
export const FUDDialogButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);
 
  return (
    <div>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Open Dialog
      </Button>
 
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogBackdrop />
 
        <DialogPanel className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Invoice</DialogTitle>
            <DialogDescription>
              This lets you edit Invoice's data.
            </DialogDescription>
          </DialogHeader>
 
          <div className="grid gap-4 py-4">
            <p>
              This feature in under-development phase.
            </p>
          </div>
 
          <DialogFooter>
            
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Skip
            </Button>
            <Link href="/dashboard/invoices">
               <Button type="submit" onClick={() => setIsOpen(false)}>
                  Back to Invoices
               </Button>
            </Link>
          </DialogFooter>
        </DialogPanel>
      </Dialog>
    </div>
  );
};