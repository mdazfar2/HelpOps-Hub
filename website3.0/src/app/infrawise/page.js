"use client"
import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  Video,
  Star,
  ChevronRight,
  Search,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Instagram,
  Filter
} from 'lucide-react';



const experts = [
  {
    id: 1,
    name: "Sanya Gupta",
    title: "CI/CD Specialist",
    experience: "5+ Years of Expertise",
    price: 500,
    skills: ["Docker", "Jenkins", "GitLab CI"],
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
    rating: 4.9,
    social: {
      linkedin: "#",
      github: "#",
      email: "sanya@example.com",
      twitter: "#",
      instagram: "#"
    }
  },
  {
    id: 2,
    name: "Raj Patel",
    title: "Cloud Architecture Expert",
    experience: "7+ Years of Expertise",
    price: 300,
    skills: ["AWS", "Terraform", "Kubernetes"],
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296",
    rating: 5.0,
    social: {
      linkedin: "#",
      github: "#",
      email: "raj@example.com",
      twitter: "#",
      instagram: "#"
    }
  },
  {
    id: 3,
    name: "Lisa Chen",
    title: "DevSecOps Engineer",
    experience: "6+ Years of Expertise",
    price: 250,
    skills: ["Security", "Ansible", "Vault"],
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    rating: 4.8,
    social: {
      linkedin: "#",
      github: "#",
      email: "lisa@example.com",
      twitter: "#",
      instagram: "#"
    }
  },
  {
    id: 4,
    name: "Alex Kumar",
    title: "SRE Specialist",
    experience: "4+ Years of Expertise",
    price: 200,
    skills: ["Prometheus", "Grafana", "SLOs"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    rating: 4.9,
    social: {
      linkedin: "#",
      github: "#",
      email: "alex@example.com",
      twitter: "#",
      instagram: "#"
    }
  }
];

const skillCategories = [
  "All",
  "CI/CD",
  "Cloud Infrastructure",
  "Kubernetes",
  "DevSecOps",
  "SRE",
  "Automation"
];

function page() {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All");

  const handleConnect = (expert) => {
    setSelectedExpert(expert);
    setShowPayment(true);
  };

  const filteredExperts = experts.filter(expert => {
    console.log(expert)
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSkill = selectedSkill === "All" || expert.skills.some(skill => skill.includes(selectedSkill));
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-teal-400 to-white">
      {/* Hero Section */}
      <section className="px-6 py-20 pt-[10rem] text-center text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl font-bold mb-6">
            Find Your DevOps Expert – Solve Problems Faster
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Connect with skilled professionals to streamline your DevOps tasks effortlessly
          </p>
          <button 
            onClick={() => document.getElementById('experts')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
          >
            Explore Experts <ChevronRight className="inline ml-2" size={20} />
          </button>
        </div>
      </section>

      {/* Expert Search and Filter */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search experts by name or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-600" />
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {skillCategories.map((skill) => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Showcase */}
      <section id="experts" className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our DevOps Experts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredExperts.map((expert) => (
              <div key={expert.id} className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all">
                <img 
                  src={expert.image} 
                  alt={expert.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-center">{expert.name}</h3>
                <p className="text-blue-600 text-center mb-2">{expert.title}</p>
                <p className="text-gray-600 text-center text-sm mb-4">{expert.experience}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="ml-1 text-gray-700">{expert.rating}</span>
                  </div>
                  <span className="font-semibold">₹{expert.price}</span>
                </div>
                {/* Social Media Links */}
                <div className="flex justify-center gap-3 mb-4">
                  <a href={expert.social.linkedin} className="text-gray-600 hover:text-blue-600">
                    <Linkedin size={18} />
                  </a>
                  <a href={expert.social.github} className="text-gray-600 hover:text-blue-600">
                    <Github size={18} />
                  </a>
                  <a href={`mailto:${expert.social.email}`} className="text-gray-600 hover:text-blue-600">
                    <Mail size={18} />
                  </a>
                  <a href={expert.social.twitter} className="text-gray-600 hover:text-blue-600">
                    <Twitter size={18} />
                  </a>
                  <a href={expert.social.instagram} className="text-gray-600 hover:text-blue-600">
                    <Instagram size={18} />
                  </a>
                </div>
                <button
                  onClick={() => handleConnect(expert)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Connect Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Choose an Expert</h3>
              <p className="text-gray-600">Browse profiles and select the expert who fits your needs</p>
            </div>
            <div className="text-center">
              <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Make Payment</h3>
              <p className="text-gray-600">Complete secure payment to book your session</p>
            </div>
            <div className="text-center">
              <Video className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Collaborate Easily</h3>
              <p className="text-gray-600">Get a Google Meet link for your live session</p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      {showPayment && selectedExpert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Complete Your Booking</h3>
            <div className="flex items-center mb-6">
              <img 
                src={selectedExpert.image} 
                alt={selectedExpert.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="ml-4">
                <h4 className="font-semibold">{selectedExpert.name}</h4>
                <p className="text-gray-600">{selectedExpert.title}</p>
              </div>
            </div>
            <div className="border-t border-b py-4 mb-6">
              <div className="flex justify-between mb-2">
                <span>Session Fee</span>
                <span className="font-semibold">₹{selectedExpert.price}</span>
              </div>
              <p className="text-sm text-gray-600">
                After payment, you'll receive a Google Meet link for your session
              </p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowPayment(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Pay ₹{selectedExpert.price}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Simplifying DevOps Collaboration – One Expert at a Time
          </h2>
          <p className="text-gray-400 mb-6">
            Part of HelpOps-Hub | Contact: helpopshub@gmail.com
          </p>
          <p className="text-sm text-gray-500">
            © 2024 helpops. All payments are secure and processed by trusted payment partners.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default page;