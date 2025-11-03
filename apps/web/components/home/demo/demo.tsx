import { AppSidebar } from "@/components/home/demo/demoSidebar"
import { ChartAreaInteractive } from "@/components/home/demo/chart"
import { DataTable } from "@/components/home/demo/dataTable"
import { SectionCards } from "@/components/home/demo/sectionCards"
import { SiteHeader } from "@/components/home/demo/siteHeader"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import data from "./data.json"

export default function Demo() {
  return (
   <section className="container mx-auto mt-3 hidden md:block">
    <SidebarProvider className="flex flex-1">
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              {/* <DataTable data={data} /> */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
   </section>
  )
}
