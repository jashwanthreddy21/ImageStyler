import { Mail, Github, Twitter, MapPin } from "lucide-react";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    // Replace these with your actual EmailJS credentials
    const SERVICE_ID = "service_75syxjt";
    const TEMPLATE_ID = "template_ogksbpu";
    const PUBLIC_KEY = "FvzuQWq15Gx2R54NQ";

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(
        (result) => {
          console.log(result.text);
          setStatus("success");
          form.current.reset();
          setTimeout(() => setStatus(""), 5000);
        },
        (error) => {
          console.log(error.text);
          setStatus("error");
          setTimeout(() => setStatus(""), 5000);
        }
      );
  };

  return (
    <section id="contact-us" className="bg-gray-800 py-20 px-6 md:px-12 w-full flex flex-col items-center">
      <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-12 text-center">
        Get in Touch
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl">
        {/* Contact Information */}
        <div className="flex flex-col space-y-8 bg-gray-900/50 p-8 rounded-2xl shadow-xl border border-gray-700/50">
          <h3 className="text-2xl font-bold text-white mb-2">Contact Information</h3>
          <p className="text-gray-400 mb-6">Have questions about our AI models or API pricing? Reach out to us!</p>
          
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Mail className="text-purple-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Email Us</p>
              <p className="text-lg text-white font-medium">nandyalajyothirmayireddy@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Github className="text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400">GitHub</p>
              <p className="text-lg text-white font-medium hover:text-blue-400 cursor-pointer transition">github.com/neuroartify</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-500/20 rounded-lg">
              <MapPin className="text-red-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Location</p>
              <p className="text-lg text-white font-medium">DSU, Samyapuram, Trichy, Tamil Nadu, India - 621112</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-900/50 p-8 rounded-2xl shadow-xl border border-gray-700/50">
          <form ref={form} className="flex flex-col space-y-4" onSubmit={sendEmail}>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Your Name</label>
              <input 
                name="user_name" 
                type="text" 
                required 
                placeholder="John Doe" 
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
              <input 
                name="user_email" 
                type="email" 
                required 
                placeholder="john@example.com" 
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
              <textarea 
                name="message" 
                rows="4" 
                required 
                placeholder="How can we help you?" 
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              ></textarea>
            </div>
            <button 
              disabled={status === "sending"}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition transform hover:-translate-y-1 mt-4 disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
            
            {status === "success" && (
              <p className="text-green-400 text-sm mt-2 text-center font-medium">Message sent successfully!</p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm mt-2 text-center font-medium">Failed to send message. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
