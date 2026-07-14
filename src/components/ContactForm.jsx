import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import "./ContactForm.css";

const initialForm = { name: "", phone: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[0-9]{10}$/.test(form.phone.trim())) e.phone = "Enter a valid 10-digit phone number";
    if (!form.message.trim()) e.message = "Please add a short message";
    return e;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // TODO: Replace with API call to Spring Boot backend, e.g.
    // fetch("/api/contact", { method: "POST", body: JSON.stringify(form) })
    setSubmitted(true);
    setForm(initialForm);
  };

  if (submitted) {
    return (
      <motion.div
        className="contact-form__success glass-card"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <CheckCircle2 size={40} color="var(--saffron)" />
        <p className="lang-ta">உங்கள் செய்தி பெறப்பட்டது. நன்றி!</p>
        <p className="contact-form__success-en">Your message has been received. Thank you!</p>
        <button className="btn btn-outline btn-sm" onClick={() => setSubmitted(false)}>
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form className="contact-form glass-card" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          aria-invalid={!!errors.name}
        />
        {errors.name && <span className="contact-form__error">{errors.name}</span>}
      </div>

      <div className="contact-form__field">
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <span className="contact-form__error">{errors.phone}</span>}
      </div>

      <div className="contact-form__field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          aria-invalid={!!errors.message}
        />
        {errors.message && <span className="contact-form__error">{errors.message}</span>}
      </div>

      <button type="submit" className="btn btn-primary">
        <Send size={17} /> Send Message
      </button>
    </form>
  );
}
