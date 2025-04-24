import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireAuth";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
 } from "@/components/ui/card";
import { Graph } from "@/components/ui/graph";
 
 async function getInvoices(userId: string) {
   const rawData = await prisma.transactions.findMany({
     where: {
       status: "PENDING",
       userId: userId,
       createdAt: {
         lte: new Date(),
         gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
       },
     },
     select: {
       createdAt: true,
       amount: true,
     },
     orderBy: {
       createdAt: "asc",
     },
   });
 
   //Group and aggregate data by date
   const aggregatedData = rawData.reduce(
     (acc: { [key: string]: number }, curr) => {
       const date = new Date(curr.createdAt).toLocaleDateString("en-US", {
         month: "short",
         day: "numeric",
       });
 
       acc[date] = (acc[date] || 0) + curr.amount;
 
       return acc;
     },
     {}
   );
   //Convert to array and from the object
   const transformedData = Object.entries(aggregatedData)
     .map(([date, amount]) => ({
       date,
       amount,
       originalDate: new Date(date + ", " + new Date().getFullYear()),
     }))
     .sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
     .map(({ date, amount }) => ({
       date,
       amount,
     }));
 
   return transformedData;
 }
 
 export async function InvoiceAnalyticGraph() {
   const session = await requireUser();
   const data = await getInvoices(session.user?.id as string);
 
   return (
     <Card className="lg:col-span-2 mt-5 ml-5 mr-5 mb-5">
       <CardHeader>
         <CardTitle>Paid Invoices</CardTitle>
         <CardDescription>
           Invoices which have been pending in the last 30 days.
         </CardDescription>
       </CardHeader>
       <CardContent>
         <Graph data={data} />
       </CardContent>
     </Card>
   );
 }