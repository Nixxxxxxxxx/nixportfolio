export type ResumeInlinePart = {
  text: string;
  strong?: boolean;
};

export type ResumeBulletLine = ResumeInlinePart[];

export type ResumeProject = {
  title: string;
  bullets: ResumeBulletLine[];
};

export type ResumeBadge =
  | {
      type: "image";
      src: string;
      alt: string;
    }
  | {
      type: "text";
      text: string;
      variant: "feedom" | "goodgoose";
    }
  | {
      type: "magnit";
    };

export type ResumeExperience = {
  company: string;
  role: string;
  period: string;
  tags: string[];
  badge: ResumeBadge;
  intro?: string;
  bullets?: ResumeBulletLine[];
  projects?: ResumeProject[];
};

export type ResumeData = {
  fullName: string;
  role: string;
  location: string;
  intro: string;
  contacts: {
    email: string;
    phone: string;
    telegram: string;
    channel: string;
    directTelegramLabel: string;
    directTelegramUrl: string;
  };
  experience: ResumeExperience[];
};

export const resumeData: ResumeData = {
  fullName: "Унанян Виталий",
  role: "Product Designer",
  location: "Краснодар",
  intro:
    "Я продуктовый дизайнер, работаю с B2B и B2C системами. Специализируюсь на сложных интерфейсах и исследовании пользовательских сценариев. Люблю задачи с большим объемом данных. Благодаря опыту во фронтенде понимаю не только UX/UI, но и техническую сторону реализации.",
  contacts: {
    email: "nixxxx443@gmail.com",
    phone: "+7 918 952 01 63",
    telegram: "@nixyaka",
    channel: "@nix_ux_view",
    directTelegramLabel: "@evanburns",
    directTelegramUrl: "https://t.me/evanburns"
  },
  experience: [
    {
      company: "Crauch / работяги",
      role: "Продуктовый дизайнер",
      period: "Апр. 2025 г - Настоящее время",
      tags: ["Аутстафф", "B2B", "B2C", "B2E"],
      badge: {
        type: "image",
        src: "/images/resume/crauch-badge.png",
        alt: "Crauch badge"
      },
      projects: [
        {
          title: "Яндекс Ярд",
          bullets: [
            [
              {
                text: "Спроектировал и довел до реализации платформу по обучению рекламным инструментам Яндекса"
              }
            ],
            [
              {
                text: "Доработал внутреннюю дизайн систему. Создал и согласовал внедрение новых компонентов, которые повысили скорость разработки в "
              },
              { text: "1.5 раза", strong: true }
            ],
            [
              { text: "Уменьшил время создания курса на " },
              { text: "22%", strong: true }
            ],
            [
              { text: "Сократил количество обращений в поддержку " },
              { text: "на 15%", strong: true }
            ]
          ]
        },
        {
          title: "СОГАЗ",
          bullets: [
            [
              {
                text: "Переработал сценарии онлайн страхования путешественников и квартир"
              }
            ],
            [
              {
                text: "После тестирование и выпуска обновленного интерфейса YoY повысился "
              },
              { text: "на 38%", strong: true },
              { text: " для путешествий и " },
              { text: "26%", strong: true },
              { text: " для квартир" }
            ]
          ]
        },
        {
          title: "HRLink",
          bullets: [
            [
              {
                text: "Спроектировал систему корпоративных новостей для пользователя и редактора"
              }
            ],
            [
              {
                text: "Выявил потребности пользователей при чтении и создании новостей"
              }
            ],
            [
              {
                text: "Уменьшил процент пропущенных важных новостей "
              },
              { text: "с 48% до 22%", strong: true }
            ],
            [
              {
                text: "Спроектировал удобный редактор новости и добавил ИИ интеграции, которые позволили повысить подготовку новостей на платформе "
              },
              { text: "до 64%", strong: true }
            ],
            [
              {
                text: "За счет ИИ функций сократил количество действий до публикации новости "
              },
              { text: "на 27%", strong: true }
            ]
          ]
        },
        {
          title: "hh.ru",
          bullets: [
            [
              {
                text: "Совместно со старшим дизайнером спроектировали B2E систему выдачи доступов для сотрудников"
              }
            ],
            [
              {
                text: "Уменьшили количество действий при прохождении сценария "
              },
              { text: "на 17%", strong: true }
            ]
          ]
        }
      ]
    },
    {
      company: "Feedom",
      role: "Продуктовый дизайнер",
      period: "Сен. 2024 - Апр. 2025",
      tags: ["B2C"],
      badge: {
        type: "text",
        text: "f \\",
        variant: "feedom"
      },
      intro:
        "Feedom - дочерняя компания застройщика, которая специализировалась на продажах квартир и котеджей в Краснодарском крае",
      bullets: [
        [
          {
            text: "Спроектировал сервис для застройщиков, позволяющий визуализировать доступные квартиры, что упростило работу менеджеров и ускорило процесс продаж "
          },
          { text: "на 20%", strong: true }
        ],
        [
          {
            text: "Провел юзабилити-тестирование итогового продукта, выявил ключевые проблемы и улучшил пользовательский опыт"
          }
        ],
        [
          {
            text: "Разработал калькулятор для отдела продаж, который автоматизировал расчеты и сократил количество ошибок"
          }
        ],
        [
          {
            text: "Создал админ-панель для управления сервисом, упростив и ускорив процесс обновления информации "
          },
          { text: "на 23%", strong: true }
        ]
      ]
    },
    {
      company: "GoodGoose",
      role: "UX/UI дизайнер",
      period: "Сен. 2024 - Апр. 2025",
      tags: ["Ecom", "B2C"],
      badge: {
        type: "text",
        text: "GG",
        variant: "goodgoose"
      },
      intro: "Была как фриланс занятость, принимал участие в точечных проектах",
      bullets: [
        [
          {
            text: "Спроектировал удобную систему навигации для быстрого поиска контактов, сократив среднее время поиска "
          },
          { text: "на 30%", strong: true },
          { text: "." }
        ],
        [
          {
            text: "Разработал сценарий вывода средств в мобильном приложении, минимизировав количество ошибок пользователей и повысив конверсию "
          },
          { text: "на 15%", strong: true }
        ],
        [
          {
            text: "С нуля разработал личный кабинет для оптового интернет магазина с возможностью мониторинга многомиллионных заказов"
          }
        ]
      ]
    },
    {
      company: "Magnit Tech",
      role: "Product designer ( проектная основа )",
      period: "Июнь 2023 - Янв. 2023",
      tags: ["B2E"],
      badge: {
        type: "magnit"
      },
      intro:
        "Внутренняя CRM система для учета и контроля заявок, очередей и работы с поставками",
      bullets: [
        [
          {
            text: "Работал над созданием прототипа CRM-системы, обеспечив удобство использования для сотрудников"
          }
        ],
        [
          {
            text: "Внедрил и поддерживал дизайн-систему, что ускорило разработку новых компонентов в 2 раза"
          }
        ],
        [
          {
            text: "Проводил A/B тестирование на сотрудниках отдела, находил и устранял UX-проблемы"
          }
        ],
        [
          {
            text: "Работал с разработчиками, тестировал и внедрял новые решения"
          }
        ]
      ]
    }
  ]
};
