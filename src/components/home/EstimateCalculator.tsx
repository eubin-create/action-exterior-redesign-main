import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2, Calculator, MapPin, ArrowRight } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function EstimateCalculator() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [estimate, setEstimate] = useState<{ min: number; max: number } | null>(
        null
    );
    const [formData, setFormData] = useState({
        address: "",
        squareFootage: "",
        roofAge: [15],
        ownership: "",
    });

    const handleNext = () => {
        if (step === 1 && formData.address) {
            setStep(2);
        }
    };

    const calculateEstimate = () => {
        setLoading(true);
        // Simulate API calculation
        setTimeout(() => {
            const sqFt = parseInt(formData.squareFootage) || 2500;
            const minPrice = Math.round(sqFt * 4.8);
            const maxPrice = Math.round(sqFt * 6.8);

            setEstimate({ min: minPrice, max: maxPrice });
            setLoading(false);
            setStep(3);
        }, 1500);
    };

    return (
        <Card className="w-full max-w-md mx-auto shadow-2xl border-2 border-primary/20 bg-white/95 backdrop-blur-sm overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary" />
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-2xl font-display text-primary">
                    <Calculator className="w-6 h-6 text-accent" />
                    Instant Roof Estimate
                </CardTitle>
                <CardDescription className="text-muted-foreground font-medium">
                    Get a professional ballpark in 45 seconds.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                {step === 1 && (
                    <div className="space-y-4 animate-fade-in">
                        <div className="space-y-2">
                            <Label htmlFor="address" className="text-primary font-bold">Property Address</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-accent" />
                                <Input
                                    id="address"
                                    placeholder="123 Cowboy Way, Houston, TX"
                                    className="pl-9 border-primary/20 focus:border-accent"
                                    value={formData.address}
                                    onChange={(e) =>
                                        setFormData({ ...formData, address: e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ownership" className="text-primary font-bold">Ownership Status</Label>
                            <Select
                                onValueChange={(val) =>
                                    setFormData({ ...formData, ownership: val })
                                }
                                value={formData.ownership}
                            >
                                <SelectTrigger className="border-primary/20">
                                    <SelectValue placeholder="Are you the homeowner?" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="owner">Yes, I am the owner</SelectItem>
                                    <SelectItem value="buyer">I am buying this home</SelectItem>
                                    <SelectItem value="agent">I am a real estate agent</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label className="text-primary font-bold">Approximate Roof Age</Label>
                                <span className="text-sm font-bold text-accent">
                                    {formData.roofAge} years
                                </span>
                            </div>
                            <Slider
                                value={formData.roofAge}
                                onValueChange={(val) =>
                                    setFormData({ ...formData, roofAge: val })
                                }
                                max={30}
                                step={1}
                                className="py-4"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="sqft" className="text-primary font-bold">Living Space (Sq Ft)</Label>
                            <Input
                                id="sqft"
                                type="number"
                                placeholder="e.g. 2500"
                                className="border-primary/20 focus:border-accent"
                                value={formData.squareFootage}
                                onChange={(e) =>
                                    setFormData({ ...formData, squareFootage: e.target.value })
                                }
                            />
                            <p className="text-[10px] text-muted-foreground italic">We use this to estimate your roof size before satellite measurement.</p>
                        </div>
                    </div>
                )}

                {step === 3 && estimate && (
                    <div className="text-center space-y-6 animate-fade-in py-4">
                        <div className="p-6 bg-primary/5 rounded-xl border-2 border-primary/10 shadow-inner">
                            <p className="text-xs uppercase tracking-widest text-primary/60 font-bold mb-2">
                                Estimated Range
                            </p>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-4xl font-black text-primary font-display tracking-tighter">
                                    ${estimate.min.toLocaleString()}
                                </span>
                                <span className="text-xl text-accent font-bold">-</span>
                                <span className="text-4xl font-black text-primary font-display tracking-tighter">
                                    ${estimate.max.toLocaleString()}
                                </span>
                            </div>
                        </div>
                        <div className="bg-accent/10 p-4 rounded-xl border border-accent/20">
                            <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-1 leading-none">
                                Financing Option
                            </p>
                            <p className="text-2xl font-black text-primary font-display tracking-tight">
                                As Low As <span className="text-accent underline decoration-2 underline-offset-4">${Math.round(estimate.min / 144)}/mo</span>
                            </p>
                            <p className="text-[10px] text-primary/60 font-bold mt-2 uppercase tracking-tighter italic">
                                *Zero Down • 144 Months • W.A.C
                            </p>
                        </div>
                        <div className="bg-accent/10 p-3 rounded-lg border border-accent/20">
                            <p className="text-sm text-primary font-medium leading-relaxed">
                                <span className="text-accent font-bold">Next Step:</span> Let's lock this in with a professional aerial measurement (Free).
                            </p>
                        </div>
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex flex-col gap-3 bg-muted/30 p-6 border-t">
                <div className="flex justify-between w-full gap-3">
                    {step > 1 && step < 3 && (
                        <Button variant="outline" className="border-primary/20" onClick={() => setStep(step - 1)}>
                            Back
                        </Button>
                    )}

                    {step === 1 && (
                        <Button
                            className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 text-lg shadow-lg group"
                            onClick={handleNext}
                            disabled={!formData.address}
                        >
                            Next Step <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    )}

                    {step === 2 && (
                        <Button
                            className="ml-auto bg-primary hover:bg-primary/90 text-white font-bold h-12 text-lg shadow-lg group"
                            onClick={calculateEstimate}
                            disabled={loading || !formData.squareFootage}
                        >
                            {loading ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <>Calculate Quote <Calculator className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" /></>
                            )}
                        </Button>
                    )}

                    {step === 3 && estimate && (
                        <div className="w-full space-y-4">
                            <Button
                                className="w-full bg-accent hover:bg-accent/90 text-white font-black h-14 text-xl shadow-xl shadow-accent/20 uppercase tracking-tight"
                                asChild
                            >
                                <a href="/contact">Get Precision Pricing</a>
                            </Button>
                            <div className="flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-widest text-[#0a2240]/40">
                                <span>(713) 555-0123</span>
                                <span className="w-1 h-1 rounded-full bg-current" />
                                <span>Zero Down / 144 Mo</span>
                            </div>
                        </div>
                    )}
                </div>
                {step < 3 && (
                    <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-bold">
                        Zero Down Financing Available • $0 Upfront
                    </p>
                )}
            </CardFooter>
        </Card>
    );
}
