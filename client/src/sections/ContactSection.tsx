import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useAnimation } from "../hooks/use-animation";
import { FaTelegram, FaGithub } from "react-icons/fa";
import { 
  MapPin, Mail, Copy, CheckCheck, 
  ArrowUpRight, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  const { t } = useTranslation();
  const { ref, controls } = useAnimation();
  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);

  // Контактная информация
  const contactInfo = [
    {
      icon: <Mail className="text-primary" />,
      label: t("contact.info.email.label"),
      value: "vadim.fullstack@gmail.com",
      link: "mailto:vadim.fullstack@gmail.com",
      copyable: true,
      id: "email"
    },
    {
      icon: <MapPin className="text-primary" />,
      label: t("contact.info.location.label"),
      value: "Волгоград, Россия",
      copyable: false,
      id: "location"
    }
  ];

  // Социальные сети и мессенджеры
  const socialLinks = [
    { 
      icon: <FaTelegram className="text-xl" />, 
      href: "https://t.me/DevWebFullstack", 
      label: "Telegram",
      color: "rgba(0, 136, 204, 0.2)",
      helperText: "Предпочтительный способ связи"
    },
    { 
      icon: <FaGithub className="text-xl" />, 
      href: "https://github.com/reshenieZadachek", 
      label: "GitHub",
      color: "rgba(36, 41, 47, 0.2)",
      helperText: "Мои проекты и код"
    }
  ];

  // Функция копирования в буфер обмена
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
      
      toast({
        title: "Скопировано!",
        description: `${text} скопирован в буфер обмена`,
        duration: 3000,
      });
    });
  };

  // URL для отправки сообщения через Telegram бота
  const getTelegramBotUrl = () => {
    const botId = "YOUR_BOT_ID"; // Замените на ID вашего бота
    const chatId = "YOUR_CHAT_ID"; // Замените на ID чата, куда будут приходить сообщения
    return `https://t.me/DevWebFullstack`;
  };

  return (
    <section ref={ref} id="contact" className="py-20 bg-background relative overflow-hidden">
      {/* Фоновые декоративные элементы */}
      <div className="absolute top-20 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full filter blur-3xl opacity-50 z-0" />
      <div className="absolute bottom-20 right-0 w-1/4 h-1/4 bg-primary/5 rounded-full filter blur-3xl opacity-50 z-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={controls}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("contact.title.first")} <span className="text-primary">{t("contact.title.highlight")}</span>
          </motion.h2>
          
          <motion.div 
            className="h-1 w-20 bg-primary mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
          
          <motion.p 
            className="text-muted-foreground mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {t("contact.description")}
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Контактная информация */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={controls}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="bg-gradient-to-br from-background to-muted/10 p-8 rounded-2xl shadow-lg border border-muted/30 h-full"
              whileHover={{ boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            >
              <motion.h3 
                className="text-2xl font-bold mb-8 flex items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Mail className="text-primary mr-2" size={20} />
                {t("contact.info.title")}
              </motion.h3>
              
              <motion.div 
                className="space-y-8 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {contactInfo.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 500, damping: 17 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 transition-colors group-hover:bg-primary/20"
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-muted-foreground text-sm">{item.label}</p>
                      {item.link ? (
                        <a 
                          href={item.link} 
                          className="hover:text-primary transition-colors flex items-center"
                        >
                          {item.value}
                          <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        <p>{item.value}</p>
                      )}
                    </div>
                    {item.copyable && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-8 h-8"
                        onClick={() => copyToClipboard(item.value, item.id)}
                        title="Скопировать"
                      >
                        {copied === item.id ? (
                          <CheckCheck className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Сообщение о Telegram боте */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8 p-4 bg-primary/5 rounded-lg border border-primary/10"
              >
                <h4 className="font-medium mb-2 flex items-center">
                  <FaTelegram className="mr-2 text-primary" />
                  Быстрая связь через Telegram
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Отправьте мне сообщение в Telegram для быстрого ответа
                </p>
                <Button asChild>
                  <a 
                    href={getTelegramBotUrl()} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center"
                  >
                    Написать в Telegram
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
              
              {/* Социальные сети */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h4 className="text-xl font-semibold mb-6">{t("contact.social.title")}</h4>
                <div className="grid grid-cols-1 gap-3">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.label}
                      className="flex items-center p-3 rounded-xl bg-muted/20 hover:bg-muted/30 group transition-all"
                      whileHover={{ 
                        y: -3, 
                        backgroundColor: link.color,
                        transition: { duration: 0.2 }
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center mr-3">
                        {link.icon}
                      </div>
                      <div>
                        <span className="font-medium">{link.label}</span>
                        <p className="text-xs text-muted-foreground mt-1">{link.helperText}</p>
                      </div>
                      <ArrowUpRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Информация о разработке */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={controls}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div 
              className="bg-gradient-to-br from-muted/10 to-muted/5 rounded-xl p-8 shadow-lg border border-muted/20 h-full"
              whileHover={{ boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            >
              <motion.h3 
                className="text-xl font-bold mb-6 flex items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <FaTelegram className="text-primary mr-2" />
                О сотрудничестве
              </motion.h3>
              
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="p-4 rounded-lg bg-muted/20 border border-muted/30">
                  <h4 className="font-medium mb-2">Услуги</h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Разработка веб-приложений полного цикла</li>
                    <li>Создание корпоративных сайтов и лендингов</li>
                    <li>Разработка CRM и админ-панелей</li>
                    <li>Интеграция API и платежных систем</li>
                    <li>Техническая поддержка и сопровождение</li>
                  </ul>
                </div>
                
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <h4 className="font-medium mb-2">Процесс работы</h4>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Обсуждение требований и целей проекта</li>
                    <li>Составление технического задания</li>
                    <li>Оценка сроков и стоимости</li>
                    <li>Разработка и регулярные демонстрации</li>
                    <li>Тестирование и внесение правок</li>
                    <li>Запуск проекта и поддержка</li>
                  </ol>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/20 border border-muted/30">
                  <h4 className="font-medium mb-2">Уникальные решения</h4>
                  <p className="text-muted-foreground mb-3">
                    Для проектов, требующих высокой производительности, использую собственный JavaScript движок, который:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Значительно ускоряет работу приложений</li>
                    <li>Уменьшает потребление ресурсов</li>
                    <li>Улучшает отзывчивость интерфейса</li>
                    <li>Оптимизирует загрузку данных</li>
                  </ul>
                </div>
                
                <Button 
                  asChild
                  className="w-full mt-4"
                >
                  <a 
                    href={getTelegramBotUrl()} 
                    target="_blank" 
                    rel="noreferrer"
                    className="relative overflow-hidden group"
                  >
                    <motion.span
                      className="absolute inset-0 bg-primary/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="flex items-center justify-center">
                      <FaTelegram className="mr-2" />
                      Обсудить проект
                    </span>
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
