"use client";

import React, { useState } from "react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import {
  Mail,
  Clock,
  Send,
  CheckCircle,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "viewer_integration",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        {/* Header Section */}
        <section className="py-14 sm:py-20 border-b border-border-hairline bg-surface-container-low/40 relative overflow-hidden">
          <div className="container-atelier max-w-4xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                Get in Touch
              </span>
            </div>

            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-on-surface leading-[1.15]">
              Contact Showcase 3D Web Studio
            </h1>

            <p className="mt-4 text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
              Have questions about embedding our WebGL 3D viewer, configuring custom shoe configurators, or preparing your CAD/GLB models? We are here to help.
            </p>
          </div>
        </section>

        {/* Contact Form & Studio Info */}
        <section className="py-14 sm:py-18 border-b border-border-hairline">
          <div className="container-atelier max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Form Column */}
              <div className="lg:col-span-7">
                {submitted ? (
                  <div className="p-8 rounded-lg border border-border-hairline bg-surface-container-low text-center space-y-4">
                    <CheckCircle className="w-12 h-12 text-primary mx-auto" />
                    <h2 className="font-headline text-2xl font-bold text-on-surface">
                      Inquiry Received
                    </h2>
                    <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                      Thank you for contacting Showcase 3D Studio. A 3D graphics specialist will review your request and reply within 4 business hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", inquiryType: "viewer_integration", message: "" });
                      }}
                      className="mt-4 px-4 py-2 rounded-[2px] border border-border-hairline text-xs font-mono text-primary hover:bg-surface transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs font-mono text-on-surface font-semibold mb-1.5 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Elena Vance"
                        className="w-full px-3.5 py-2.5 rounded-[3px] border border-border-hairline bg-surface text-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-on-surface font-semibold mb-1.5 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="elena@brand.com"
                        className="w-full px-3.5 py-2.5 rounded-[3px] border border-border-hairline bg-surface text-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-on-surface font-semibold mb-1.5 uppercase tracking-wider">
                        Inquiry Category
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[3px] border border-border-hairline bg-surface text-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
                      >
                        <option value="viewer_integration">3D Viewport Web Embed</option>
                        <option value="shoe_customizer">Custom Footwear Configurator</option>
                        <option value="model_optimization">GLB / Texture Pipeline Help</option>
                        <option value="enterprise_license">Enterprise Licensing</option>
                        <option value="general">General Support</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-on-surface font-semibold mb-1.5 uppercase tracking-wider">
                        Message / Project Scope *
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your 3D product visualization requirements, models, or integration questions..."
                        className="w-full px-3.5 py-2.5 rounded-[3px] border border-border-hairline bg-surface text-sm text-on-surface focus:outline-none focus:border-primary transition-colors resize-y"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-[3px] bg-primary text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-sm cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Message to 3D Engineering</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Info Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-lg border border-border-hairline bg-surface-container-low space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold">
                    <Clock className="w-4 h-4" />
                    <span>RESPONSE COMMITMENT</span>
                  </div>
                  <h3 className="font-headline text-lg font-bold text-on-surface">
                    Average Response Time: &lt; 4 Hours
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Our team of WebGL graphics specialists and 3D technical artists responds to all inquiries Monday through Friday.
                  </p>
                </div>

                <div className="p-6 rounded-lg border border-border-hairline bg-surface-container-low space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-on-surface font-semibold">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>DIRECT INQUIRIES</span>
                  </div>
                  <p className="font-mono text-xs text-primary font-semibold">
                    engineering@showcase-3d.com
                  </p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    For high-priority enterprise deployment questions or NDA-protected 3D CAD evaluations.
                  </p>
                </div>

                <div className="p-6 rounded-lg border border-border-hairline bg-surface-container-low space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-on-surface font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>DATA SECURITY GUARANTEE</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Your contact information is strictly used for direct technical communication. We never sell or share client data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-14 sm:py-18 bg-surface-container-low/30">
          <div className="container-atelier max-w-4xl">
            <div className="flex items-center gap-2 mb-8">
              <HelpCircle className="w-4 h-4 text-primary" />
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-on-surface">
                Contact & Support Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-lg border border-border-hairline bg-surface">
                <h3 className="font-headline text-sm font-bold text-on-surface mb-1.5">
                  Can you help optimize our brand's existing 3D models?
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Yes. We assist brands with glTF decimation, Draco/Meshopt compression, 16-bit normal baking, and dielectric PBR material calibration for 60 FPS web delivery.
                </p>
              </div>

              <div className="p-5 rounded-lg border border-border-hairline bg-surface">
                <h3 className="font-headline text-sm font-bold text-on-surface mb-1.5">
                  Do you offer white-label 3D customizer integrations?
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Yes. Our modular architecture allows seamless embedding into Shopify, headless Next.js, Webflow, and custom enterprise e-commerce portals.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
