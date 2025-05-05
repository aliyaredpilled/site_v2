import React, { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import YandexMap from "./YandexMap";
import { motion } from "framer-motion";

// ---------------------------------------------------------------------------
//  animation preset
// ---------------------------------------------------------------------------
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ---------------------------------------------------------------------------
//  ContactSection
// ---------------------------------------------------------------------------
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // imitate async request ---------------------------------------------------
    setTimeout(() => {
      toast.success(
        "Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время."
      );
      setFormData({ name: "", company: "", email: "", phone: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      className="py-12 md:py-16 bg-microsoft-white text-microsoft-gray-900"
    >
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        {/* ------------------------------------------------------------------ */}
        {/*  header                                                            */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 text-microsoft-blue">
            Свяжитесь с нами
          </h2>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-microsoft-gray-700">
            Свяжитесь любым удобным способом — мы подберём лучшее решение для вашего бизнеса.
          </p>
        </motion.div>

        {/* ------------------------------------------------------------------ */}
        {/*  content grid                                                      */}
        {/* ------------------------------------------------------------------ */}
        {/*
          lg:grid-cols-3 даёт одну узкую колонку (контакты) + две оставшиеся под карту.
          На больших экранах карта растягивается, контакты остаются компактными,
          так что пустоты посередине не остаётся.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* ----------------------------- contacts ------------------------- */}
          <motion.div
            className="space-y-10 lg:pr-4" // небольшая правая «подпорка» для отделения от карты
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold">Наши контакты</h3>

            {/* email ------------------------------------------------------- */}
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 shrink-0 text-microsoft-blue" />
              <div>
                <h4 className="font-semibold">Email</h4>
                <a
                  href="mailto:info@topson.ru"
                  className="text-microsoft-gray-700 hover:text-microsoft-blue transition"
                >
                  info@topson.ru
                </a>
              </div>
            </div>

            {/* phones ------------------------------------------------------ */}
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 shrink-0 text-microsoft-blue" />
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Телефон для связи</h4>
                  <a
                    href="tel:+79161282999"
                    className="block font-medium text-microsoft-gray-700 hover:text-microsoft-blue transition"
                  >
                    +7 916 128 29 99
                  </a>
                  <p className="text-sm text-microsoft-gray-500">
                    г. Москва, Сущевский вал, 49
                  </p>
                  <p className="text-sm text-microsoft-gray-500">
                    Бизнес-центр Jazz
                  </p>
                </div>
              </div>
            </div>

            {/* production -------------------------------------------------- */}
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 shrink-0 text-microsoft-blue" />
              <div>
                <h4 className="font-semibold">Адрес</h4>
                <p className="text-microsoft-gray-700">г. Москва, Сущевский вал, 49</p>
                <p className="text-microsoft-gray-700">Бизнес-центр Jazz</p>
              </div>
            </div>
          </motion.div>

          {/* ----------------------------- map ------------------------------ */}
          <motion.div
            className="lg:col-span-2"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold flex items-center mb-4">
              <MapPin size={18} className="mr-2 text-microsoft-blue" />
              Офис в Москве
            </h4>
            <div className="rounded-xl overflow-hidden shadow-lg border border-microsoft-gray-100 max-w-2xl mx-auto">
              <div className="w-full aspect-[16/9] max-h-[300px]">
                <YandexMap />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
