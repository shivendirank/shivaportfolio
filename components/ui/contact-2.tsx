"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

interface Contact2Props {
    title?: string;
    description?: string;
    phone?: string;
    email?: string;
}

export const Contact2 = ({
    title = "Contact",
    description = "I'm available for questions, feedback, or collaboration opportunities. Let me know how I can help!",
    phone = "9139998419",
    email = "shivakaba2@gmail.com",
}: Contact2Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);
        formData.append("access_key", "7488d9a3-e952-49b7-94e2-905d1614ca17"); // Live Web3Forms Access Key

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setIsSuccess(true);
            } else {
                console.error("Error", data);
            }
        } catch (error) {
            console.error("Submission error", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className="py-2 bg-transparent text-white">
            <div className="container px-2 mx-auto">
                <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20 max-w-6xl mx-auto">

                    <div className="flex flex-col justify-center gap-10 max-w-md">
                        <div className="text-left">
                            <h2 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl text-white">
                                {title}
                            </h2>
                            <p className="text-neutral-500 leading-relaxed font-medium">
                                {description}
                            </p>
                        </div>

                        <div className="w-fit">
                            <h3 className="mb-6 text-xl font-bold text-white">
                                Contact Details
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <span className="text-xs uppercase tracking-widest text-neutral-600 font-bold w-12 shrink-0">Phone</span>
                                    <span className="text-sm font-medium text-white/80">{phone}</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-xs uppercase tracking-widest text-neutral-600 font-bold w-12 shrink-0">Email</span>
                                    <a href={`mailto:${email}`} className="text-sm font-medium text-[#C8FF00] hover:underline">
                                        {email}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex-1 max-w-md lg:max-w-xl w-full">
                        <AnimatePresence mode="wait">
                            {isSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center p-10 rounded-2xl border border-[#C8FF00]/20 bg-[#C8FF00]/5 text-center"
                                >
                                    <CheckCircle2 className="w-12 h-12 text-[#C8FF00] mb-4" />
                                    <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                                    <p className="text-sm text-neutral-400">Thanks for reaching out. I&#39;ll get back to you shortly.</p>
                                    <Button
                                        variant="outline"
                                        className="mt-6 border-[#C8FF00]/20 text-[#C8FF00] hover:bg-[#C8FF00]/10"
                                        onClick={() => setIsSuccess(false)}
                                    >
                                        Send Another
                                    </Button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-5 rounded-2xl border border-white/5 bg-white/[0.02] p-8 md:p-10 shadow-2xl"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="grid w-full items-center gap-2">
                                            <Label htmlFor="firstname" className="text-xs uppercase tracking-widest text-neutral-500 font-bold">First Name</Label>
                                            <Input
                                                type="text"
                                                id="firstname"
                                                name="first_name"
                                                placeholder="John"
                                                required
                                                className="bg-black/40 border-white/5 focus:border-[#C8FF00]/50 transition-all text-sm h-11"
                                            />
                                        </div>
                                        <div className="grid w-full items-center gap-2">
                                            <Label htmlFor="lastname" className="text-xs uppercase tracking-widest text-neutral-500 font-bold">Last Name</Label>
                                            <Input
                                                type="text"
                                                id="lastname"
                                                name="last_name"
                                                placeholder="Doe"
                                                required
                                                className="bg-black/40 border-white/5 focus:border-[#C8FF00]/50 transition-all text-sm h-11"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid w-full items-center gap-2">
                                        <Label htmlFor="email" className="text-xs uppercase tracking-widest text-neutral-500 font-bold">Email</Label>
                                        <Input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="john@example.com"
                                            required
                                            className="bg-black/40 border-white/5 focus:border-[#C8FF00]/50 transition-all text-sm h-11"
                                        />
                                    </div>

                                    <div className="grid w-full items-center gap-2">
                                        <Label htmlFor="subject" className="text-xs uppercase tracking-widest text-neutral-500 font-bold">Subject</Label>
                                        <Input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            placeholder="Project Inquiry"
                                            required
                                            className="bg-black/40 border-white/5 focus:border-[#C8FF00]/50 transition-all text-sm h-11"
                                        />
                                    </div>

                                    <div className="grid w-full gap-2">
                                        <Label htmlFor="message" className="text-xs uppercase tracking-widest text-neutral-500 font-bold">Message</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="How can I help you?"
                                            required
                                            className="bg-black/40 border-white/5 focus:border-[#C8FF00]/50 transition-all text-sm min-h-[120px]"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-12 bg-[#C8FF00] text-black hover:bg-[#B6E600] font-bold text-sm tracking-widest uppercase transition-all mt-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            "Send Message"
                                        )}
                                    </Button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};
