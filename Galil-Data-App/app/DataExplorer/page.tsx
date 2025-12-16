import TopFilterBar from "@/app/DataExplorer/TopFilterBar"
import DomainFilter from "@/app/components/ui/DomainFilter"

export default function Page() {
  return (
    <main className="min-h-screen bg-background" dir="rtl">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="grid grid-cols-[360px_1fr] gap-6 items-start">
          {/* Sidebar (מימין בגלל RTL) */}
          <aside>
            <DomainFilter />
          </aside>

          {/* Content */}
          <section>
            <TopFilterBar />
          </section>
        </div>
      </div>
    </main>
  )
}

