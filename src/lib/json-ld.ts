import { COURSE, EXTRAS, FAQ, TARIFFS, TEACHER } from "./data";
import { SITE, SITE_URL } from "./site";

type JsonObject = Record<string, unknown>;

const PERSON_ID = `${SITE_URL}/#teacher`;
const COURSE_ID = `${SITE_URL}/#course`;

const offer = (
  name: string,
  description: string,
  amount: number,
): JsonObject => ({
  "@type": "Offer",
  name,
  description,
  price: amount,
  priceCurrency: "RUB",
  availability: "https://schema.org/InStock",
  url: `${SITE_URL}/#price`,
  category: "EducationalOccupationalProgram",
});

/**
 * Один @graph на страницу. Цены берутся из TARIFFS и EXTRAS: пока они
 * плейсхолдеры, микроразметка публикует именно их — заменить вместе с версткой.
 */
export function landingJsonLd(): JsonObject {
  const offers = [
    ...TARIFFS.map((t) => offer(t.name, t.unit, t.amount)),
    ...EXTRAS.map((e) => offer(e.title, e.note, e.amount)),
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE.name,
        inLanguage: "ru-RU",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: TEACHER.name,
        jobTitle: TEACHER.jobTitle,
        description: TEACHER.description,
        knowsAbout: [...TEACHER.knowsAbout],
        url: `${SITE_URL}/`,
      },
      {
        "@type": "Course",
        "@id": COURSE_ID,
        name: COURSE.name,
        description: COURSE.description,
        url: `${SITE_URL}/`,
        inLanguage: COURSE.language,
        provider: { "@id": PERSON_ID },
        educationalLevel: "Средняя школа, 9–11 класс",
        teaches: "Подготовка к ЕГЭ по русскому языку",
        offers,
        hasCourseInstance: [
          {
            "@type": "CourseInstance",
            courseMode: "Blended",
            courseWorkload: "PT4H",
            inLanguage: COURSE.language,
            instructor: { "@id": PERSON_ID },
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQ.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}

/** Экранируем «<», чтобы разметка не могла закрыть тег script. */
export const serializeJsonLd = (data: JsonObject) =>
  JSON.stringify(data).replace(/</g, "\\u003c");
