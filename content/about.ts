export type AboutContent = {
  shortTitle: string;
  shortText: string;
  photoCaption: string;
  heroSummary: string;
  skillsTitle: string;
  skillsText: string;
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
    "Зовут Виталий, родом из Краснодара. В дизайне уже 4 года. Работал с ребятами из hh, Magnit, Yandex, СОГАЗ и Stepik.",
  photoCaption: "Это я",
  heroSummary:
    "Обладаю всеми базовыми навыками дизайнера: провожу интервью, собираю сценарии, запускаю тесты. Активно применяю нейросети в работе и автоматизировал до 50% рутины.",
  skillsTitle: "Про скиллы",
  skillsText:
    "Обладаю сильной продуктовой базой: провожу интервью, формирую гипотезы, проектирую пользовательские сценарии и проверяю решения на тестах. Нейросети использую как рабочий инструмент для ускорения ресерча, прототипирования и подготовки контента, автоматизировал до 50% рутинных задач.",
  experienceTitle: "Про опыт работы",
  experienceText:
    "На данный момент работаю в студии Crauch. До этого был на проекте FeeDoom и Magnit. За плечами 4 года. Работал в рамках аутстаффа в продуктовых командах B2C и B2B, дорабатывал и участвовал в разработке мобильных приложений.",
  mediaTitle: "Про медиа и менторство",
  mediaText:
    "Веду канал на 650 человек, активно пишу статьи на Dsgners и VC. За 4 года помогал другим дизайнерам выходить из тупика и подтягивать знания.",
  socialLinks: {
    telegram: "https://t.me/nix_ux_view",
    dprofile: "https://dsgners.ru/nixnix",
    vc: "https://vc.ru/id4483143"
  }
} as const;
