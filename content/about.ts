export type AboutContent = {
  shortTitle: string;
  shortText: string;
  photoCaption: string;
  heroSummary: string;
  skillsTitle: string;
  skillsText: string;
  skills: readonly string[];
  experienceTitle: string;
  experienceText: string;
  mediaTitle: string;
  mediaText: string;
  socialLinks: {
    telegram: string;
    dprofile: string;
    vc: string;
  };
};

export const aboutContent: AboutContent = {
  shortTitle: "Кратко",
  shortText:
    "Зовут Виталий, родом из Краснодара. В дизайне уже 4 года. Работал с ребятами из hh, Magnit, Yandex, СОГАЗ и Stepik. Также прикладывал руку к другим продуктовым командам и системам.",
  photoCaption: "Это я",
  heroSummary:
    "Обладаю всеми базовыми навыками дизайнера: провожу интервью, собираю сценарии, запускаю тесты. Активно применяю нейросети в работе и автоматизировал до 50% рутины.",
  skillsTitle: "Про скиллы",
  skillsText:
    "Обладаю всеми базовыми навыками дизайнера: провожу интервью, собираю сценарии и запускаю тесты. Активно применяю нейросети в работе и автоматизировал до 50% рутины.",
  skills: [
    "Интервью",
    "Ресерч",
    "Копирайт",
    "Идеи",
    "+9 навыков"
  ],
  experienceTitle: "Про опыт работы",
  experienceText:
    "На данный момент работаю в студии Crauch. До этого был на проекте FeeDoom и Magnit. За плечами 4 года. Работал в рамках аутстаффа в продуктовых командах B2C и B2B, дорабатывал и участвовал в разработке мобильных приложений.",
  mediaTitle: "Про медиа и менторство",
  mediaText:
    "Веду канал на 650 человек, активно пишу статьи на Dsgners и VC. За 4 года помогал другим дизайнерам выходить из тупика и подтягивать знания.",
  socialLinks: {
    telegram: "https://t.me/nixyaka",
    dprofile: "https://dprofile.ru/",
    vc: "https://vc.ru/"
  }
} as const;
