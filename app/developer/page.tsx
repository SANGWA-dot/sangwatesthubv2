"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Phone,
  Code,
  Sparkles,
  Trophy,
  Heart,
  Star,
  Zap,
  Rocket,
  Crown,
  MessageCircle,
  BookOpen,
  GraduationCap,
  Lightbulb,
  Database,
  Server,
  Smartphone,
  Monitor,
  Cloud,
  Cpu,
} from "lucide-react"

export default function DeveloperProfile() {
  const router = useRouter()
  const [currentSkill, setCurrentSkill] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const skills = [
    "Full-Stack Development",
    "React & Next.js",
    "Node.js & Express",
    "Database Design",
    "UI/UX Design",
    "Mobile Development",
    "Cloud Computing",
    "AI Integration",
  ]

  const achievements = [
    {
      icon: Trophy,
      title: "50,000+ Users Served",
      description: "Successfully built platforms serving thousands of users across Rwanda",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Rocket,
      title: "95% Success Rate",
      description: "Delivered high-quality solutions with exceptional user satisfaction",
      color: "from-blue-500 to-purple-500",
    },
    {
      icon: Heart,
      title: "Community Impact",
      description: "Empowering Rwandan drivers with innovative learning platforms",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Zap,
      title: "Innovation Leader",
      description: "Pioneering AI-powered educational technology in Rwanda",
      color: "from-green-500 to-emerald-500",
    },
  ]

  const techStack = {
    Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    Backend: ["Node.js", "Express", "Python", "PHP", "REST APIs"],
    Database: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Supabase"],
    Mobile: ["React Native", "Flutter", "Progressive Web Apps"],
    Cloud: ["Vercel", "AWS", "Google Cloud", "Digital Ocean"],
    Tools: ["Git", "Docker", "VS Code", "Figma", "Postman"],
  }

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [skills.length])

  const calculateAge = () => {
    const birthDate = new Date("2003-10-13")
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to System
            </Button>
            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold px-4 py-2">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></div>
                Available for Projects
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="relative inline-block mb-8">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-8 border-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 shadow-2xl">
              <img
                src="/images/developer-profile.png"
                alt="Sangwa Bruce Principe"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <Crown className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Sangwa Bruce</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Principe
            </span>
          </h1>

          <div className="text-2xl md:text-3xl text-gray-300 mb-6 h-12 flex items-center justify-center">
            <span className="mr-2">🚀</span>
            <span className="transition-all duration-500">{skills[currentSkill]}</span>
          </div>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
              "The Hub of Creativity"
            </span>
            <br />
            Innovative Full-Stack Developer from Rwanda, passionate about creating impactful digital solutions that
            empower communities and drive technological advancement across Africa.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-white/10 text-white border-white/20 px-4 py-2">
              <Calendar className="w-4 h-4 mr-2" />
              {calculateAge()} Years Old
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20 px-4 py-2">
              <MapPin className="w-4 h-4 mr-2" />
              Nyagatare, Rwanda 🇷🇼
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20 px-4 py-2">
              <GraduationCap className="w-4 h-4 mr-2" />
              Software Developer
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => window.open("https://wa.me/250733296834", "_blank")}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp: +250 733 296 834
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:border-white/40 bg-transparent"
              onClick={() => window.open("tel:+250794290803", "_blank")}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call: +250 794 290 803
            </Button>
          </div>
        </div>

        {/* Personal Story Section */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl mb-12 hover:bg-white/10 transition-all duration-500">
          <CardHeader>
            <CardTitle className="text-3xl text-white flex items-center">
              <BookOpen className="w-8 h-8 mr-3 text-blue-400" />
              My Journey
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Heart className="w-5 w-5 mr-2 text-red-400" />
                  Personal Background
                </h3>
                <div className="space-y-3 text-gray-300">
                  <p>
                    <strong className="text-white">Born:</strong> October 13, 2003 in Rwanda 🇷🇼
                  </p>
                  <p>
                    <strong className="text-white">Family:</strong> Second child in a loving family of 4 children
                  </p>
                  <p>
                    <strong className="text-white">Passion:</strong> Grew up with an innate love for Information and
                    Communication Technology (ICT)
                  </p>
                  <p>
                    <strong className="text-white">Vision:</strong> To become Rwanda's leading innovator in educational
                    technology
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Lightbulb className="w-5 w-5 mr-2 text-yellow-400" />
                  Philosophy
                </h3>
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/30">
                  <p className="text-gray-200 italic text-lg leading-relaxed">
                    "Technology should not just solve problems—it should empower people, transform communities, and
                    create opportunities for growth. Every line of code I write is a step towards building a better
                    future for Rwanda and Africa."
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education Timeline */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl mb-12 hover:bg-white/10 transition-all duration-500">
          <CardHeader>
            <CardTitle className="text-3xl text-white flex items-center">
              <GraduationCap className="w-8 h-8 mr-3 text-green-400" />
              Educational Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Primary Education</h3>
                  <p className="text-blue-300 font-medium">G.S Rukomo Primary School</p>
                  <p className="text-gray-400">Nyagatare District, Rwanda</p>
                  <p className="text-gray-300 mt-2">
                    Foundation years where my curiosity for technology first sparked. Even as a young student, I was
                    fascinated by computers and dreamed of creating digital solutions.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Software Development</h3>
                  <p className="text-purple-300 font-medium">Lycée Saint Alexander Sauli de Muhura</p>
                  <p className="text-gray-400">Advanced Technical Education</p>
                  <p className="text-gray-300 mt-2">
                    Specialized in software development, where I mastered programming fundamentals and discovered my
                    passion for creating innovative digital solutions. This is where "The Hub of Creativity" was born.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Professional Development</h3>
                  <p className="text-green-300 font-medium">Self-Taught Full-Stack Developer</p>
                  <p className="text-gray-400">Continuous Learning & Innovation</p>
                  <p className="text-gray-300 mt-2">
                    Expanded expertise through continuous learning, mastering modern frameworks, cloud technologies, and
                    AI integration. Built multiple successful platforms serving thousands of users across Rwanda.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {achievements.map((achievement, index) => (
            <Card
              key={index}
              className="group bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-r ${achievement.color} items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <achievement.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {achievement.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technical Skills */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl mb-12 hover:bg-white/10 transition-all duration-500">
          <CardHeader>
            <CardTitle className="text-3xl text-white flex items-center">
              <Code className="w-8 h-8 mr-3 text-purple-400" />
              Technical Expertise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(techStack).map(([category, technologies]) => (
                <div key={category}>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    {category === "Frontend" && <Monitor className="w-5 h-5 mr-2 text-blue-400" />}
                    {category === "Backend" && <Server className="w-5 h-5 mr-2 text-green-400" />}
                    {category === "Database" && <Database className="w-5 h-5 mr-2 text-yellow-400" />}
                    {category === "Mobile" && <Smartphone className="w-5 h-5 mr-2 text-purple-400" />}
                    {category === "Cloud" && <Cloud className="w-5 h-5 mr-2 text-cyan-400" />}
                    {category === "Tools" && <Cpu className="w-5 h-5 mr-2 text-orange-400" />}
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {technologies.map((tech, index) => (
                      <Badge
                        key={index}
                        className="bg-white/10 text-white border-white/20 mr-2 mb-2 hover:bg-white/20 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact & Collaboration */}
        <Card className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-blue-500/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-white flex items-center">
              <Sparkles className="w-8 h-8 mr-3 text-yellow-400" />
              Let's Build Something Amazing Together
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-xl text-gray-200 leading-relaxed">
              Ready to transform your ideas into reality? Whether you need a cutting-edge web application, mobile app,
              or innovative digital solution, I'm here to help bring your vision to life.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4">Services I Offer:</h3>
                <div className="space-y-2">
                  {[
                    "Full-Stack Web Development",
                    "Mobile App Development",
                    "UI/UX Design & Prototyping",
                    "Database Design & Optimization",
                    "Cloud Deployment & DevOps",
                    "AI Integration & Automation",
                    "Technical Consulting",
                    "System Architecture Design",
                  ].map((service, index) => (
                    <div key={index} className="flex items-center text-gray-200">
                      <Star className="w-4 h-4 text-yellow-400 mr-3" />
                      {service}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4">Get In Touch:</h3>
                <div className="space-y-3">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white justify-start"
                    onClick={() => window.open("https://wa.me/250733296834", "_blank")}
                  >
                    <MessageCircle className="w-5 h-5 mr-3" />
                    WhatsApp: +250 733 296 834
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 justify-start bg-transparent"
                    onClick={() => window.open("tel:+250794290803", "_blank")}
                  >
                    <Phone className="w-5 h-5 mr-3" />
                    Phone: +250 794 290 803
                  </Button>
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-gray-200 text-sm">
                      <strong className="text-white">Response Time:</strong> Within 1 hour
                      <br />
                      <strong className="text-white">Availability:</strong> 24/7 for urgent projects
                      <br />
                      <strong className="text-white">Languages:</strong> English, Kinyarwanda, French
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-6 border-t border-white/10">
              <p className="text-gray-300 text-lg">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent font-bold">
                  "Sangwa Bruce - The Hub of Creativity"
                </span>
                <br />
                <span className="text-sm">Transforming Ideas into Digital Reality • Rwanda's Innovation Leader</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-xl py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 Sangwa Bruce Principe. All rights reserved.</p>
          <p className="text-gray-500 text-sm mt-2">Made with ❤️ in Rwanda 🇷🇼 | "The Hub of Creativity"</p>
        </div>
      </footer>
    </div>
  )
}
