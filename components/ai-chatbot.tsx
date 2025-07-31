"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "👋 Muraho! Ndi AI Assistant wa **Sangwa Test Hub**. Nshobora kugufasha mu:\n\n• Ibibazo ku kwiyandikisha\n• Amakuru ku Premium\n• Ubufasha mu kwiga\n• Ibibazo ku bizamini\n• Amategeko y'umuhanda\n\nNdashaka kugufasha gute?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    // Developer/Contact related
    if (
      message.includes("developer") ||
      message.includes("sangwa") ||
      message.includes("bruce") ||
      message.includes("contact") ||
      message.includes("umukoresha")
    ) {
      return "👨‍💻 **Sangwa Test Hub** yakozwe na:\n\n**Sangwa Bruce** - Lead Developer\n📞 **+250 794 290 803**\n\n• Expert mu software development\n• 24/7 technical support\n• Specialized mu driving test systems\n• Available for direct support\n\nUshaka kumuvugisha? Hamagara: **+250 794 290 803**"
    }

    // Admin credentials
    if (message.includes("admin") || message.includes("administrator")) {
      return "🔐 **Admin Access:**\n\n**Phone:** 0794290803\n**Password:** Sangwa@123\n\n⚠️ **Admin credentials ni za Sangwa Bruce gusa!**\n\nNiba ufite ikibazo cya admin, hamagara: **+250 794 290 803**"
    }

    // Registration related
    if (
      message.includes("register") ||
      message.includes("kwiyandikisha") ||
      message.includes("account") ||
      message.includes("konti")
    ) {
      return "📝 **Kwiyandikisha - Sangwa Test Hub:**\n\n**Ukeneye:**\n• Amazina yawe yose\n• Nimero ya telefoni\n• Ahantu ubarizwa\n• Ijambo ry'ibanga (byibura 6 characters)\n\n**Injira:** Koresheje nimero ya telefoni n'ijambo ry'ibanga\n\nUfite ikibazo? Hamagara Sangwa Bruce: **+250 794 290 803**"
    }

    // Premium related
    if (
      message.includes("premium") ||
      message.includes("upgrade") ||
      message.includes("payment") ||
      message.includes("kwishyura")
    ) {
      return "👑 **Premium Features - 2,000 RWF/ukwezi**\n\n**Ubona:**\n• Unlimited practice exams\n• 1000+ premium questions\n• AI-powered adaptive learning\n• Detailed explanations\n• Priority support\n• Success guarantee\n\n**Kwishyura:** MTN/Airtel Mobile Money\n**Support:** Sangwa Bruce +250 794 290 803"
    }

    // Exam related
    if (
      message.includes("exam") ||
      message.includes("test") ||
      message.includes("ikizamini") ||
      message.includes("questions")
    ) {
      return "📚 **Amakuru ku Bizamini - Sangwa Test Hub:**\n\n**Free Users:**\n• 2 practice exams ku munsi\n• 50 questions available\n• 20 minutes per exam\n\n**Premium Users:**\n• Unlimited exams\n• 1000+ questions\n• Advanced features\n\n**Igipimo cyo gutsinda:** 60% (12/20)\n**Support:** +250 794 290 803"
    }

    // Language related
    if (message.includes("language") || message.includes("ururimi") || message.includes("langue")) {
      return "🌍 **Indimi zishoboka - Sangwa Test Hub:**\n\n• 🇷🇼 **Kinyarwanda** (Default)\n• 🇺🇸 **English**\n• 🇫🇷 **Français**\n\nUshobora guhindura ururimi hejuru y'urupapuro.\n\n**Developer:** Sangwa Bruce (+250 794 290 803)"
    }

    // Traffic rules
    if (
      message.includes("rules") ||
      message.includes("amategeko") ||
      message.includes("traffic") ||
      message.includes("road")
    ) {
      return "🚦 **Amategeko y'Umuhanda - Rwanda:**\n\n• **Umuvuduko:** 50km/h mu mujyi, 90km/h ku mihanda\n• **Seat belt:** Ni itegeko kuri bose\n• **Inzoga:** Birabujijwe rwose\n• **Telefoni:** Ntukayikoreshe utwaye\n• **Abantu bagenda n'amaguru:** Baha uburenganzira\n\n**Ubufasha:** Sangwa Bruce +250 794 290 803"
    }

    // Help/Support
    if (
      message.includes("help") ||
      message.includes("ubufasha") ||
      message.includes("support") ||
      message.includes("problem")
    ) {
      return "🆘 **24/7 Support - Sangwa Test Hub**\n\n**Sangwa Bruce - Developer**\n📞 **+250 794 290 803**\n\n**Tuzaguha ubufasha mu:**\n• Technical issues\n• Payment problems\n• Account questions\n• Study guidance\n• Admin issues\n\n**Available:** 24/7 with quick response!"
    }

    // Default response
    return '🤖 **Sangwa Test Hub AI Assistant**\n\nNtabwo nsobanuye neza icyo ushaka. Reka nkugire amakuru:\n\n**Ibibazo bishoboka:**\n• "Kwiyandikisha?"\n• "Premium features?"\n• "Sangwa Bruce contact?"\n• "Admin credentials?"\n• "Amategeko y\'umuhanda?"\n\n**Direct Support:** Sangwa Bruce\n📞 **+250 794 290 803**'
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button - Always visible */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-2xl hover:shadow-3xl transition-all duration-300 animate-pulse"
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white/10 border-white/20 backdrop-blur-xl shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-b border-white/10">
            <CardTitle className="flex items-center text-white">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold">Sangwa AI Assistant</div>
                <div className="text-sm text-gray-300">Sangwa Test Hub - By Sangwa Bruce</div>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 flex flex-col h-[400px]">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                          : "bg-white/10 text-white border border-white/20"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === "bot" && <Bot className="w-4 h-4 mt-1 text-blue-400 flex-shrink-0" />}
                        {message.sender === "user" && <User className="w-4 h-4 mt-1 text-white flex-shrink-0" />}
                        <div className="text-sm whitespace-pre-line">{message.content}</div>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-4 h-4 text-blue-400" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>

            <div className="p-4 border-t border-white/10">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Andika ubutumwa bwawe..."
                  className="flex-1 bg-white/5 border-white/20 text-white placeholder-gray-400"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-center mt-2">
                <p className="text-xs text-gray-400">Powered by Sangwa Bruce | 📞 +250 794 290 803</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
