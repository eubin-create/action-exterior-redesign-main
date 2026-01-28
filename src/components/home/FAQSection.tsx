import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Why should I hire a local roofing company?",
    answer:
      "Local roofers will often be more experienced in dealing with the climate, materials, and regulations specific to your region. If you live in an area with extreme temperatures or unpredictable weather conditions such as heavy rains or high winds, then it's important that your roofer is familiar with the specific challenges that these environmental elements can present.",
  },
  {
    question: "What are the advantages of metal roofing?",
    answer:
      "Metal roofing gives homeowners several advantages, from long-term durability to energy savings. Generally speaking, metal roofs can last up to two or three times longer than conventional asphalt roofs. Metal systems have been known in some cases even to survive for as long as 50 years and beyond! On top of that, they're highly resistant to high winds, standing up remarkably well against the elements. In addition, this kind of material is highly fire retardant and very low maintenance.",
  },
  {
    question: "How do I find the best roofing company near me?",
    answer:
      "Start by asking around for recommendations from people you trust—like family and friends who have worked with local roofing companies in the past. Ask about their experiences, what they liked and disliked about working with each one, how quickly their projects were completed on time and within budget. You should also take a few minutes to research online reviews for local companies in your area.",
  },
  {
    question: "When should I get a roof inspection?",
    answer:
      "Experts recommend having one done at least once every three years or after any major event that could have compromised its structural integrity (such as a severe storm). In addition, if you're planning to buy or sell a house with an existing roof, it's essential that you have one done before making any decisions.",
  },
  {
    question: "What signs indicate I need roof repair?",
    answer:
      "The most common sign is water damage. If you notice any water stains or damp patches in your ceiling, then this could suggest that there is a tear in the roofing material or compromised sealant. Other signs include missing or damaged shingles, shingle granules in your gutters, and a sagging roofline.",
  },
  {
    question: "Is it necessary to call a professional roofer to fix a leak?",
    answer:
      "Yes, in most cases, it is necessary to call a professional roofer to fix a leak. DIY roof repairs can be dangerous and may not provide a permanent fix, leaving you with more costly repairs down the line. A professional roofer has the knowledge and experience to identify and address the cause of any leaks.",
  },
];

export function FAQSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-lg px-6 border border-primary/10 shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold hover:text-accent hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
