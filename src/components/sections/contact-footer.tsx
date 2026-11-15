"use client";

import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { useLocale } from "@/locales/locale-provider";

type FormErrors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactSection() {
  const { copy } = useLocale();
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const nextErrors: FormErrors = {};
    if (name.length < 2) nextErrors.name = copy.contact.validation;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = copy.contact.emailError;
    if (message.length < 12) nextErrors.message = copy.contact.messageError;
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setStatus(copy.contact.validation);
      if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.email) emailRef.current?.focus();
      else messageRef.current?.focus();
      return;
    }

    setStatus(copy.contact.noBackend);
  }

  const [titleLead, titleRest] = copy.contact.title.split("\n");

  return (
    <section id="contact" className="contact-section page-gutter" aria-labelledby="contact-title">
      <div className="contact-section__intro">
        <p className="eyebrow">06 &nbsp; / &nbsp; {copy.contact.eyebrow}</p>
        <h2 id="contact-title" className="section-title">{titleLead}<br /><span>{titleRest}</span></h2>
        <p className="body-copy">{copy.contact.copy}</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="contact-form__field">
          <label htmlFor="contact-name">{copy.contact.name}</label>
          <input ref={nameRef} id="contact-name" name="name" type="text" autoComplete="name" minLength={2} maxLength={100} required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} placeholder={copy.contact.placeholderName} onChange={() => { if (errors.name) setErrors((current) => ({ ...current, name: undefined })); }} />
          {errors.name ? <span id="contact-name-error" className="contact-form__error">{errors.name}</span> : null}
        </div>
        <div className="contact-form__field">
          <label htmlFor="contact-email">{copy.contact.email}</label>
          <input ref={emailRef} id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} placeholder={copy.contact.placeholderEmail} onChange={() => { if (errors.email) setErrors((current) => ({ ...current, email: undefined })); }} />
          {errors.email ? <span id="contact-email-error" className="contact-form__error">{errors.email}</span> : null}
        </div>
        <div className="contact-form__field contact-form__field--wide">
          <label htmlFor="contact-message">{copy.contact.message}</label>
          <textarea ref={messageRef} id="contact-message" name="message" rows={4} minLength={12} maxLength={1200} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} placeholder={copy.contact.placeholderMessage} onChange={() => { if (errors.message) setErrors((current) => ({ ...current, message: undefined })); }} />
          {errors.message ? <span id="contact-message-error" className="contact-form__error">{errors.message}</span> : null}
        </div>
        <button className="button-primary contact-form__submit" type="submit">{copy.contact.submit}<ArrowUpRight size={16} aria-hidden="true" /></button>
        <p className="contact-form__status" role="status" aria-live="polite">{status}</p>
      </form>
    </section>
  );
}

export function SiteFooter() {
  const { copy } = useLocale();
  const links = [
    ["design", copy.nav.design], ["performance", copy.nav.performance], ["interior", copy.nav.interior],
    ["technology", copy.nav.technology], ["configurator", copy.nav.configurator], ["contact", copy.nav.contact],
  ];
  return (
    <footer className="site-footer page-gutter">
      <div className="site-footer__top">
        <a className="brand-mark" href="#home" aria-label="AERON">AERON<span className="brand-mark__dot">.</span></a>
        <p>{copy.footer.line}</p>
        <a className="site-footer__top-link" href="#home" aria-label={copy.nav.home}><MoveUpRight size={18} aria-hidden="true" /></a>
      </div>
      <div className="site-footer__middle">
        <nav aria-label={copy.nav.aria}>
          {links.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <span>{copy.footer.note}</span>
      </div>
      <div className="site-footer__bottom"><span>{copy.footer.rights}</span><span>ALMATY &nbsp; · &nbsp; 43°14&apos;N</span></div>
    </footer>
  );
}
