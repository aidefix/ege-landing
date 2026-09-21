/**
 * Весь статический контент лендинга. Источник истины — docs/prototype.html.
 * Плейсхолдеры в квадратных скобках заменяются перед публикацией.
 */

/* ——— ПРОГРАММА ——— */

export type ModuleKey = "m1" | "m2" | "m3" | "m4" | "m5";

export type ModuleTopic = {
  readonly title: string;
  readonly lessons: number;
};

export type CourseModule = {
  readonly key: ModuleKey;
  readonly name: string;
  /** Номера заданий ЕГЭ, которые закрывает модуль. */
  readonly tasks: string;
  readonly lessons: number;
  /** Цвет текста поверх заливки модуля: тёмные цвета требуют белого. */
  readonly textOnFill: "ink" | "white";
  readonly topics: readonly ModuleTopic[];
};

export const MODULES: readonly CourseModule[] = [
  {
    key: "m1",
    name: "Лексика и нормы",
    tasks: "1–8",
    lessons: 18,
    textOnFill: "ink",
    topics: [
      { title: "Ударение", lessons: 2 },
      { title: "Паронимы", lessons: 2 },
      { title: "Лексические нормы", lessons: 3 },
      { title: "Морфологические нормы", lessons: 4 },
      { title: "Синтаксические нормы", lessons: 5 },
      { title: "Средства связи", lessons: 2 },
    ],
  },
  {
    key: "m2",
    name: "Орфография",
    tasks: "9–15",
    lessons: 24,
    textOnFill: "white",
    topics: [
      { title: "Корни с чередованием", lessons: 3 },
      { title: "Приставки", lessons: 3 },
      { title: "Суффиксы имён", lessons: 4 },
      { title: "Суффиксы глаголов и причастий", lessons: 4 },
      { title: "Н и НН", lessons: 4 },
      { title: "НЕ и НИ", lessons: 3 },
      { title: "Слитно, раздельно, дефис", lessons: 3 },
    ],
  },
  {
    key: "m3",
    name: "Пунктуация",
    tasks: "16–21",
    lessons: 22,
    textOnFill: "ink",
    topics: [
      { title: "Однородные члены", lessons: 3 },
      { title: "Обособленные определения", lessons: 4 },
      { title: "Обособленные обстоятельства", lessons: 3 },
      { title: "Вводные и обращения", lessons: 3 },
      { title: "Сложноподчинённое", lessons: 4 },
      { title: "Тире и двоеточие", lessons: 3 },
      { title: "Пунктуационный анализ", lessons: 2 },
    ],
  },
  {
    key: "m4",
    name: "Текст",
    tasks: "22–26",
    lessons: 8,
    textOnFill: "white",
    topics: [
      { title: "Смысловой анализ", lessons: 2 },
      { title: "Типы речи", lessons: 2 },
      { title: "Средства связи предложений", lessons: 2 },
      { title: "Языковые средства", lessons: 2 },
    ],
  },
  {
    key: "m5",
    name: "Сочинение",
    tasks: "27",
    lessons: 22,
    textOnFill: "white",
    topics: [
      { title: "Как найти проблему", lessons: 3 },
      { title: "Комментарий и примеры", lessons: 6 },
      { title: "Смысловая связь", lessons: 4 },
      { title: "Позиция автора", lessons: 2 },
      { title: "Своя позиция и обоснование", lessons: 4 },
      { title: "Композиция и речь", lessons: 3 },
    ],
  },
];

export function moduleByKey(key: ModuleKey): CourseModule {
  const found = MODULES.find((m) => m.key === key);
  if (!found) throw new Error(`Неизвестный модуль: ${key}`);
  return found;
}

/* ——— HERO ——— */

export type HeroStat = {
  readonly value: string;
  readonly caption: string;
};

export type CallToAction = {
  readonly label: string;
  readonly href: string;
};

export const HERO = {
  kick: "✦ набор на [ГОД] открыт ✦",
  /** Первая строка набрана хромом, во второй обведена «последним». */
  titleChrome: "РУССКИЙ",
  titleLines: ["сдают все.", "Готовят "] as const,
  titleCircled: "последним",
  titleTail: ".",
  lead: {
    before: "Авторский курс [ИМЯ]. ",
    marked: "94 занятия",
    after:
      ", из них 22 — только сочинение. Остальное вы уже проходили, просто пока не умеете этим пользоваться.",
  },
  cta: [
    { label: "Пройти 5 заданий", href: "#quiz" },
    { label: "Посмотреть программу", href: "#prog" },
  ] as const satisfies readonly CallToAction[],
  stats: [
    { value: "94", caption: "занятия" },
    { value: "22", caption: "из них сочинение" },
    { value: "8", caption: "макс. в группе" },
    { value: "[N]", caption: "выпусков" },
  ] as const satisfies readonly HeroStat[],
} as const;

/* ——— КОМУ ПОДХОДИТ ——— */

export type Level = {
  readonly key: ModuleKey;
  readonly title: string;
  readonly score: string;
  readonly text: string;
};

export const LEVELS: readonly Level[] = [
  {
    key: "m1",
    title: "С нуля",
    score: "до 55 баллов",
    text: "«Ничего не понимаю» — это нормальная отправная точка. Начинаем с орфографии, темп ниже, больше повторов. Сочинение подключается со второго месяца, а не сразу.",
  },
  {
    key: "m3",
    title: "Нужен рывок",
    score: "60–75 баллов",
    text: "Первую часть вы в целом тянете, а теряете на пунктуации и сочинении. Самая частая история и самый заметный прирост: там же и лежат основные баллы.",
  },
  {
    key: "m5",
    title: "Шлифовка",
    score: "80+ баллов",
    text: "Базу трогать не будем. Разбираем спорные случаи, где даже справочники расходятся, и вытягиваем сочинение на максимум по каждому критерию.",
  },
];

export const NOT_FOR = {
  title: "Кому не подойдёт.",
  text: "Тем, кто рассчитывает не делать домашние задания. Без самостоятельной работы занятия превращаются в пересказ учебника, а это трата ваших денег и моего времени. Так тоже бывает, просто не ко мне.",
} as const;

/* ——— РЕЗУЛЬТАТЫ ——— */

export type ResultRow = {
  readonly before: number;
  readonly after: number;
};

/** Выпуск [ГОД], 12 учеников. Пунктиром рисуются те, у кого after <= before. */
export const RESULTS: readonly ResultRow[] = [
  { before: 58, after: 84 },
  { before: 71, after: 89 },
  { before: 44, after: 67 },
  { before: 63, after: 81 },
  { before: 79, after: 94 },
  { before: 52, after: 70 },
  { before: 66, after: 77 },
  { before: 74, after: 85 },
  { before: 61, after: 79 },
  { before: 48, after: 72 },
  { before: 69, after: 66 },
  { before: 55, after: 58 },
];

export const RESULTS_AXIS = {
  from: "входной балл",
  to: "результат ЕГЭ",
  ticks: [40, 60, 80, 100],
} as const;

/* ——— ТАРИФЫ ——— */

export type TariffFeature = {
  readonly label: string;
  readonly included: boolean;
};

export type Tariff = {
  readonly id: string;
  /** Ключ модуля используется только как источник цвета шапки. */
  readonly accent: ModuleKey;
  readonly name: string;
  readonly price: string;
  /** Та же сумма числом — для микроразметки Offer. */
  readonly amount: number;
  readonly unit: string;
  readonly best: boolean;
  readonly features: readonly TariffFeature[];
};

export const TARIFFS: readonly Tariff[] = [
  {
    id: "self",
    accent: "m2",
    name: "Сам",
    price: "12 900 ₽",
    amount: 12900,
    unit: "за весь курс, доступ до экзамена",
    best: false,
    features: [
      { label: "Все материалы курса", included: true },
      { label: "Домашние с ключами", included: true },
      { label: "Занятия", included: false },
      { label: "Проверка сочинений", included: false },
      { label: "Личный план", included: false },
    ],
  },
  {
    id: "group",
    accent: "m3",
    name: "Группа",
    price: "6 900 ₽",
    amount: 6900,
    unit: "в месяц · 59 000 ₽ за год",
    best: true,
    features: [
      { label: "Все материалы курса", included: true },
      { label: "2 занятия в неделю, до 8 человек", included: true },
      { label: "2 сочинения в месяц", included: true },
      { label: "Записи занятий", included: true },
      { label: "Личный план", included: false },
    ],
  },
  {
    id: "solo",
    accent: "m5",
    name: "Один на один",
    price: "3 800 ₽",
    amount: 3800,
    unit: "за занятие · пакет из 8 — 28 000 ₽",
    best: false,
    features: [
      { label: "Все материалы курса", included: true },
      { label: "Занятия по вашему расписанию", included: true },
      { label: "Проверка всех сочинений", included: true },
      { label: "Личный план подготовки", included: true },
      { label: "Связь между занятиями", included: true },
    ],
  },
];

/** Индекс тарифа, выбранного по умолчанию. */
export const DEFAULT_TARIFF_INDEX = 1;

export const PRICING_COPY = {
  bestBadge: "берут чаще",
  select: "Выбрать",
  requisites: (fullName: string, inn: string) =>
    `Реквизиты: ${fullName}, ИНН ${inn}.`,
} as const;

export const PROGRAM_COPY = {
  lessons: (count: number) => `${count} занятий`,
} as const;

/* ——— ДОП. ФОРМАТЫ ——— */

export type ExtraFormat = {
  readonly id: string;
  readonly accent: "acid" | "sun";
  readonly title: string;
  readonly note: string;
  readonly price: string;
  readonly amount: number;
};

export const EXTRAS: readonly ExtraFormat[] = [
  {
    id: "essay-only",
    accent: "acid",
    title: "Только сочинение",
    note: "6 занятий + 4 персональных разбора",
    price: "12 000 ₽",
    amount: 12000,
  },
  {
    id: "diagnostics",
    accent: "sun",
    title: "Диагностика",
    note: "40 минут и честный ответ, что вам нужно",
    price: "1 500 ₽",
    amount: 1500,
  },
];

/* ——— ЮРИДИЧЕСКОЕ ——— */

export const LEGAL = {
  terms: [
    "Оплата по чеку самозанятого, договор высылается до первого занятия.",
    "Рассрочка на группу — помесячно без процентов.",
    "Отмена за 12 часов переносится бесплатно, позже списывается.",
    "Возврат за неиспользованные занятия в течение 10 дней.",
  ],
  requisites: {
    fullName: "[ФИО]",
    inn: "[ИНН]",
  },
} as const;

export type LegalPageKey = "privacy" | "consent" | "offer";

export type LegalPage = {
  readonly href: string;
  /** Заголовок страницы и подпись ссылки в подвале. */
  readonly title: string;
  /** Форма для середины предложения: «принимаю ...». */
  readonly short: string;
  /** Рыба: заголовки разделов, текст под них даёт заказчик. */
  readonly sections: readonly string[];
};

export const LEGAL_PAGES: Record<LegalPageKey, LegalPage> = {
  privacy: {
    href: "/privacy",
    title: "Политика конфиденциальности",
    short: "политику конфиденциальности",
    sections: [
      "Кто обрабатывает данные",
      "Какие данные собираются и зачем",
      "Правовые основания обработки",
      "Кому данные передаются",
      "Сроки хранения и удаление",
      "Права субъекта и как их реализовать",
      "Куки и аналитика",
      "Контакты для обращений",
    ],
  },
  consent: {
    href: "/consent",
    title: "Согласие на обработку персональных данных",
    short: "согласие на обработку персональных данных",
    sections: [
      "Кому даётся согласие",
      "Перечень персональных данных",
      "Цели обработки",
      "Перечень действий с данными",
      "Срок действия и порядок отзыва",
    ],
  },
  offer: {
    href: "/offer",
    title: "Договор оферты",
    short: "оферту",
    sections: [
      "Предмет договора",
      "Стоимость и порядок оплаты",
      "Расписание, отмены и переносы",
      "Возврат денежных средств",
      "Ответственность сторон",
      "Реквизиты исполнителя",
    ],
  },
};

export const LEGAL_STUB = {
  badge: "черновик",
  notice:
    "Это заготовка страницы. Текст предоставит заказчик — до публикации раздел должен быть заполнен юридически корректной редакцией.",
  placeholder: "[ТЕКСТ РАЗДЕЛА]",
  back: "← на главную",
} as const;

/* ——— КОНТАКТЫ ——— */

export const CONTACTS = {
  teacher: "[ИМЯ]",
  telegram: { label: "Написать в телеграм", href: "https://t.me/[ТЕЛЕГРАМ]" },
  signup: { label: "Записаться", href: "#lead" },
} as const satisfies {
  teacher: string;
  telegram: CallToAction;
  signup: CallToAction;
};

/* ——— ТЕКСТЫ СЕКЦИЙ ——— */

export type SectionCopy = {
  readonly id: string;
  readonly tag: string;
  readonly title: string;
  readonly lead: string;
};

export const SECTIONS = {
  exam: {
    id: "exam",
    tag: "где реально теряются баллы",
    title: "Одно задание весит больше, чем восемь",
    lead: "Сверху — сколько заданий в блоке. Снизу — сколько они стоят в баллах. Разница объясняет, почему курс устроен именно так.",
  },
  quiz: {
    id: "quiz",
    tag: "проверь себя",
    title: "Пять заданий, чтобы понять, где вы сейчас",
    lead: "Контакты не нужны, результат не закрыт формой. После каждого ответа — объяснение правила. Ровно так разбираются задания на занятиях.",
  },
  who: {
    id: "who",
    tag: "честно про старт",
    title: "С любого уровня, но по-разному",
    lead: "Программа одна, темп и точка входа — разные. На диагностике решаем, куда вас ставить.",
  },
  prog: {
    id: "prog",
    tag: "что и сколько",
    title: "Программа курса",
    lead: "Не «пройдём всё», а сколько занятий уходит на каждую тему. Нажмите на блок.",
  },
  doc: {
    id: "doc",
    tag: "как возвращается работа",
    title: "Сочинение с пометками на полях",
    lead: "Не «плохо», а какое правило нарушено и что с этим делать. Нажмите на подчёркнутое слово или на номер ошибки.",
  },
  res: {
    id: "res",
    tag: "выпуск [ГОД]",
    title: "Было → стало, а не средний балл",
    lead: "Двенадцать учеников. Наклон линии — это и есть работа за год.",
  },
  price: {
    id: "price",
    tag: "сколько это стоит",
    title: "Три формата",
    lead: "Цены — плейсхолдеры, заменить на реальные до публикации.",
  },
} as const satisfies Record<string, SectionCopy>;

export const NOTES = {
  exam: {
    strong: "Сочинение — одно задание из двадцати семи и примерно треть всех баллов.",
    text: " Его нельзя выучить за неделю. Поэтому в курсе оно идёт с первого месяца параллельно с первой частью, а не блоком в мае, когда уже поздно.",
  },
  results:
    "Двое из двенадцати до цели не дотянули: один начал в марте, второй систематически не сдавал сочинения. Их линии нарисованы пунктиром и с графика не убраны.",
} as const;

export const FINAL = {
  title: "Начните с диагностики, а не с оплаты курса",
  text: "Сорок минут: входной срез, разбор слабых мест и честный ответ, подходит ли вам этот формат. И подходите ли вы ему.",
} as const;

/* ——— ЗАЯВКА ——— */

export const GRADE_VALUES = ["9", "10", "11", "graduate"] as const;
export type GradeValue = (typeof GRADE_VALUES)[number];

export const LEVEL_VALUES = ["zero", "boost", "polish", "unknown"] as const;
export type LevelValue = (typeof LEVEL_VALUES)[number];

export type Option<T extends string> = {
  readonly value: T;
  readonly label: string;
};

export const GRADE_OPTIONS: readonly Option<GradeValue>[] = [
  { value: "9", label: "9 класс" },
  { value: "10", label: "10 класс" },
  { value: "11", label: "11 класс" },
  { value: "graduate", label: "Выпускник" },
];

export const LEVEL_OPTIONS: readonly Option<LevelValue>[] = [
  { value: "zero", label: "С нуля, до 55 баллов" },
  { value: "boost", label: "Нужен рывок, 60–75" },
  { value: "polish", label: "Шлифовка, 80+" },
  { value: "unknown", label: "Не знаю, нужен срез" },
];

/** Подпись чекбокса согласия: текст вперемешку со ссылками на юр. страницы. */
export type ConsentSegment =
  | { readonly kind: "text"; readonly text: string }
  | { readonly kind: "link"; readonly page: LegalPageKey };

export const LEAD_CONSENT: readonly ConsentSegment[] = [
  { kind: "text", text: "Даю " },
  { kind: "link", page: "consent" },
  { kind: "text", text: " и принимаю " },
  { kind: "link", page: "privacy" },
  { kind: "text", text: "." },
];

export const LEAD = {
  id: "lead",
  tag: "заявка на диагностику",
  title: "Сорок минут, чтобы понять, стоит ли начинать",
  lead: "Заполните форму — отвечу в течение дня и предложу время. Диагностика ни к чему не обязывает: после неё вы решаете сами.",
  fields: {
    parentName: {
      label: "Ваше имя",
      placeholder: "Как к вам обращаться",
    },
    studentName: {
      label: "Имя ученика",
      placeholder: "Если записываете ребёнка",
    },
    contact: {
      label: "Телефон или телеграм",
      placeholder: "+7 999 000-00-00 или @username",
    },
    grade: { label: "Класс" },
    level: { label: "Текущий уровень" },
    comment: {
      label: "Комментарий",
      placeholder:
        "Что уже пробовали, где просаживается, когда удобно заниматься",
    },
  },
  selectPlaceholder: "Выберите",
  submit: "Отправить заявку",
  submitting: "Отправляю",
  hint: "отвечаю в течение дня",
  success: {
    title: "Заявка ушла",
    text: "Напишу или позвоню в течение дня и предложу время диагностики. Если ответа нет к завтрашнему вечеру — значит, заявка потерялась, напишите в телеграм.",
  },
  error: {
    title: "Не отправилось",
    text: "Заявка не дошла: сервер не принял её. Ничего не потеряно — напишите в телеграм, отвечу там же.",
    retry: "Попробовать ещё раз",
  },
  errors: {
    rateLimited:
      "С этого адреса уже пришло три заявки. Если это вы — напишите в телеграм, так быстрее.",
  },
} as const;

/* ——— ПОДВАЛ ——— */

export const FOOTER = {
  teacher: "Авторский курс подготовки к ЕГЭ по русскому языку, [ИМЯ]",
  requisites: "[ФИО], ИНН [ИНН]",
  links: ["offer", "privacy", "consent"] as readonly LegalPageKey[],
} as const;

/* ——— ВОПРОСЫ ——— */

export type FaqItem = {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
};

/**
 * Тексты видны на странице — это условие Google для разметки FAQPage.
 * Прятать ответы и оставлять микроразметку нельзя.
 */
export const FAQ: readonly FaqItem[] = [
  {
    id: "start",
    question: "Поздно начинать в середине года?",
    answer:
      "Начать можно в любой момент, но программа рассчитана на 94 занятия. Если вы заходите в январе, мы не пройдём всё: на диагностике решаем, что режем, и я честно говорю, какой результат реалистичен к экзамену.",
  },
  {
    id: "group",
    question: "Чем группа отличается от занятий один на один?",
    answer:
      "Программа одна и та же. В группе до 8 человек, два занятия в неделю и два сочинения в месяц с проверкой. Один на один — ваш темп, ваше расписание и проверка всех сочинений без ограничения по количеству.",
  },
  {
    id: "homework",
    question: "Сколько времени уходит на домашние задания?",
    answer:
      "Три-четыре часа в неделю, из них примерно час на сочинение. Без домашних заданий занятия превращаются в пересказ учебника, поэтому тех, кто не планирует их делать, я не беру.",
  },
  {
    id: "essay",
    question: "Как проверяются сочинения?",
    answer:
      "По критериям ФИПИ, с пометками на полях: какое правило нарушено и что вместо этого. Не «плохо», а конкретная правка, которую можно повторить самостоятельно.",
  },
  {
    id: "guarantee",
    question: "Вы гарантируете баллы?",
    answer:
      "Нет. Гарантировать результат экзамена, который зависит и от вашей работы тоже, нечестно. Есть статистика выпуска: она на странице выше, вместе с теми, кто до цели не дотянул.",
  },
  {
    id: "miss",
    question: "Что если пропустить занятие?",
    answer:
      "Отмена за 12 часов переносится бесплатно, позже — списывается. Записи занятий в группе сохраняются, домашнее задание и материалы приходят в любом случае.",
  },
];

export const FAQ_SECTION = {
  id: "faq",
  tag: "что обычно спрашивают",
  title: "Вопросы",
  lead: "Если ответа на ваш вопрос здесь нет — напишите в телеграм, отвечу лично.",
} as const;

/* ——— ПРЕПОДАВАТЕЛЬ (для микроразметки) ——— */

export const TEACHER = {
  name: "[ИМЯ]",
  jobTitle: "Преподаватель русского языка, подготовка к ЕГЭ",
  description:
    "Частный преподаватель русского языка. Авторский курс подготовки к ЕГЭ: первая часть и сочинение параллельно с первого месяца.",
  knowsAbout: [
    "Русский язык",
    "ЕГЭ по русскому языку",
    "Сочинение ЕГЭ",
    "Орфография",
    "Пунктуация",
  ],
} as const;

export const COURSE = {
  name: "Авторский курс подготовки к ЕГЭ по русскому языку",
  description:
    "94 занятия, из них 22 — только сочинение. Первая часть и сочинение идут параллельно с первого месяца. Группы до 8 человек, индивидуальные занятия, проверка сочинений по критериям ФИПИ.",
  /** Продолжительность курса в формате ISO 8601. */
  duration: "P9M",
  language: "ru",
  mode: "Blended",
} as const;
