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
import { Sparkle } from 'lucide-react';
 
export const BPUDialogButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);
 
  return (
    <div>
      <Button variant="ghost" onClick={() => setIsOpen(true)}>
        <Sparkle/>
        Upgrade to pro
      </Button>
 
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogBackdrop />
 
        <DialogPanel from="left" className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upgrade Plan</DialogTitle>
            <DialogDescription>
              You can select plan feasible to your need.
            </DialogDescription>
          </DialogHeader>
 
          <div className="grid gap-4 py-4">
            <p>
              This feature in under-development phase.
            </p>
          </div>
 
          <DialogFooter>
            
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Skip
            </Button>
            {/* <Link href="/dashboard/invoices"> */}
               <Button type="submit" onClick={() => setIsOpen(false)}>
                  Submit
               </Button>
            {/* </Link> */}
          </DialogFooter>
        </DialogPanel>
      </Dialog>
    </div>
  );
};