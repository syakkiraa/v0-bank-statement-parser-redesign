import { Building2, Upload, Cog, Download } from "lucide-react"

const steps = [
  {
    icon: Building2,
    number: "01",
    title: "Select Your Bank",
    description: "Choose from 15+ supported Malaysian banks to ensure accurate statement parsing.",
  },
  {
    icon: Upload,
    number: "02",
    title: "Upload Statements",
    description: "Drag and drop your PDF bank statements. Upload multiple files at once.",
  },
  {
    icon: Cog,
    number: "03",
    title: "Process & Extract",
    description: "Our intelligent parser extracts all transaction details automatically.",
  },
  {
    icon: Download,
    number: "04",
    title: "Export Results",
    description: "Download your structured data in CSV or Excel format for easy analysis.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Transform your bank statements into actionable data in four simple steps.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-border" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="flex flex-col items-center text-center">
                  {/* Step Number Circle */}
                  <div className="relative mb-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 border-4 border-background shadow-lg relative z-10">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold z-20">
                      {step.number}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{step.description}</p>
                </div>
                
                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-4 lg:hidden">
                    <svg className="h-6 w-6 text-border" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
