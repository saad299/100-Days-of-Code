"use client";

import { useState } from "react";

const contactInfo = [
  { label: "Email", value: "hello@myblog.dev", href: "mailto:hello@myblog.dev" },
  { label: "Twitter", value: "@yourhandle", href: "https://twitter.com" },
  { label: "GitHub", value: "github.com/saad299", href: "https://github.com/saad299" },
];

function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    // Wire up to your email/form service here
    setSubmitted(true);
  }

  return (
    <main className="bg-[#0d0d0d] min-h-screen font-serif text-[#e8e8e8]">

      {/* Header */}
      <section className="max-w-5xl mx-auto px-8 pt-24 pb-12">
        <span className="text-xs uppercase tracking-[2px] text-[#c8a96e] font-bold mb-3 block">
          Get in Touch
        </span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
          Let&apos;s <span className="text-[#c8a96e]">Talk.</span>
        </h1>
        <p className="text-[#6a6a6a] text-base leading-relaxed max-w-lg">
          Have a question, a project idea, or just want to say hello? Fill out the form or reach out directly — I&apos;ll get back to you soon.
        </p>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-8">
        <div className="border-t border-[#1f1f1f]" />
      </div>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-16">

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-bold tracking-tight mb-6 text-[#e8e8e8]">
            Contact Info
          </h2>
          <div className="flex flex-col gap-6">
            {contactInfo.map(({ label, value, href }) => (
              <div key={label}>
                <p className="text-xs uppercase tracking-[1.5px] text-[#3a3a3a] font-bold mb-1">
                  {label}
                </p>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9a9a9a] text-sm hover:text-[#c8a96e] transition-colors duration-200 no-underline"
                >
                  {value}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[#111] border border-[#1f1f1f] rounded-sm p-6">
            <p className="text-xs uppercase tracking-[1.5px] text-[#c8a96e] font-bold mb-2">
              Response Time
            </p>
            <p className="text-[#5a5a5a] text-sm leading-relaxed">
              I typically reply within 1–2 business days. For urgent matters, Twitter DMs are fastest.
            </p>
          </div>
        </div>

        {/* Form */}
        <div>
          {submitted ? (
            <div className="bg-[#111] border border-[#c8a96e]/40 rounded-sm p-10 text-center h-full flex flex-col items-center justify-center gap-4">
              <div className="text-4xl">✉️</div>
              <h3 className="text-xl font-bold text-[#e8e8e8]">Message Sent!</h3>
              <p className="text-[#6a6a6a] text-sm max-w-xs leading-relaxed">
                Thanks for reaching out. I&apos;ll get back to you as soon as possible.
              </p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", message: "" }); }}
                className="mt-4 text-xs uppercase tracking-wide text-[#c8a96e] hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs uppercase tracking-[1.5px] text-[#6a6a6a] font-bold">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="bg-[#111] border border-[#2a2a2a] rounded-sm px-4 py-3 text-[#e8e8e8] text-sm placeholder-[#3a3a3a] focus:outline-none focus:border-[#c8a96e] transition-colors duration-200"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs uppercase tracking-[1.5px] text-[#6a6a6a] font-bold">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="bg-[#111] border border-[#2a2a2a] rounded-sm px-4 py-3 text-[#e8e8e8] text-sm placeholder-[#3a3a3a] focus:outline-none focus:border-[#c8a96e] transition-colors duration-200"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs uppercase tracking-[1.5px] text-[#6a6a6a] font-bold">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="What's on your mind?"
                  className="bg-[#111] border border-[#2a2a2a] rounded-sm px-4 py-3 text-[#e8e8e8] text-sm placeholder-[#3a3a3a] focus:outline-none focus:border-[#c8a96e] transition-colors duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                className="bg-[#c8a96e] text-[#0d0d0d] px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-[#e0bf82] transition-colors duration-200 rounded-sm self-start"
              >
                Send Message →
              </button>
            </form>
          )}
        </div>
      </section>

    </main>
  );
}

export default ContactPage;