const Contact = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <input type="text" placeholder="Your name"/>
      <input type="email" placeholder="Your email"/>
      <textarea placeholder="Your message"></textarea>
      <button>Send Message</button>
      <p>
        For inquiries, please email us at{" "}
        <a href="mailto:6lYDv@example.com">6lYDv@example.com</a>
      </p>
    </div>
  );
};

export default Contact;
