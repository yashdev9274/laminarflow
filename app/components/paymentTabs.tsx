import { BoxIcon, HouseIcon, PanelsTopLeftIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


export default function PaymentTab() {
  return (
    <Tabs defaultValue="tab-1">
      <ScrollArea>
        <TabsList className="mb-3">
          <TabsTrigger value="tab-1">
            <HouseIcon
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            PolarSh
          </TabsTrigger>
          <TabsTrigger value="tab-2" className="group">
            <PanelsTopLeftIcon
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Stripe
            <Badge
              className="bg-primary/15 ms-1.5 min-w-5 px-1 transition-opacity group-data-[state=inactive]:opacity-50"
              variant="secondary"
            >
              3
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="tab-3" className="group">
            <BoxIcon
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            DodoPayment
            <Badge className="ms-1.5 transition-opacity group-data-[state=inactive]:opacity-50">
              New
            </Badge>
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Tab content 1 */}

      <TabsContent value="tab-1">
         <div>
            <Card>
               <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                     <div className="space-y-1">
                        <CardTitle>Connect Polar</CardTitle>
                        <CardDescription>Connect with your polar account.</CardDescription>
                     </div>
                  </div>
                  <CardContent>
                     <form>
                        <div className="flex flex-col gap-6">
                           <div className="grid gap-2">
                              <Label htmlFor="email">Organization id</Label>
                              
                              <Input
                                 id="text"
                                 type="id"
                                 placeholder="your-organization-id"
                                 required
                              />
                              <p className="text-xs text-zinc-500">
                                 Go to your Polar Dashboard {'>'} Setting {'>'} General {'>'} Profile and find "Identifier"
                              </p>
                           </div>
                           <div className="grid gap-2">
                           {/* <div className="flex items-center">
                              <Label htmlFor="password">Access Token</Label>
                              <a
                                 href="#"
                                 className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                              >
                                 Forgot your password?
                              </a>
                           </div> */}
                           <Input 
                              id="password" 
                              type="password" 
                              required 
                              placeholder="polar_pat_********************"
                           />
                           <p className="text-xs text-zinc-500">
                              Go to Settings {'>'} General {'>'} Developer {'>'} Token
                           </p>
                           </div>
                        </div>
                     </form>
                     </CardContent>
                  <Button variant="secondary" className="bg-zinc-800 rounded-lg text-neutral-200 hover:bg-blue-700 font-bold py-2 px-4">
                     Connect
                  </Button>  
               </CardHeader>
            </Card>
         </div>
      </TabsContent>

      {/* Tab content 2 */}

      <TabsContent value="tab-2">
         <div>
            <Card>
               <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                     <div className="space-y-1">
                        <CardTitle>Polar</CardTitle>
                        <CardDescription>Connect with your polar account.</CardDescription>
                     </div>
                     <Button variant="secondary" className="bg-blue-800 text-neutral-200 hover:bg-blue-700 font-bold py-2 px-4 rounded">
                        Polar Sh
                     </Button>
                  </div>
                  <Separator/>
                  <div className="flex items-center justify-between mt-4 mb-4">
                     <div className="space-y-1">
                        <CardTitle>Stripe</CardTitle>
                        <CardDescription>Connect with your stripe account.</CardDescription>
                     </div>
                     <Button variant="secondary" className="bg-blue-800 text-neutral-200 hover:bg-blue-700 font-bold py-2 px-4 rounded">
                        Stripe
                     </Button>
                  </div>
                  <Separator/>
               </CardHeader>
            </Card>
         </div>
      </TabsContent>
      
      {/* Tab content 3 */}
      <TabsContent value="tab-3">
         <div>
            <Card>
               <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                     <div className="space-y-1">
                        <CardTitle>Polar</CardTitle>
                        <CardDescription>Connect with your polar account.</CardDescription>
                     </div>
                     <Button variant="secondary" className="bg-blue-800 text-neutral-200 hover:bg-blue-700 font-bold py-2 px-4 rounded">
                        Polar Sh
                     </Button>
                  </div>
                  <Separator/>
                  <div className="flex items-center justify-between mt-4 mb-4">
                     <div className="space-y-1">
                        <CardTitle>Stripe</CardTitle>
                        <CardDescription>Connect with your stripe account.</CardDescription>
                     </div>
                     <Button variant="secondary" className="bg-blue-800 text-neutral-200 hover:bg-blue-700 font-bold py-2 px-4 rounded">
                        Stripe
                     </Button>
                  </div>
                  <Separator/>
               </CardHeader>
            </Card>
         </div>
      </TabsContent>
    </Tabs>
  )
}
