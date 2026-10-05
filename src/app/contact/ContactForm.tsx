"use client";

import React, { useState } from "react";
import {
  Mail,
  Clock,
  Send,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";

export const ContactForm: React.FC = () => {
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
  );
};
