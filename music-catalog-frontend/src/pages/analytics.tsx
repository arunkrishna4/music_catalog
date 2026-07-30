import { AppSidebar } from "../components/layout/AppSidebar";
import { LibraryMobileHeader } from "../components/library/LibraryMobileHeader";

export default function Analytics() {
  return (
    <div className="min-h-screen bg-slate-100">
      <AppSidebar />

      <main className="lg:pl-64">
        <div className="mx-auto min-h-screen max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <LibraryMobileHeader />

          <section className="mt-8 lg:mt-0">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h1 className="text-3xl font-black text-slate-950 sm:text-4xl">
                Analytics
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
                Listening insights and library trends will live here.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
