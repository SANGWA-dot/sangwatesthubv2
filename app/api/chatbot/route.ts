import { type NextRequest, NextResponse } from "next/server"

// Enhanced knowledge base for Rwanda driving license exam
const knowledgeBase = {
  developer: {
    name: "Sangwa Bruce",
    phone: "+250794290803",
    contact: "0794290803",
  },
  trafficSigns: {
    stop: "Ikimenyetso cy'akarango gitukura gishushanye mu buryo bw'octagon gitera ko umuyobozi agomba guhagarara burundu mbere yo komeza urugendo",
    yield:
      "Ikimenyetso cy'akarango gishushanye nk'inyabutatu gitera ko umuyobozi agomba gutanga inzira ku bandi banyamagendo",
    speedLimit: "Ibimenyetso by'umuvuduko bigaragaza umuvuduko ntarengwa mu km/h",
    noEntry: "Ikimenyetso cy'akarango gitukura gifite akabaho k'umweru - ibinyabiziga ntibyemerewe kwinjira",
  },
  trafficRules: {
    rightOfWay: "Mu Rwanda, abaturuka iburyo bafite uburenganzira bwo kugenda mbere mu masangano adafite ibimenyetso",
    overtaking: "Guca inyuma byemewe gusa iyo ari byiza, ufite icyerekezo cyeruye, kandi ukoresha uruhande rw'iburyo",
    parking: "Ntibyemewe guhagarara mu birometero 5 hafi y'amasangano, metero 15 hafi y'aho bisi zihagarara",
    seatbelt: "Abantu bose bagomba kwambara umukandara w'umutekano, abana bato bagomba gukoresha intebe zihariye",
  },
  examTips: {
    preparation: "Wige amategeko y'umuhanda, witegure neza, sinzira buhoro",
    testDay: "Gera hakiri kare, zana inyandiko zikenewe, komera kandi wiyumvire",
    commonMistakes: "Kutareba mu ndorerwamo, kutitonda neza, kutanga ibimenyetso nabi",
  },
  premium: {
    price: "2,000 RWF ku kwezi",
    features: "Ibibazo 1000+, ibizamini bitagira ingano, ubufasha bwa 24/7",
    contact: "Hamagara +250794290803 kugira ngo wishyure premium",
  },
}

function generateResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  // Developer/Contact queries
  if (lowerMessage.includes("sangwa") || lowerMessage.includes("developer") || lowerMessage.includes("contact")) {
    return `👨‍💻 **Umukoresha w'iki gikoresho:**\n\n📱 **Sangwa Bruce**\n📞 Telefoni: +250 794 290 803\n💼 Software Developer\n🇷🇼 Rwanda\n\n✅ Hamagara cyangwa kohereza ubutumwa kugira ngo ubone ubufasha bwihuse!`
  }

  if (lowerMessage.includes("phone") || lowerMessage.includes("0794290803") || lowerMessage.includes("794290803")) {
    return `📞 **Nimero ya Telefoni:**\n\n**Sangwa Bruce:** +250 794 290 803\n\n• Ubufasha bwa 24/7\n• Ibibazo by'ikizamini\n• Ubufasha bwa tekiniki\n• Kwishyura Premium\n\n💬 Hamagara cyangwa kohereza SMS!`
  }

  // Registration queries
  if (lowerMessage.includes("kwiyandikisha") || lowerMessage.includes("register") || lowerMessage.includes("account")) {
    return `🔐 **Kwiyandikisha:**\n\n1. Kanda 'Injira' hejuru\n2. Andika nimero ya telefoni yawe\n3. Uzuza amakuru yawe yose\n4. Kanda 'Iyandikishe'\n\n✅ Byoroshye cyane! Niba ufite ikibazo, hamagara Sangwa Bruce: +250 794 290 803`
  }

  // Premium queries
  if (lowerMessage.includes("premium") || lowerMessage.includes("kwishyura") || lowerMessage.includes("payment")) {
    return `💎 **Premium Package:**\n\n• 1000+ ibibazo by'ikizamini\n• Ibizamini bitagira ingano\n• Ubufasha bwa AI\n• Ibisobanuro birambuye\n• Ubufasha bwa 24/7\n\n💰 **Igiciro:** 2,000 RWF/ukwezi\n📱 **Hamagara:** +250 794 290 803 (Sangwa Bruce)\n\n🎯 Menya ko 95% by'abakoresha ba premium batsinda ikizamini!`
  }

  // Exam queries
  if (lowerMessage.includes("ikizamini") || lowerMessage.includes("exam") || lowerMessage.includes("test")) {
    return `📚 **Ikizamini cy'Uruhushya rwo Gutwara:**\n\n**Abakoresha ba Ubuntu:**\n• 3 ibizamini ku munsi\n• Ibibazo 50 gusa\n\n**Abakoresha ba Premium:**\n• Ibizamini bitagira ingano\n• Ibibazo 1000+\n• Ibisobanuro birambuye\n\n🎯 **Igipimo cyo gutsinda:** 70%\n📞 **Ubufasha:** +250 794 290 803 (Sangwa Bruce)`
  }

  // Traffic signs queries
  if (lowerMessage.includes("ibimenyetso") || lowerMessage.includes("signs") || lowerMessage.includes("stop")) {
    return `🚦 **Ibimenyetso by'Umuhanda:**\n\n🛑 **STOP:** ${knowledgeBase.trafficSigns.stop}\n\n⚠️ **YIELD:** ${knowledgeBase.trafficSigns.yield}\n\n🔵 **Umuvuduko:** ${knowledgeBase.trafficSigns.speedLimit}\n\n❌ **Kwinjira Birabujijwe:** ${knowledgeBase.trafficSigns.noEntry}\n\n📞 Ibibazo byindi? Hamagara Sangwa Bruce: +250 794 290 803`
  }

  // Traffic rules queries
  if (lowerMessage.includes("amategeko") || lowerMessage.includes("rules") || lowerMessage.includes("right of way")) {
    return `📋 **Amategeko y'Umuhanda:**\n\n➡️ **Uburenganzira bwo kugenda:** ${knowledgeBase.trafficRules.rightOfWay}\n\n🚗 **Guca Inyuma:** ${knowledgeBase.trafficRules.overtaking}\n\n🅿️ **Guhagarara:** ${knowledgeBase.trafficRules.parking}\n\n🔒 **Umukandara:** ${knowledgeBase.trafficRules.seatbelt}\n\n📞 Ubufasha bwindi? Sangwa Bruce: +250 794 290 803`
  }

  // Help queries
  if (lowerMessage.includes("ubufasha") || lowerMessage.includes("help") || lowerMessage.includes("support")) {
    return `🆘 **Ubufasha:**\n\n👨‍💻 **Sangwa Bruce - Developer**\n📞 **Telefoni:** +250 794 290 803\n📧 **Email:** sangwa@drivetest.rw\n⏰ **Igihe:** 24/7\n\n**Ndashobora kugufasha mu:**\n• Kwiyandikisha\n• Kwishyura Premium\n• Ibibazo by'ikizamini\n• Amategeko y'umuhanda\n• Ibibazo bya tekiniki\n\n💬 Hamagara cyangwa baza hano!`
  }

  // Greeting queries
  if (lowerMessage.includes("muraho") || lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return `👋 **Muraho neza!**\n\nNi **Sangwa AI Assistant**, nakozwe na **Sangwa Bruce** (+250 794 290 803).\n\n**Ndashobora kugufasha mu:**\n• 📚 Kwiyandikisha\n• 💎 Premium Package\n• 📋 Amategeko y'umuhanda\n• 🚦 Ibimenyetso by'umuhanda\n• 📞 Ubufasha bwihuse\n\n💬 **Baza ikibazo cyawe!**`
  }

  // Default response
  return `🤖 **Sangwa AI Assistant:**\n\nNtabwo nsobanuye neza ikibazo cyawe. Gerageza kubaza:\n\n• **"Kwiyandikisha"** - Kugira ngo umenye uko wiyandikisha\n• **"Premium"** - Kugira ngo umenye ibiciro\n• **"Ikizamini"** - Kugira ngo umenye ibijyanye n'ikizamini\n• **"Ibimenyetso"** - Kugira ngo umenye ibimenyetso by'umuhanda\n• **"Sangwa"** - Kugira ngo umenye umukoresha\n\n📞 **Cyangwa hamagara:** +250 794 290 803 (Sangwa Bruce)\n\n💬 Komeza kubaza, ndi hano kugufasha!`
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid message format",
        },
        { status: 400 },
      )
    }

    const response = generateResponse(message)

    return NextResponse.json({
      success: true,
      response: response,
    })
  } catch (error) {
    console.error("Chatbot API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Contact Sangwa Bruce at +250 794 290 803 for support.",
      },
      { status: 500 },
    )
  }
}
