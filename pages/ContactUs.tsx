import React from 'react';

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-8">Contact Us</h1>
        <p className="text-gray-500 mb-2">Support: <a href="mailto:worldmarketsupport@gmail.com" className="text-blue-600 font-bold hover:underline">worldmarketsupport@gmail.com</a></p>
        <p className="text-gray-500">WhatsApp: +923187536795</p>
      </div>
    </div>
  );
};

export default ContactUs;
