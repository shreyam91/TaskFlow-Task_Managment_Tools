"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"

import { CardWithForm } from "@/components/cardWithForm"
import { useState } from "react"


export default function Page() {
  const [showPopup, setShowPopup] = useState(false)
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* <SectionCards /> */}

              {/* Custom trigger button */}
              <Button
                variant="outline"
                className="w-[170px] h-[20px] text-l p-5 ml-5"
                onClick={() => setShowPopup(true)}
              >
                Add Project 
              </Button>

              {/* Popup with form */}
              {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-30">
                  <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                    <CardWithForm />
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" onClick={() => setShowPopup(false)}>
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="px-4 lg:px-6">
                {/* <ChartAreaInteractive /> */}
                <Calendar/>
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
