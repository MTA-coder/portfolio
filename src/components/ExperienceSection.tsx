
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, GraduationCap, Sparkles } from 'lucide-react';
import StorytellingTimeline from './StorytellingTimeline';
import EducationCard from './EducationCard';

interface ExperienceItem {
  id: number;
  date: string;
  title: string;
  company: string;
  location: string;
  description: string[];
  isRight?: boolean;
  storyTitle?: string;
  impact?: string;
}

interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  location: string;
  date: string;
  achievements: string;
  scores: string;
}

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  
  const educationData: EducationItem[] = [
    {
      id: 1,
      degree: "BSc in Information Technology",
      institution: "University of Aleppo",
      location: "Syria, Aleppo",
      date: "2016 - 2022",
      scores: "Percentage = 84.743%, GPA = 3.7, CGPA = 8.4",
      achievements: "Achieved a remarkable 92% in my AI-focused graduation project, utilizing neural networks, Genie AI, and computer vision to generate 3D images of fruits from simple sketches."
    }
  ];
  
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      date: "July 2024 - Present",
      title: "Full Stack Web Developer [ANGULAR, ASP.NET CORE, VB.NET]",
      company: "Smart Works for Information System",
      location: "UAE, Abu Dhabi",
      storyTitle: "🚀 The AI Integration Pioneer",
      impact: "Revolutionizing government systems with AI-powered solutions",
      description: [
        "Developed five high-impact web applications for government and private clients, including an automated Correspondence System and a licensing system for the MOEI, integrating AI-driven chatbots and incorporating UAE PASS and UAE ICP for seamless user authentication.",
        "Architected and developed comprehensive high-impact web applications, enhancing communication efficiency by 40% and reducing processing time for approvals by 30%.",
        "Spearheaded AI-driven chatbots in web applications, improving user experience and reducing manual support intervention by 50%.",
        "Optimized database management with SSMS, improving application performance and implementing best practices for efficient data storage and retrieval.",
        "Championed Agile practices, achieving a 70% increase in project efficiency and adaptability to changing requirements."
      ],
      isRight: true
    },
    {
      id: 2,
      date: "April 2021 - January 2024",
      title: "Full Stack Web Developer (Angular & Laravel)",
      company: "IT-TRENDCO",
      location: "Germany, Remote",
      storyTitle: "🌍 The Remote Entrepreneur",
      impact: "Building global SaaS platforms from innovation to delivery",
      description: [
        "Built an ecommerce SaaS platform for indoor and outdoor restaurant operations and real-time cooker system, developed over 5 landing pages, and constructed an e-commerce store with admin control panels.",
        "Leveraged expertise as an entrepreneur to analyze business requirements, gather customer feedback, and implement new features, resulting in a 40% increase in success rate.",
        "Collaborated with cross-functional teams to ensure seamless coordination and adherence to agile methodology, increasing project efficiency by 70%.",
        "Boosted meal delivery efficiency by 80% through the implementation of a real-time system using Pusher technology.",
        "Achieved a 60% increase in landing page preloading speed by lazy loading section strategies and PWA."
      ],
      isRight: false
    },
    {
      id: 3,
      date: "April 2023 - September 2023",
      title: "Angular Developer",
      company: "Yesser Recruitment Project",
      location: "Saudi Arabia, Remote",
      storyTitle: "⚡ The Efficiency Architect",
      impact: "Streamlining enterprise operations with scalable solutions",
      description: [
        "Worked on ERP systems for managing employee, client, and worker information. Managed financial accounts and facilitated worker housing to ensure optimal client contracts.",
        "Created shared and isolated ag-grid components as templates which shortened 30% of code time.",
        "Enhanced maintainability by 60% and scalability by 40% by refactoring the code and using Ngrx Store.",
        "Implemented agile methodology to help deliver the app release on time with a success rate reaching 90%.",
        "Covered 90% of the project with unit tests, decreasing bugs by 30%."
      ],
      isRight: true
    },
    {
      id: 4,
      date: "July 2020 - April 2021",
      title: "Full Stack Web Developer [ANGULAR, LARAVEL, LARAVEL BLADE]",
      company: "404 Developers",
      location: "Syria, Aleppo",
      storyTitle: "🎯 The Foundation Builder",
      impact: "Starting the journey with solid fundamentals",
      description: [
        "Developed a restaurant management system and an E-learning platform.",
        "Improved coding and debugging by 20% through building services that handle RestAPIs and validation forms.",
        "Evolved many projects with a small team such as school management platforms.",
        "Implemented efficient database queries and optimized front-end components, resulting in a 30% reduction in page load times and an improved user experience.",
        "Integrated comprehensive error logging and monitoring tools, which led to a 50% reduction in time spent on identifying and fixing bugs."
      ],
      isRight: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.section
      id="experience"
      className="py-24 relative bg-gradient-to-b from-background via-tech-dark-purple/10 to-background"
      ref={sectionRef}
      style={{ opacity }}
    >
      {/* Enhanced background with storytelling elements */}
      <div className="absolute inset-0 bg-grid opacity-5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-tech-purple/10 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-tech-blue/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced storytelling header */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="flex justify-center items-center gap-3 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-tech-purple/20 to-tech-blue/20 flex items-center justify-center backdrop-blur-sm border border-tech-purple/30">
              <Sparkles className="text-tech-purple" size={28} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              My <span className="text-gradient">Journey</span>
            </h2>
          </motion.div>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-tech-purple to-tech-blue mx-auto mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          
          <motion.p 
            className="text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            From humble beginnings to AI innovation - discover the story behind every milestone, 
            challenge overcome, and breakthrough achieved in my professional evolution.
          </motion.p>
          
          <motion.div
            className="mt-8 flex items-center justify-center gap-2 text-sm text-tech-purple"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={16} />
            </motion.div>
            <span>Scroll to explore the interactive timeline</span>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-6xl mx-auto"
        >
          <StorytellingTimeline items={experiences} />
        </motion.div>

        {/* Education Section with enhanced styling */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mt-32 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="flex justify-center items-center gap-3 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 rounded-lg bg-tech-purple/20 flex items-center justify-center">
              <GraduationCap className="text-tech-purple" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Academic <span className="text-gradient">Foundation</span>
            </h2>
          </motion.div>
          
          <motion.div 
            className="w-20 h-1 bg-tech-purple mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {educationData.map((item) => (
            <EducationCard key={item.id} education={item} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ExperienceSection;
