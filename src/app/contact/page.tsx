// app/contact/page.tsx
export default function ContactPage() {
  return (
    <main className="min-h-screen pt-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-gray-600 mb-8">Have questions or feedback? We'd love to hear from you.</p>

        <form className="space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg border border-gray-300"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg border border-gray-300"
          />
          <textarea
            rows={5}
            placeholder="Your Message"
            className="w-full p-3 rounded-lg border border-gray-300"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
