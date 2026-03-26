import { Shield, Zap, FileStack, Database, Clock, Lock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process multiple bank statements in seconds with our optimized parsing engine.",
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "Your data is encrypted and never stored. Files are processed locally and securely.",
  },
  {
    icon: FileStack,
    title: "Multi-File Support",
    description: "Upload and process multiple PDF files simultaneously for batch analysis.",
  },
  {
    icon: Database,
    title: "Structured Output",
    description: "Get clean, structured data ready for import into your accounting software.",
  },
  {
    icon: Clock,
    title: "Real-Time Progress",
    description: "Track processing status with live updates and detailed progress indicators.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "No data leaves your browser. All processing happens client-side for maximum privacy.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Powerful Features for Financial Professionals
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Everything you need to efficiently extract and analyze transaction data from bank statements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
