import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ucmzioa",
        "template_kdz0ctf",
        form.current,
        "_ZM6fRiaZmXleJEMu"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          setIsMessageSent(true);
          setErrorMessage("");

          setFormData({
            user_name: '',
            user_email: '',
            message: ''
          });

          setTimeout(() => {
            setIsMessageSent(false);
          }, 3000);
        },
        (error) => {
          console.log(error.text);
          setIsMessageSent(false);
          setErrorMessage("Error sending message. Please try again later.");

          setTimeout(() => {
            setErrorMessage('');
          }, 3000);
        }
      );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <section className="py-16 lg:section mt-10" id="contact">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row">
          <motion.div
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="flex-1 flex justify-start items-center"
          >
            <div>
              <h4 className="text-xl uppercase text-accent font-medium mb-2 tracking-wide">
                Get in touch
              </h4>
              <h2 className="text-[45px] lg:text-[90px] leading-none mb-12">
                Let's work <br /> together!
              </h2>
            </div>
          </motion.div>
          <motion.form
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            ref={form}
            onSubmit={sendEmail}
            className="flex-1 border rounded-2xl flex flex-col gap-y-6 pb-24 p-6 items-start"
          >
            <input
              className="bg-transparent border-b py-3 outline-none w-full placeholder:text-white focus:border-accent transition-all"
              type="text"
              name="user_name"
              placeholder="Your name"
              value={formData.user_name}
              onChange={handleInputChange}
            />
            <input
              className="bg-transparent border-b py-3 outline-none w-full placeholder:text-white focus:border-accent transition-all"
              type="email"
              name="user_email"
              placeholder="Your email"
              value={formData.user_email}
              onChange={handleInputChange}
            />
            <textarea
              className="bg-transparent border-b py-12 outline-none w-full placeholder:text-white focus:border-accent transition-all resize-none mb-12"
              placeholder="Your message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
            ></textarea>
            <button type="submit" className="btn btn-lg">
              Send message
            </button>
          </motion.form>
        </div>
      </div>

      {isMessageSent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-purple-500 p-8 rounded-lg">
            <p className="text-white text-bold">Message sent successfully!</p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-red-500 p-8 rounded-lg">
            <p className="text-white text-bold">{errorMessage}</p>
          </div>
        </div>
      )}

    </section>
  );
};

export default Contact;
