import { objectives } from "@/config/home";



export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-20">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Kurikirana imisanzu yawe mu buryo bworoshye{" "}
            <span className="text-green-600">Aho uri hose</span>.
          </h1>
          <p className="max-w-[42rem] py-6 leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Ikaze kuri AHEZA Solidality fund, aho ushobora gukurikirana imisanzu
            ushyira mu kigenda muburyo bworoshye kandi bwihuse dufatanyiriza
            hamwe kubaka umuryanga dukunda wa{" "}
            <span className="font-semibold text-green-600">GAERG</span>
          </p>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 md:py-12 lg:py-10 dark:bg-transparent"
      >
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[84rem] md:grid-cols-3">
          {objectives.map((objective) => (
            <div className="relative overflow-hidden rounded-lg  bg-background p-2" key={objective.name}>
              <div className="flex flex-col justify-between rounded-md p-2">
                <objective.Icon className="h-12 w-12 fill-current text-green-300 " />
                <div className="space-y-2">
                  <h3 className="font-bold">{objective.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {objective.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
