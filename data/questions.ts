export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number | string
  explanation?: string
  image?: string
  category?: string
}

// Create a comprehensive pool of questions for the driving license exam
export const allQuestions: Question[] = [
  // Questions with road signs (ibyapa) from the provided images
  {
    id: 1,
    question: "Ikinyabiziga cyose cyangwa ibinyabiziga bigenda bigomba kugira:",
    options: ["Umuyobozi", "Umuherekeza", "A na B ni ibisubizo by'ukuri", "Nta gisubizo cy'ukuri kirimo"],
    correctAnswer: "Umuyobozi",
    image: null,
  },
  {
    id: 2,
    question: "Ahatari mu nsisiro umuvuduko ntarengwa mu isaha wa velomoteri ni:",
    options: ["Km50", "Km40", "Km30", "Nta gisubizo cy'ukuri"],
    correctAnswer: "Km50",
    image: null,
  },
  {
    id: 3,
    question: "Iyo nta mategeko awugabanya by'umwihariko, umuvuduko ntarengwa w'amapikipiki mu isaha ni:",
    options: ["Km25", "Km70", "Km40", "Nta gisubizo cy'ukuri kirimo"],
    correctAnswer: "Km70",
    image: null,
  },
  {
    id: 4,
    question: "Iyo harimo indi myanya birabujijwe gutwara ku ntebe y'imbere y'imodoka abana badafite imyaka:",
    options: ["Imyaka 10", "Imyaka 12", "Imyaka 7", "Ntagisubizo cy'ukuri kirimo"],
    correctAnswer: "Imyaka 12",
    image: null,
  },
  {
    id: 5,
    question: "Kunyuranaho bikorerwa:",
    options: [
      "Mu ruhande rw'iburyo gusa",
      "Igihe cyose ni ibumoso",
      "Iburyo iyo unyura ku nyamaswa",
      "Nta gisubizo cy'ukuri kirimo",
    ],
    correctAnswer: "Igihe cyose ni ibumoso",
    image: null,
  },
  {
    id: 6,
    question: "Iki cyapa gisobanura iki?",
    options: [
      "a) Hanyurwa na velomoteri gusa",
      "b) Nta modoka",
      "c) Hanyurwa n'imodoka gusa",
      "d) Ntihanyurwa n'amapikipiki",
    ],
    correctAnswer: "d) Ntihanyurwa n'amapikipiki",
    explanation: "Iki cyapa gisobanura ko ntihanyurwa n'amapikipiki.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.PNG-fThfOtl5Ich8KWOrZcUeJfCjfR0JoK.png",
  },
  {
    id: 7,
    question: "Iki cyapa gisobanura iki?",
    options: [
      "a) Umuhanda wubatswe nabi",
      "b) Agacuri kateza ibyago",
      "c) Umuhanda utaringaniye",
      "d) Akazamuko gahanamye",
    ],
    correctAnswer: "b) Agacuri kateza ibyago",
    explanation: "Iki cyapa gisobanura ko hari agacuri kateza ibyago.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.PNG-XNG7BOhnmYSFWRGWFSkk79JurJWFW1.png",
  },
  {
    id: 8,
    question: "Mu bimenyetso bimurika itara ry'umuhondo risobanura iki?",
    options: [
      "a) Itegure kugenda",
      "b) Birabujijwe gutambuka umurongo wo guhagarara umwanya muto cyangwa igihe uwo murongo udahari icyo kimenyetso ubwacyo",
      "c) A na b ni ibisubizo by'ukuri",
      "d) Nta gisubizo cy'ukuri kirimo",
    ],
    correctAnswer:
      "b) Birabujijwe gutambuka umurongo wo guhagarara umwanya muto cyangwa igihe uwo murongo udahari icyo kimenyetso ubwacyo",
    explanation: "Itara ry'umuhondo risobanura ko birabujijwe gutambuka umurongo wo guhagarara.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3.PNG-cxka6XNvDubszAVjN9aYV24LCiMsQV.png",
  },
  {
    id: 9,
    question: "Umurongo ucagaguye wera mu muhanda usobanura iki?",
    options: [
      "a) Birabujijwe kuwurenga",
      "b) Birabujijwe kuhahagarara",
      "c) Wegereye ahaguteza ibyago",
      "d) Kunyuranaho ntibyemewe",
    ],
    correctAnswer: "a) Birabujijwe kuwurenga",
    explanation: "Umurongo ucagaguye wera mu muhanda usobanura ko birabujijwe kuwurenga.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4.PNG-8YuX1IZ57gbEi3dbzZLZvaUvY1OtAs.png",
  },
  {
    id: 10,
    question: "Iki cyapa gisobanura iki?",
    options: [
      "a) Ukugendera mu muhanda ubisikanirwamo",
      "b) Ukugendera mu muhanda ubisikanirwamo ntibyemewe",
      "c) Cyerekana aho umunyegare agomba kunyura",
      "d) Nta gisubizo cy'ukuri kirimo",
    ],
    correctAnswer: "a) Ukugendera mu muhanda ubisikanirwamo",
    explanation: "Iki cyapa gisobanura ukugendera mu muhanda ubisikanirwamo.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5.PNG-8mmV9MDdSV8hgxBSwCLXOl5DTSK0iZ.png",
  },
  {
    id: 11,
    question: "Iki cyapa gisobanura iki?",
    options: [
      "a) Ahatangirwa serivisi ni muri metero 30",
      "b) Umuvuduko muto ntarengwa utegetswe ni 30 km/h",
      "c) Umuvuduko munini ntarengwa utegetswe ni 30 km/h",
      "d) Nta gisubizo cy'ukuri kirimo",
    ],
    correctAnswer: "c) Umuvuduko munini ntarengwa utegetswe ni 30 km/h",
    explanation: "Iki cyapa gisobanura ko umuvuduko munini ntarengwa utegetswe ari 30 km/h.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6.PNG-WMriixLgDOMrLrxoxOrLLBdQK6YSLE.png",
  },
  {
    id: 12,
    question: "Iki cyapa gisobanura iki?",
    options: [
      "a) Biragoye kubona neza mu muhanda munini",
      "b) Umuvuduko mu muhanda munini wavanyweho",
      "c) Ni isangano ry'umuhanda rikoreshwa cyane",
      "d) Hari imirongo iburira ibyago bitunguranye",
    ],
    correctAnswer: "a) Biragoye kubona neza mu muhanda munini",
    explanation: "Iki cyapa gisobanura ko biragoye kubona neza mu muhanda munini.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7.PNG-usI0UilATdBrycAIqdwo48TSVLrVfC.png",
  },
  {
    id: 13,
    question: "Iki cyapa gisobanura iki?",
    options: ["a) Umuyobozi w'ikinyabiziga", "b) Umunyamaguru", "c) Umugenzi", "d) A na b ni ibisubizo by'ukuri"],
    correctAnswer: "a) Umuyobozi w'ikinyabiziga",
    explanation: "Iki cyapa gisobanura umuyobozi w'ikinyabiziga.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8.PNG-NoZDGJpTYIh8nsKD71dJadnZFRGYq0.png",
  },
  {
    id: 14,
    question: "Icyapa gikoze mu ishusho ya mpandeshatu kimenyesha:",
    options: [
      "a) Ntihanyurwa n'abanyamaguru",
      "b) Akayira k'abanyamaguru",
      "c) Aho abanyamaguru bambukira",
      "d) B na c ni ibisubizo by'ukuri",
    ],
    correctAnswer: "a) Ntihanyurwa n'abanyamaguru",
    explanation: "Icyapa gikoze mu ishusho ya mpandeshatu kimenyesha ko ntihanyurwa n'abanyamaguru.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9.PNG-eIQld1WmQCfZjmD0BEzF7aXbBVStN1.png",
  },
  {
    id: 15,
    question: "Iki cyapa gisobanura iki?",
    options: ["a) Iburyo", "b) Ibumoso", "c) Iburyo n'ibumoso", "d) Nta gisubizo cy'ukuri kirimo"],
    correctAnswer: "b) Ibumoso",
    explanation: "Iki cyapa gisobanura ibumoso.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10.PNG-fCnuycOnmdJbhlDVM5eUIGupkvKmOj.png",
  },

  // Questions with images
  {
    id: 16,
    question: "Ugeze bwa mbere ahabereye impanuka yo mu muhanda harimo inkomere wakora iki?",
    options: [
      "a) Gukomeza urugendo kuko ntacyo bigutuho",
      "b) Guhagarara no kureba gusa",
      "c) Kumenyesha impanuka no guhamagara ubutabazi",
      "d) Gufotora impanuka no kuyishyira kuri WhatsApp",
    ],
    correctAnswer: "c) Kumenyesha impanuka no guhamagara ubutabazi",
    explanation: "Ugeze ahabereye impanuka harimo inkomere ugomba kubimenyesha no guhamagara ubutabazi.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.PNG-ZFdGZaJkYrO8G1lXqymyqlyjafNhfO.png",
  },
  {
    id: 17,
    question: "Ni iyihe myifatire myiza wagira ugeze aho abana bari hafi y'inzira nyabagendwa?",
    options: [
      "a) Kwongera umuvuduko kugira ngo ubasige vuba",
      "b) Kwitonda, kwitegereza, ni biba ngombwa ubaburire unitegura kuba wahagarara",
      "c) Gukomeza kugenda nta kibazo",
      "d) Gukoresha ihoni cyane kugira ngo bakwirinde",
    ],
    correctAnswer: "b) Kwitonda, kwitegereza, ni biba ngombwa ubaburire unitegura kuba wahagarara",
    explanation:
      "Ugeze aho abana bari hafi y'inzira nyabagendwa ugomba kwitonda, kwitegereza, kubaburira no kwitegura guhagarara.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.PNG-ZF4vU3GUVcS2nKFykIS7caa9DuBd8f.png",
  },
  {
    id: 18,
    question: "Nk'umuyobozi w'ikinyabiziga, ni iyihe myitwarire wagira?",
    options: [
      "a) Umuyobozi w'ikinyabiziga agomba guhagarara",
      "b) Umuyobozi w'ikinyabiziga agomba kwongera umuvuduko",
      "c) Umuyobozi w'ikinyabiziga agomba gukomeza",
      "d) Umuyobozi w'ikinyabiziga agomba guhindura inzira",
    ],
    correctAnswer: "c) Umuyobozi w'ikinyabiziga agomba gukomeza",
    explanation: "Nk'umuyobozi w'ikinyabiziga, ugomba gukomeza urugendo.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3.PNG-Liu3rINId9OgGjzo5YbjmOmor8QvpT.png",
  },
  {
    id: 19,
    question: "Ni iki umuyobozi w'ikinyabiziga yakora ashaka gukatira iburyo?",
    options: [
      "a) Kwongera umuvuduko kugira ngo umunyegare ahagarare",
      "b) Kwemerara umunyegare akomeze inzira ye",
      "c) Gukoresha ihoni kugira ngo umunyegare akwirinde",
      "d) Gukata iburyo nta kibazo",
    ],
    correctAnswer: "b) Kwemerara umunyegare akomeze inzira ye",
    explanation: "Umuyobozi w'ikinyabiziga ashaka gukatira iburyo agomba kwemerara umunyegare akomeze inzira ye.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4.PNG-npeHXKgyasIpzhzscEzxugftPzMBNF.png",
  },
  {
    id: 20,
    question:
      "Ugeze mu masangano y'umuhanda aho usanga ibimenyetso bimurika bidakora, wakora iki igihe umukozi ubifiye ububasha aguhaye iki kimenyetso?",
    options: [
      "a) Gukomeza kugenda nta kibazo",
      "b) Kwongera umuvuduko kugira ngo uce vuba mu masangano",
      "c) Guhagarara ku murongo wo guhagarara umwanya muto",
      "d) Guhindura inzira",
    ],
    correctAnswer: "c) Guhagarara ku murongo wo guhagarara umwanya muto",
    explanation:
      "Ugeze mu masangano y'umuhanda aho ibimenyetso bimurika bidakora, iyo umukozi ubifiye ububasha aguhaye ikimenyetso cyo guhagarara, ugomba guhagarara ku murongo wo guhagarara umwanya muto.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5.PNG-F8M92bMOwZ035lSQUdP7a66ELOhqBd.png",
  },
  {
    id: 21,
    question: "Iki cyapa kivuga:",
    options: [
      "a) Gutambuka nyuma y'ibinyabiziga bituruka aho ujya",
      "b) Guhagarara no gutegereza ibinyabiziga bituruka aho ujya",
      "c) Kwongera umuvuduko kugira ngo utambuke mbere y'ibinyabiziga bituruka aho ujya",
      "d) Gutambuka mbere y'ibinyabiziga bituruka aho ujya",
    ],
    correctAnswer: "d) Gutambuka mbere y'ibinyabiziga bituruka aho ujya",
    explanation: "Iki cyapa kivuga ko ugomba gutambuka mbere y'ibinyabiziga bituruka aho ujya.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6.PNG-GS9vpJETe2KYV5486NNwktxLIxHnBU.png",
  },
  {
    id: 22,
    question: "Utugarurarumuri turi ku ruhande rw'imbere rw'ikinyabiziga tugomba kugira:",
    options: [
      "a) Ishusho y'uruziga, ubuso umutuku",
      "b) Ishusho mpandeshatu, ubuso umweru",
      "c) Ishusho mpandeshatu, ubuso umutuku",
      "d) Ishusho y'uruziga, ubuso umweru",
    ],
    correctAnswer: "b) Ishusho mpandeshatu, ubuso umweru",
    explanation:
      "Utugarurarumuri turi ku ruhande rw'imbere rw'ikinyabiziga tugomba kugira ishusho mpandeshatu n'ubuso umweru.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7.PNG-Gzgdkxbp4JwWLcrCDoaDG2XmYCTMqp.png",
  },
  {
    id: 23,
    question: "Iki cyapa kivuga:",
    options: [
      "a) Gutambuka nyuma y'ibinyabiziga biturutse imbere",
      "b) Guhagarara no gutegereza ibinyabiziga biturutse imbere",
      "c) Kwongera umuvuduko kugira ngo utambuke mbere y'ibinyabiziga biturutse imbere",
      "d) Gutambuka mbere y'ibinyabiziga biturutse imbere",
    ],
    correctAnswer: "d) Gutambuka mbere y'ibinyabiziga biturutse imbere",
    explanation: "Iki cyapa kivuga ko ugomba gutambuka mbere y'ibinyabiziga biturutse imbere.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8.PNG-BA5sowUdfqlBrn1YU3dy1oApKPagmz.png",
  },
  {
    id: 24,
    question: "Iki cyapa cyerekana:",
    options: ["a) Ikoni ibumoso", "b) Ikoni iburyo n'ibumoso", "c) Nta koni", "d) Ikoni iburyo"],
    correctAnswer: "d) Ikoni iburyo",
    explanation: "Iki cyapa cyerekana ikoni iburyo.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9.PNG-9m0oOcaktJKpvonTshQumfQl1kJwnH.png",
  },
  {
    id: 25,
    question: "Iki kimenyetso gitanzwe n'umukozi ubifitiye ububasha cyo guhagarara:",
    options: [
      "a) Ku bakoresha umuhanda bose bamuturutse imbere gusa",
      "b) Ku bakoresha umuhanda bose bamuturutse inyuma gusa",
      "c) Ku bakoresha umuhanda bose bamuturutse ibumoso n'iburyo",
      "d) Ku bakoresha umuhanda bose bamuturutse imbere n'inyuma",
    ],
    correctAnswer: "d) Ku bakoresha umuhanda bose bamuturutse imbere n'inyuma",
    explanation:
      "Iki kimenyetso gitanzwe n'umukozi ubifitiye ububasha cyo guhagarara ku bakoresha umuhanda bose bamuturutse imbere n'inyuma.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10.PNG-AmmvhMzadCzrhkpheqb0r4uoo29f34.png",
  },

  // Regular questions about driving rules - without images
  {
    id: 26,
    question: "Iyo ugeze ku kibuga cy'inzira nyabagendwa, ni iki ugomba gukora?",
    options: [
      "a) Gukomeza kugenda nta kibazo",
      "b) Guhagarara buri gihe no kureba ibumoso n'iburyo",
      "c) Guhagarara gusa iyo hari ibinyabiziga biri mu kibuga",
      "d) Kwongera umuvuduko kugira ngo uce vuba mu kibuga",
    ],
    correctAnswer: "b) Guhagarara buri gihe no kureba ibumoso n'iburyo",
    explanation:
      "Ugomba guhagarara buri gihe ku kibuga cy'inzira nyabagendwa no kureba ibumoso n'iburyo mbere yo gukomeza.",
  },
  {
    id: 27,
    question: "Ni ikihe kimenyetso kigaragaza ko ugomba guhagarara?",
    options: [
      "a) Ikimenyetso cy'uruziga rw'umuhondo",
      "b) Ikimenyetso cy'uruziga rwera",
      "c) Ikimenyetso cy'uruziga rw'icyatsi",
      "d) Ikimenyetso cy'uruziga rutukura",
    ],
    correctAnswer: "d) Ikimenyetso cy'uruziga rutukura",
    explanation: "Ikimenyetso cy'uruziga rutukura kigaragaza ko ugomba guhagarara.",
  },
  {
    id: 28,
    question: "Ni ryari ugomba gukoresha itara ryo gukata?",
    options: [
      "a) Igihe cyose uri mu muhanda",
      "b) Mbere gato yo gukata cyangwa guhindura umuhanda",
      "c) Nyuma yo gukata",
      "d) Igihe hari imvura nyinshi",
    ],
    correctAnswer: "b) Mbere gato yo gukata cyangwa guhindura umuhanda",
    explanation:
      "Ugomba gukoresha itara ryo gukata mbere gato yo gukata cyangwa guhindura umuhanda kugira ngo umenyeshe abandi bagenzi umuhanda.",
  },
  {
    id: 29,
    question: "Ni ikihe kimenyetso kigaragaza ko ugomba gutanga inzira?",
    options: [
      "a) Ikimenyetso cy'uruziga rutukura",
      "b) Ikimenyetso cy'uruziga rw'umuhondo",
      "c) Ikimenyetso cy'uruziga rwera",
      "d) Ikimenyetso cy'uruziga rw'icyatsi",
    ],
    correctAnswer: "c) Ikimenyetso cy'uruziga rwera",
    explanation: "Ikimenyetso cy'uruziga rwera kigaragaza ko ugomba gutanga inzira.",
  },
  {
    id: 30,
    question: "Ni ikihe kimenyetso kigaragaza ko ugomba kwitonda?",
    options: [
      "a) Ikimenyetso cy'uruziga rutukura",
      "b) Ikimenyetso cy'uruziga rw'umuhondo",
      "c) Ikimenyetso cy'uruziga rwera",
      "d) Ikimenyetso cy'uruziga rw'icyatsi",
    ],
    correctAnswer: "b) Ikimenyetso cy'uruziga rw'umuhondo",
    explanation: "Ikimenyetso cy'uruziga rw'umuhondo kigaragaza ko ugomba kwitonda.",
  },
  {
    id: 31,
    question: "Ni ikihe kimenyetso kigaragaza ko ugomba gukomeza?",
    options: [
      "a) Ikimenyetso cy'uruziga rutukura",
      "b) Ikimenyetso cy'uruziga rw'umuhondo",
      "c) Ikimenyetso cy'uruziga rwera",
      "d) Ikimenyetso cy'uruziga rw'icyatsi",
    ],
    correctAnswer: "d) Ikimenyetso cy'uruziga rw'icyatsi",
    explanation: "Ikimenyetso cy'uruziga rw'icyatsi kigaragaza ko ugomba gukomeza.",
  },
  {
    id: 32,
    question: "Ni iki ugomba gukora iyo ubona umuntu ukoresha akaboko ke kugira ngo aguhagarike?",
    options: ["a) Guhagarara", "b) Gukomeza kugenda", "c) Kwongera umuvuduko", "d) Guhindura inzira"],
    correctAnswer: "a) Guhagarara",
    explanation:
      "Ugomba guhagarara iyo ubona umuntu ukoresha akaboko ke kugira ngo aguhagarike, cyane cyane iyo ari umupolisi.",
  },
  {
    id: 33,
    question: "Ni iki ugomba gukora iyo ubona ambulance ifite amatara atwika?",
    options: ["a) Gukomeza kugenda", "b) Guhagarara no gutanga inzira", "c) Kwongera umuvuduko", "d) Guhindura inzira"],
    correctAnswer: "b) Guhagarara no gutanga inzira",
    explanation:
      "Ugomba guhagarara no gutanga inzira iyo ubona ambulance ifite amatara atwika, kuko ishobora kuba ijyanye umurwayi mu bitaro.",
  },
  {
    id: 34,
    question: "Ni iki ugomba gukora iyo ubona umwana mu muhanda?",
    options: ["a) Gukomeza kugenda", "b) Kwongera umuvuduko", "c) Guhagarara no gutegereza", "d) Guhindura inzira"],
    correctAnswer: "c) Guhagarara no gutegereza",
    explanation:
      "Ugomba guhagarara no gutegereza iyo ubona umwana mu muhanda, kuko ashobora kuba atazi amategeko y'umuhanda.",
  },
  {
    id: 35,
    question: "Ni iki ugomba gukora iyo ubona umuntu ufite ubumuga mu muhanda?",
    options: ["a) Gukomeza kugenda", "b) Kwongera umuvuduko", "c) Guhindura inzira", "d) Guhagarara no gutegereza"],
    correctAnswer: "d) Guhagarara no gutegereza",
    explanation:
      "Ugomba guhagarara no gutegereza iyo ubona umuntu ufite ubumuga mu muhanda, kugira ngo umufashe kurambuka umuhanda.",
  },
  {
    id: 36,
    question: "Ni iki ugomba gukora iyo ugeze ku isangano ry'umuhanda?",
    options: [
      "a) Gukomeza kugenda nta kibazo",
      "b) Kwongera umuvuduko",
      "c) Guhindura inzira",
      "d) Guhagarara no kureba ibumoso n'iburyo",
    ],
    correctAnswer: "d) Guhagarara no kureba ibumoso n'iburyo",
    explanation: "Ugomba guhagarara no kureba ibumoso n'iburyo iyo ugeze ku isangano ry'umuhanda.",
  },
  {
    id: 37,
    question: "Ni iki ugomba gukora iyo ubona ikinyabiziga cy'abapolisi gifite amatara atwika?",
    options: ["a) Gukomeza kugenda", "b) Kwongera umuvuduko", "c) Guhagarara no gutanga inzira", "d) Guhindura inzira"],
    correctAnswer: "c) Guhagarara no gutanga inzira",
    explanation: "Ugomba guhagarara no gutanga inzira iyo ubona ikinyabiziga cy'abapolisi gifite amatara atwika.",
  },
  {
    id: 38,
    question: "Ni iki ugomba gukora iyo ubona ikinyabiziga cy'abazimya inkongi z'umuriro gifite amatara atwika?",
    options: ["a) Gukomeza kugenda", "b) Kwongera umuvuduko", "c) Guhindura inzira", "d) Guhagarara no gutanga inzira"],
    correctAnswer: "d) Guhagarara no gutanga inzira",
    explanation:
      "Ugomba guhagarara no gutanga inzira iyo ubona ikinyabiziga cy'abazimya inkongi z'umuriro gifite amatara atwika.",
  },
  {
    id: 39,
    question: "Ni iki ugomba gukora iyo ubona ikinyabiziga cy'abatabazi gifite amatara atwika?",
    options: ["a) Gukomeza kugenda", "b) Guhagarara no gutanga inzira", "c) Kwongera umuvuduko", "d) Guhindura inzira"],
    correctAnswer: "b) Guhagarara no gutanga inzira",
    explanation: "Ugomba guhagarara no gutanga inzira iyo ubona ikinyabiziga cy'abatabazi gifite amatara atwika.",
  },
  {
    id: 40,
    question: "Ni iki ugomba gukora iyo ubona umuhanda ufite umuhindo?",
    options: [
      "a) Gukomeza kugenda nta kibazo",
      "b) Kugenda buhoro no kwitonda",
      "c) Kwongera umuvuduko",
      "d) Guhindura inzira",
    ],
    correctAnswer: "b) Kugenda buhoro no kwitonda",
    explanation: "Ugomba kugenda buhoro no kwitonda iyo ubona umuhanda ufite umuhindo.",
  },
  {
    id: 41,
    question: "Ni iki ugomba gukora iyo ubona umuhanda ufite ibyondo?",
    options: [
      "a) Gukomeza kugenda nta kibazo",
      "b) Kwongera umuvuduko",
      "c) Kugenda buhoro no kwitonda",
      "d) Guhindura inzira",
    ],
    correctAnswer: "c) Kugenda buhoro no kwitonda",
    explanation: "Ugomba kugenda buhoro no kwitonda iyo ubona umuhanda ufite ibyondo.",
  },
  {
    id: 42,
    question: "Ni iki ugomba gukora iyo ubona umuhanda ufite urubura?",
    options: [
      "a) Gukomeza kugenda nta kibazo",
      "b) Kwongera umuvuduko",
      "c) Guhindura inzira",
      "d) Kugenda buhoro no kwitonda",
    ],
    correctAnswer: "d) Kugenda buhoro no kwitonda",
    explanation: "Ugomba kugenda buhoro no kwitonda iyo ubona umuhanda ufite urubura.",
  },
  {
    id: 43,
    question: "Ni iki ugomba gukora iyo ubona umuhanda ufite amazi?",
    options: [
      "a) Gukomeza kugenda nta kibazo",
      "b) Kugenda buhoro no kwitonda",
      "c) Kwongera umuvuduko",
      "d) Guhindura inzira",
    ],
    correctAnswer: "b) Kugenda buhoro no kwitonda",
    explanation: "Ugomba kugenda buhoro no kwitonda iyo ubona umuhanda ufite amazi.",
  },
  {
    id: 44,
    question: "Ikinyabiziga cyose cyangwa ibinyabiziga bigenda bigomba kugira:",
    options: [
      "a) Umuhanda w'ibisikanirwamo",
      "b) Umuhanda w'icyatsi",
      "c) Umuhanda w'umutuku",
      "d) Umuhanda w'ubururu",
    ],
    correctAnswer: "a) Umuhanda w'ibisikanirwamo",
    explanation: "Ikinyabiziga cyose cyangwa ibinyabiziga bigenda bigomba kugira umuhanda w'ibisikanirwamo.",
  },
  {
    id: 45,
    question:
      "Umurongo uciyemo uduce umenyesha ahegereye umurongo ushobora kuzuzwa n'uturanga gukata tw'ibara ryera utwo turanga cyerekezo tumenyesha:",
    options: [
      "a) Kwongera umubare w'ibisate",
      "b) Igabanurwa ry'umubare w'ibisate",
      "c) Guhindura icyerekezo cy'umuhanda",
      "d) Kugabanya umuvuduko",
    ],
    correctAnswer: "b) Igabanurwa ry'umubare w'ibisate",
    explanation:
      "Umurongo uciyemo uduce umenyesha ahegereye umurongo ushobora kuzuzwa n'uturanga gukata tw'ibara ryera utwo turanga cyerekezo tumenyesha igabanurwa ry'umubare w'ibisate.",
  },
  {
    id: 46,
    question: "Nibura ikinyabiziga gitegetswe kugira uduhanagurakirahure tungahe?",
    options: ["a) 2", "b) 3", "c) 4", "d) 1"],
    correctAnswer: "d) 1",
    explanation: "Nibura ikinyabiziga gitegetswe kugira akahanagurakirahure kamwe.",
  },
  {
    id: 47,
    question:
      "Ibinyabiziga bikoreshwa nka tagisi, bitegerereza abantu mu nzira nyabagendwa, bishobora gushyirwaho itara ryerekana ko ikinyabiziga kitakodeshejwe. Iryo tara rishyirwaho ku buryo bukurikira:",
    options: [
      "a) Ni itara ry'umutuku rishyirwa inyuma ku kinyabiziga",
      "b) Ni itara ry'umuhondo rishyirwa hejuru ku kinyabiziga",
      "c) Ni itara ry'icyatsi rishyirwa imbere ku kinyabiziga",
      "d) Ni itara ry'ubururu rishyirwa ku ruhande rw'ikinyabiziga",
    ],
    correctAnswer: "c) Ni itara ry'icyatsi rishyirwa imbere ku kinyabiziga",
    explanation:
      "Ibinyabiziga bikoreshwa nka tagisi bishobora gushyirwaho itara ry'icyatsi rishyirwa imbere ku kinyabiziga ryerekana ko ikinyabiziga kitakodeshejwe.",
  },
  {
    id: 48,
    question:
      "Za otobisi zagenewe gutwara abanyeshuri zishobora gushyirwaho amatara abiri asa n'icunga rihishije amyasa kugirango yerekane ko zihagaze no kwerekana ko bagomba kwitonda, ayo matara ashyirwaho ku buryo bukurikira:",
    options: [
      "a) Byombi bishyirwa imbere",
      "b) Byombi bishyirwa inyuma",
      "c) Rimwe rishyirwa iburyo irindi ibumoso",
      "d) Rimwe rishyirwa imbere irindi inyuma",
    ],
    correctAnswer: "d) Rimwe rishyirwa imbere irindi inyuma",
    explanation:
      "Za otobisi zagenewe gutwara abanyeshuri zishobora gushyirwaho amatara abiri asa n'icunga rihishije amyasa, rimwe rishyirwa imbere irindi inyuma.",
  },
  {
    id: 49,
    question:
      "Ibizirikisho by'iminyururu cyangwa by'insinga kimwe n'ibindi by'ingoboka bikoreshwa gusa igihe nta kundi umuntu yabigenza kandi nta kindi bigiriwe uretse gusa kugirango ikinyabiziga kigere aho kigomba gukorerwa kandi nturenze na rimwe km 20 mu isaha, ibyo bizirikisho bigaragazwa ku buryo bukurikira:",
    options: [
      "a) Icyapa cy'umutuku cya mpande enye zingana gifite cm 40 kuri buri ruhande",
      "b) Icyapa cy'umuhondo cya mpande enye zingana gifite cm 35 kuri buri ruhande",
      "c) Icyapa cyera cya mpande enye zingana gifite cm 30 kuri buri ruhande",
      "d) Icyapa cy'ubururu cya mpande enye zingana gifite cm 25 kuri buri ruhande",
    ],
    correctAnswer: "c) Icyapa cyera cya mpande enye zingana gifite cm 30 kuri buri ruhande",
    explanation:
      "Ibizirikisho by'iminyururu cyangwa by'insinga bigaragazwa n'icyapa cyera cya mpande enye zingana gifite cm 30 kuri buri ruhande.",
  },
  {
    id: 50,
    question: "Ibinyabiziga bifite ubugari bufite ibipimo bikurikira bigomba kugira amatara ndangaburumbarare:",
    options: ["a) m 2.10", "b) m 2.30", "c) m 2.00", "d) m 1.80"],
    correctAnswer: "a) m 2.10",
    explanation: "Ibinyabiziga bifite ubugari bwa m 2.10 bigomba kugira amatara ndangaburumbarare.",
  },
  {
    id: 51,
    question:
      "Iyo kuva bwije kugeza bukeye cyangwa bitewe n'uko ibihe bimeze nk'igihe cy'ibihu cyangwa cy'imvura bitagishoboka kubona neza muri m 200, udutsiko twose tw'abanyamaguru nk'imperekerane cyangwa udutsiko tw'abanyeshuri bari ku murongo bayobowe n'umwarimu, iyo bagenda mu muhanda ku isonga hakaba hari abantu barenze umwe bagomba kugaragazwa ku buryo bukurikira:",
    options: [
      "a) Imbere ni itara ry'umweru ritwariwe iburyo n'umuntu uri ku murongo w'imbere hafi y'umurongo ugabanya umuhanda mo kabiri",
      "b) Imbere ni itara ry'umuhondo ritwariwe ibumoso n'umuntu uri ku murongo w'imbere hafi y'umurongo ugabanya umuhanda mo kabiri",
      "c) Inyuma ni itara ry'icyatsi ritwariwe iburyo n'umuntu uri ku murongo w'inyuma hafi y'umurongo ugabanya umuhanda mo kabiri",
      "d) Inyuma ni itara ry'umutuku ritwariwe ibumoso n'umuntu uri ku murongo w'inyuma hafi y'umurongo ugabanya umuhanda mo kabiri",
    ],
    correctAnswer:
      "d) Inyuma ni itara ry'umutuku ritwariwe ibumoso n'umuntu uri ku murongo w'inyuma hafi y'umurongo ugabanya umuhanda mo kabiri",
    explanation:
      "Iyo kuva bwije kugeza bukeye cyangwa bitewe n'uko ibihe bimeze nk'igihe cy'ibihu cyangwa cy'imvura bitagishoboka kubona neza muri m 200, udutsiko twose tw'abanyamaguru bagomba kugaragazwa inyuma n'itara ry'umutuku ritwariwe ibumoso n'umuntu uri ku murongo w'inyuma hafi y'umurongo ugabanya umuhanda mo kabiri.",
  },
  {
    id: 52,
    question: "Utegereje gukata iburyo kwiherezo ry'umuhanda, ukingirijwe n'imodoka ihagaze, ni iki wakora?",
    options: [
      "a) Kwongera umuvuduko kugira ngo ubasige vuba",
      "b) Gukoresha ihoni cyane kugira ngo bakwirinde",
      "c) Guhagarara hanyuma ukagenda gake gake witonze kugezaho ureba neza",
      "d) Gukomeza kugenda nta kibazo",
    ],
    correctAnswer: "c) Guhagarara hanyuma ukagenda gake gake witonze kugezaho ureba neza",
    explanation:
      "Utegereje gukata iburyo kwiherezo ry'umuhanda ukingirijwe n'imodoka ihagaze, ugomba guhagarara hanyuma ukagenda gake gake witonze kugezaho ureba neza.",
  },
  {
    id: 53,
    question: "Urimo kugenda mu nzira nyabagendwa ni gute wanyura k'umuyobozi w'igare?",
    options: [
      "a) Kwongera umuvuduko kugira ngo umusige vuba",
      "b) Gukoresha ihoni cyane kugira ngo akwirinde",
      "c) Gusiga umwanya uhagije igihe umunyuraho",
      "d) Gukomeza kugenda nta kibazo",
    ],
    correctAnswer: "c) Gusiga umwanya uhagije igihe umunyuraho",
    explanation: "Urimo kugenda mu nzira nyabagendwa ugomba gusiga umwanya uhagije igihe unyura k'umuyobozi w'igare.",
  },
  {
    id: 54,
    question: "Ni iki wakora igihe utabona neza usubira inyuma?",
    options: [
      "a) Kwongera umuvuduko kugira ngo usubire inyuma vuba",
      "b) Gukoresha ihoni cyane kugira ngo abantu bakwirinde",
      "c) Gukomeza gusubira inyuma nta kibazo",
      "d) Gushaka umuntu uri hanze y'ikinyabiziga ukuyobora",
    ],
    correctAnswer: "d) Gushaka umuntu uri hanze y'ikinyabiziga ukuyobora",
    explanation: "Igihe utabona neza usubira inyuma, ugomba gushaka umuntu uri hanze y'ikinyabiziga ukuyobora.",
  },
  {
    id: 55,
    question:
      "Mu gihe uri mu rugendo rurerure mu muhanda urombereje w'ibice byinshi, ni iki wakora mu gihe wumva utangiye kugira ibitotsi?",
    options: [
      "a) Kwongera umuvuduko kugira ngo ugere vuba aho ujya",
      "b) Gukoresha ihoni cyane kugira ngo abantu bakwirinde",
      "c) Kuva mu muhanda urombereje w'ibice byinshi, ugahagarara ahantu hatekanye",
      "d) Gukomeza kugenda nta kibazo",
    ],
    correctAnswer: "c) Kuva mu muhanda urombereje w'ibice byinshi, ugahagarara ahantu hatekanye",
    explanation:
      "Mu gihe uri mu rugendo rurerure mu muhanda urombereje w'ibice byinshi, iyo wumva utangiye kugira ibitotsi, ugomba kuva mu muhanda urombereje w'ibice byinshi, ugahagarara ahantu hatekanye.",
  },
  {
    id: 56,
    question: "Igihe ukurikiwe n'ikinyabiziga gitwara abarwayi gicanye amatara y'intabaza arabagirana, wakora iki?",
    options: [
      "a) Kwitaba cyangwa guhagarara ako kanya",
      "b) Kutayitaba",
      "c) Gushyira imodoka iruhande ukayitaba",
      "d) B na c ni ibisubizo by'ukuri",
    ],
    correctAnswer: "d) B na c ni ibisubizo by'ukuri",
    explanation:
      "Igihe ukurikiwe n'ikinyabiziga gitwara abarwayi gicanye amatara y'intabaza arabagirana, ugomba kugihigamira ako kanya ndetse byaba ngombwa ugahagarara.",
  },
  {
    id: 57,
    question: "Mu gihe telefone yawe ihamagawe utwaye imodoka wakora iki?",
    options: [
      "a) Ku bakoresha umuhanda bose bamuturutse imbere gusa",
      "b) Ku bakoresha umuhanda bose bamuturutse inyuma gusa",
      "c) Ku bakoresha umuhanda bose bamuturutse ibumoso n'iburyo",
      "d) Ku bakoresha umuhanda bose bamuturutse imbere n'inyuma",
    ],
    correctAnswer: "d) Ku bakoresha umuhanda bose bamuturutse imbere n'inyuma",
    explanation:
      "Mu gihe telefone yawe ihamagawe utwaye imodoka ugomba ku bakoresha umuhanda bose bamuturutse imbere n'inyuma.",
  },
  {
    id: 58,
    question: "Ni iki muri ibi wakwirinda mu gihe ushaka kunyuranaho?",
    options: [
      "a) Nyuma y'ikona ugategereza kubona uburyo bwo kunyuranaho",
      "b) Mu muhanda w'icyerekezo kimwe",
      "c) Aho utagomba kurenza ibirometero 30 mu isaha",
      "d) Ugeze mu muhanda utaringaniye neza",
    ],
    correctAnswer: "a) Nyuma y'ikona ugategereza kubona uburyo bwo kunyuranaho",
    explanation:
      "Mu gihe ushaka kunyuranaho, ugomba kwirinda kunyuranaho nyuma y'ikona ugategereza kubona uburyo bwo kunyuranaho.",
  },
  {
    id: 59,
    question: "Ni iki wakora mu gihe usanze mu bimenyetso bimurika harimo ibara ry'umuhondo?",
    options: [
      "a) Kongera umuvuduko",
      "b) Kugumana umuvuduko wari uriho",
      "c) Kwitegura guhagarara",
      "d) Gufata feri cyane",
    ],
    correctAnswer: "c) Kwitegura guhagarara",
    explanation: "Mu gihe usanze mu bimenyetso bimurika harimo ibara ry'umuhondo, ugomba kwitegura guhagarara.",
  },
  {
    id: 60,
    question: "Ni iki wakora mu gihe ugeze mu masangano y'umuhanda aho usanga ibimenyetso bimurika bidakora?",
    options: [
      "a) Gukomeza kugenda nta kibazo",
      "b) Kwongera umuvuduko kugira ngo uce vuba mu masangano",
      "c) Guhagarara no gutegereza ibimenyetso bimurika bisubiye gukora",
      "d) Gukurikiza amategeko y'umuhanda asanzwe",
    ],
    correctAnswer: "d) Gukurikiza amategeko y'umuhanda asanzwe",
    explanation:
      "Mu gihe ugeze mu masangano y'umuhanda aho usanga ibimenyetso bimurika bidakora, ugomba gukurikiza amategeko y'umuhanda asanzwe.",
    category: "Traffic Rules",
  },
  {
    id: 61,
    question: "What is the maximum speed limit in urban areas in Uganda?",
    options: ["40 km/h", "50 km/h", "60 km/h", "80 km/h"],
    correctAnswer: 1,
    explanation: "The maximum speed limit in urban areas in Uganda is 50 km/h to ensure safety in populated areas.",
    category: "Traffic Rules",
  },
  {
    id: 62,
    question: "When should you use your vehicle's indicators?",
    options: [
      "Only when turning right",
      "Only when changing lanes",
      "When turning or changing direction",
      "Only in heavy traffic",
    ],
    correctAnswer: 2,
    explanation:
      "Indicators should be used whenever you intend to turn or change direction to inform other road users of your intentions.",
    category: "Vehicle Operation",
  },
  {
    id: 63,
    question: "What does a red traffic light mean?",
    options: ["Slow down", "Proceed with caution", "Stop completely", "Yield to oncoming traffic"],
    correctAnswer: 2,
    explanation: "A red traffic light means you must stop completely and wait until the light turns green.",
    category: "Traffic Signals",
  },
  {
    id: 64,
    question: "What is the minimum following distance you should maintain behind another vehicle?",
    options: ["1 second", "2 seconds", "3 seconds", "5 seconds"],
    correctAnswer: 2,
    explanation:
      "The 3-second rule is recommended to maintain a safe following distance, giving you enough time to react to sudden stops.",
    category: "Safe Driving",
  },
  {
    id: 65,
    question: "When is it mandatory to wear a seatbelt in Uganda?",
    options: [
      "Only on highways",
      "Only for front seat passengers",
      "For all occupants at all times",
      "Only during long trips",
    ],
    correctAnswer: 2,
    explanation: "Seatbelts are mandatory for all vehicle occupants at all times while the vehicle is in motion.",
    category: "Safety Equipment",
  },
  {
    id: 66,
    question: "What should you do when approaching a zebra crossing with pedestrians?",
    options: [
      "a) Sound your horn",
      "b) Speed up to pass quickly",
      "c) Stop and give way to pedestrians",
      "d) Flash your headlights",
    ],
    correctAnswer: 2,
    explanation: "You must stop and give way to pedestrians at zebra crossings. Pedestrians have the right of way.",
    category: "Pedestrian Safety",
  },
  {
    id: 67,
    question: "What is the legal blood alcohol limit for drivers in Uganda?",
    options: ["0.05%", "0.08%", "0.10%", "0.00%"],
    correctAnswer: 3,
    explanation: "Uganda has a zero-tolerance policy for drinking and driving. The legal blood alcohol limit is 0.00%.",
    category: "Traffic Laws",
  },
  {
    id: 68,
    question: "When should you use hazard lights?",
    options: [
      "When parking illegally",
      "During emergency situations or breakdowns",
      "In heavy rain",
      "When driving slowly",
    ],
    correctAnswer: 1,
    explanation:
      "Hazard lights should be used during emergency situations, breakdowns, or when your vehicle poses a hazard to other road users.",
    category: "Vehicle Operation",
  },
  {
    id: 69,
    question: "What does a yellow traffic light mean?",
    options: ["Speed up to pass", "Stop if safe to do so", "Continue at current speed", "Turn left only"],
    correctAnswer: 1,
    explanation:
      "A yellow light means caution - you should stop if it's safe to do so, as the light is about to turn red.",
    category: "Traffic Signals",
  },
  {
    id: 70,
    question: "What is the maximum speed limit on highways in Uganda?",
    options: ["80 km/h", "100 km/h", "120 km/h", "110 km/h"],
    correctAnswer: 1,
    explanation: "The maximum speed limit on highways in Uganda is 100 km/h, unless otherwise indicated by road signs.",
    category: "Traffic Rules",
  },
  {
    id: 71,
    question: "When overtaking another vehicle, you should:",
    options: [
      "Overtake on the left side",
      "Overtake only on the right side",
      "Overtake on either side",
      "Never overtake",
    ],
    correctAnswer: 1,
    explanation:
      "In Uganda, you should overtake on the right side of the vehicle you're passing, as traffic moves on the left side of the road.",
    category: "Overtaking",
  },
  {
    id: 72,
    question: "What should you do if your vehicle breaks down on the road?",
    options: [
      "Leave it where it stopped",
      "Move it to the side of the road and use hazard lights",
      "Keep driving slowly",
      "Block traffic to get help",
    ],
    correctAnswer: 1,
    explanation:
      "If your vehicle breaks down, move it to the side of the road if possible, turn on hazard lights, and place warning triangles to alert other drivers.",
    category: "Emergency Procedures",
  },
  {
    id: 73,
    question: "What is the purpose of a roundabout?",
    options: [
      "To slow down traffic",
      "To control traffic flow efficiently",
      "To confuse drivers",
      "To create parking spaces",
    ],
    correctAnswer: 1,
    explanation:
      "Roundabouts are designed to control traffic flow efficiently and reduce the severity of accidents at intersections.",
    category: "Road Infrastructure",
  },
  {
    id: 74,
    question: "When should you check your mirrors?",
    options: ["Only when changing lanes", "Before starting the engine", "Regularly while driving", "Only when parking"],
    correctAnswer: 2,
    explanation:
      "You should check your mirrors regularly while driving to maintain awareness of your surroundings and other road users.",
    category: "Safe Driving",
  },
  {
    id: 75,
    question: "What does a stop sign require you to do?",
    options: ["Slow down significantly", "Come to a complete stop", "Yield to traffic", "Proceed with caution"],
    correctAnswer: 1,
    explanation:
      "A stop sign requires you to come to a complete stop, check for traffic and pedestrians, then proceed when safe.",
    category: "Traffic Signs",
  },
  {
    id: 76,
    question: "What should you do when driving in heavy rain?",
    options: [
      "Drive faster to get out of the rain",
      "Use hazard lights continuously",
      "Reduce speed and increase following distance",
      "Drive in the center of the road",
    ],
    correctAnswer: 2,
    explanation:
      "In heavy rain, reduce your speed, increase following distance, and ensure your headlights are on for better visibility.",
    category: "Weather Conditions",
  },
  {
    id: 77,
    question: "What is the minimum age to obtain a driving license in Uganda?",
    options: ["16 years", "17 years", "18 years", "21 years"],
    correctAnswer: 2,
    explanation: "The minimum age to obtain a driving license in Uganda is 18 years for a standard driving license.",
    category: "Licensing",
  },
  {
    id: 78,
    question: "When parking on a hill, what should you do with your wheels?",
    options: ["Keep them straight", "Turn them away from the curb", "Turn them toward the curb", "It doesn't matter"],
    correctAnswer: 2,
    explanation:
      "When parking on a hill, turn your wheels toward the curb (downhill) or away from the curb (uphill) to prevent the vehicle from rolling into traffic.",
    category: "Parking",
  },
  {
    id: 79,
    question: "What does a triangular road sign typically indicate?",
    options: ["Information", "Warning", "Prohibition", "Mandatory instruction"],
    correctAnswer: 1,
    explanation: "Triangular road signs typically indicate warnings about road conditions, hazards, or changes ahead.",
    category: "Traffic Signs",
  },
  {
    id: 80,
    question: "When should you use your vehicle's horn?",
    options: [
      "To greet friends",
      "When you're angry",
      "To warn of danger or your presence",
      "In residential areas at night",
    ],
    correctAnswer: 2,
    explanation:
      "The horn should only be used to warn other road users of danger or to indicate your presence when necessary for safety.",
    category: "Vehicle Operation",
  },
]
