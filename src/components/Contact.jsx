function Contact() {
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 lg:text-5xl">
          Contact Me
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 lg:text-4xl">
          Sahidur Miah
        </h2>
        <h3 className="text-xl text-gray-600 mb-6 lg:text-3xl">
          Full-Stack Web Developer
        </h3>
        <p className="text-gray-700 text-lg leading-relaxed lg:text-2xl">
          I'm currently looking for new opportunities and would love to hear
          from you! Feel free to reach out to me via the contact information
          below.
        </p>
      </section>

      {/* Divider */}
      <hr className="border-t border-gray-200 my-8" />

      {/* Contact Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 lg:text-3xl">
          Contact Information
        </h2>

        <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200">
          {/* Phone Number */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Phone</h3>
            {isMobile ? (
              <a
                href="tel:+919366369724"
                className="text-blue-600 hover:text-blue-700 hover:underline text-lg font-medium transition-colors duration-200"
              >
                📞 Call Me: +91 9366369724
              </a>
            ) : (
              <p className="text-gray-700 text-lg">
                📞 Phone: +91 (9366369724 / 8798659968)
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Email</h3>
            <a
              href="mailto:sahidurmiah201920@gmail.com"
              className="text-blue-600 hover:text-blue-700 hover:underline text-lg font-medium transition-colors duration-200"
            >
              ✉️ sahidurmiah201920@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <hr className="border-t border-gray-200 my-8" />

      {/* Call to Action */}
      <section className="text-center">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
          <p className="text-blue-800 font-medium text-lg">
            I'm open to new opportunities - feel free to reach out anytime!
          </p>
        </div>
      </section>
    </div>
  );
}

export default Contact;
