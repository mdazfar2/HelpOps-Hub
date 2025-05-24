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
  Filter,
  CreditCard,
  Landmark,
  Smartphone,
  Wallet,
  ArrowLeft,
  Banknote,
  QrCode,
  Loader2
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

const paymentMethods = [
  {
    id: 'upi',
    name: 'UPI Payment',
    icon: <Smartphone className="text-purple-600" size={24} />,
    description: 'Pay instantly using any UPI app',
    popular: true
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: <CreditCard className="text-blue-600" size={24} />,
    description: 'Pay with Visa, Mastercard, or Rupay',
    popular: true
  },
  {
    id: 'netbanking',
    name: 'Net Banking',
    icon: <Landmark className="text-green-600" size={24} />,
    description: 'Direct bank transfer from 50+ banks',
    popular: false
  },
  {
    id: 'wallet',
    name: 'Digital Wallets',
    icon: <Wallet className="text-orange-600" size={24} />,
    description: 'Paytm, PhonePe, Amazon Pay and more',
    popular: true
  }
];

function Page() {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [paymentStep, setPaymentStep] = useState('methods'); // 'methods', 'form', 'confirmation'
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    bankName: '',
    walletType: '',
    walletNumber: ''
  });

  const handleConnect = (expert) => {
    setSelectedExpert(expert);
    setShowPayment(true);
    setPaymentStep('methods');
  };

  const handlePaymentMethodSelect = (methodId) => {
    setSelectedPaymentMethod(methodId);
    setPaymentStep('form');
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsProcessing(false);
    setPaymentStep('confirmation');
  };

  const validatePaymentForm = () => {
    if (selectedPaymentMethod === 'upi' && !paymentDetails.upiId.includes('@')) {
      alert('Please enter a valid UPI ID (e.g., name@upi)');
      return false;
    }
    
    if (selectedPaymentMethod === 'card') {
      if (!paymentDetails.cardNumber || paymentDetails.cardNumber.length < 16) {
        alert('Please enter a valid 16-digit card number');
        return false;
      }
      if (!paymentDetails.cardName) {
        alert('Please enter cardholder name');
        return false;
      }
      if (!paymentDetails.cardExpiry || !paymentDetails.cardExpiry.includes('/')) {
        alert('Please enter valid expiry date (MM/YY)');
        return false;
      }
      if (!paymentDetails.cardCvv || paymentDetails.cardCvv.length < 3) {
        alert('Please enter valid CVV');
        return false;
      }
    }
    
    if (selectedPaymentMethod === 'netbanking' && !paymentDetails.bankName) {
      alert('Please select your bank');
      return false;
    }
    
    if (selectedPaymentMethod === 'wallet') {
      if (!paymentDetails.walletType) {
        alert('Please select wallet type');
        return false;
      }
      if (!paymentDetails.walletNumber || paymentDetails.walletNumber.length < 10) {
        alert('Please enter valid wallet number');
        return false;
      }
    }
    
    return true;
  };

  const renderPaymentForm = () => {
    switch (selectedPaymentMethod) {
      case 'upi':
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <QrCode className="w-16 h-16 mx-auto text-purple-500 mb-2" />
              <h4 className="font-medium text-lg">Pay via UPI</h4>
              <p className="text-gray-600 text-sm">Enter your UPI ID or scan QR code</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                <input
                  type="text"
                  placeholder="yourname@upi"
                  value={paymentDetails.upiId}
                  onChange={(e) => setPaymentDetails({...paymentDetails, upiId: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="text-center py-4">
                <div className="inline-block px-4 py-2 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-600">OR</p>
                </div>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
                <p className="text-gray-600 mb-2">Scan QR Code to Pay</p>
                <div className="bg-gray-200 w-32 h-32 mx-auto flex items-center justify-center">
                  <QrCode size={48} className="text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-2">Scan with any UPI app</p>
              </div>
            </div>
          </div>
        );
      case 'card':
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <CreditCard className="w-16 h-16 mx-auto text-blue-500 mb-2" />
              <h4 className="font-medium text-lg">Pay via Card</h4>
              <p className="text-gray-600 text-sm">Enter your card details securely</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={paymentDetails.cardNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                    setPaymentDetails({...paymentDetails, cardNumber: value});
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={paymentDetails.cardName}
                  onChange={(e) => setPaymentDetails({...paymentDetails, cardName: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={paymentDetails.cardExpiry}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length > 2) {
                        value = value.slice(0, 2) + '/' + value.slice(2, 4);
                      }
                      setPaymentDetails({...paymentDetails, cardExpiry: value});
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="password"
                    placeholder="123"
                    value={paymentDetails.cardCvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                      setPaymentDetails({...paymentDetails, cardCvv: value});
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CheckCircle2 className="text-green-500" size={16} />
                <span>Your payment details are secured with 256-bit encryption</span>
              </div>
            </div>
          </div>
        );
      case 'netbanking':
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Landmark className="w-16 h-16 mx-auto text-green-500 mb-2" />
              <h4 className="font-medium text-lg">Net Banking</h4>
              <p className="text-gray-600 text-sm">Select your bank for payment</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Bank</label>
                <select
                  value={paymentDetails.bankName}
                  onChange={(e) => setPaymentDetails({...paymentDetails, bankName: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select your bank</option>
                  <option value="sbi">State Bank of India</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="axis">Axis Bank</option>
                  <option value="kotak">Kotak Mahindra Bank</option>
                  <option value="other">Other Banks</option>
                </select>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">
                  You will be redirected to your bank's secure payment page to complete the transaction
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CheckCircle2 className="text-green-500" size={16} />
                <span>All banks follow RBI security guidelines</span>
              </div>
            </div>
          </div>
        );
      case 'wallet':
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Wallet className="w-16 h-16 mx-auto text-orange-500 mb-2" />
              <h4 className="font-medium text-lg">Digital Wallet</h4>
              <p className="text-gray-600 text-sm">Pay using your favorite wallet</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Wallet</label>
                <select
                  value={paymentDetails.walletType}
                  onChange={(e) => setPaymentDetails({...paymentDetails, walletType: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                >
                  <option value="">Select wallet</option>
                  <option value="paytm">Paytm</option>
                  <option value="phonepe">PhonePe</option>
                  <option value="amazonpay">Amazon Pay</option>
                  <option value="mobikwik">MobiKwik</option>
                  <option value="freecharge">FreeCharge</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="Registered wallet number"
                  value={paymentDetails.walletNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setPaymentDetails({...paymentDetails, walletNumber: value});
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CheckCircle2 className="text-green-500" size={16} />
                <span>You may need to verify with OTP from your wallet</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderConfirmation = () => (
    <div className="text-center py-8">
      <CheckCircle2 className="w-16 h-16 mx-auto text-green-500 mb-4" />
      <h3 className="text-2xl font-bold mb-2">Payment Successful!</h3>
      <p className="text-gray-600 mb-6">
        You've successfully booked a session with {selectedExpert.name}
      </p>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
        <div className="flex justify-between mb-2">
          <span>Amount Paid</span>
          <span className="font-semibold">₹{selectedExpert.price}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Payment Method</span>
          <span className="font-semibold">
            {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Booking Reference</span>
          <span className="font-semibold">#DEV{Math.floor(100000 + Math.random() * 900000)}</span>
        </div>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
        <h4 className="font-medium mb-2">Session Details</h4>
        <p className="text-sm text-gray-600">
          Google Meet link has been sent to your email. The session will be available 10 minutes before the scheduled time.
        </p>
      </div>
      <button
        onClick={() => {
          setShowPayment(false);
          setPaymentStep('methods');
          setPaymentDetails({
            upiId: '',
            cardNumber: '',
            cardName: '',
            cardExpiry: '',
            cardCvv: '',
            bankName: '',
            walletType: '',
            walletNumber: ''
          });
        }}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
      >
        Done
      </button>
    </div>
  );

  const filteredExperts = experts.filter(expert => {
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

      {/* Enhanced Payment Modal */}
      {showPayment && selectedExpert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            {paymentStep === 'methods' ? (
              // Payment methods selection view
              <>
                <div className="flex items-center mb-6">
                  <button 
                    onClick={() => {
                      setShowPayment(false);
                      setPaymentStep('methods');
                    }}
                    className="mr-4 p-2 rounded-full hover:bg-gray-100"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <h3 className="text-2xl font-bold">Select Payment Method</h3>
                </div>
                
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Total Amount</span>
                    <span className="font-bold text-lg">₹{selectedExpert.price}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Booking for {selectedExpert.name}, {selectedExpert.title}
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-700 mb-2">Popular Payment Methods</h4>
                  {paymentMethods.filter(method => method.popular).map(method => (
                    <div 
                      key={method.id}
                      onClick={() => handlePaymentMethodSelect(method.id)}
                      className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-all"
                    >
                      <div className="flex items-center">
                        <div className="mr-4">
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-gray-600">{method.description}</div>
                        </div>
                        <ChevronRight className="text-gray-400" size={20} />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-700 mb-2">Other Payment Methods</h4>
                  {paymentMethods.filter(method => !method.popular).map(method => (
                    <div 
                      key={method.id}
                      onClick={() => handlePaymentMethodSelect(method.id)}
                      className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-all"
                    >
                      <div className="flex items-center">
                        <div className="mr-4">
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-gray-600">{method.description}</div>
                        </div>
                        <ChevronRight className="text-gray-400" size={20} />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : paymentStep === 'form' ? (
              // Payment form view
              <>
                <div className="flex items-center mb-6">
                  <button 
                    onClick={() => setPaymentStep('methods')}
                    className="mr-4 p-2 rounded-full hover:bg-gray-100"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <h3 className="text-2xl font-bold">
                    {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
                  </h3>
                </div>
                
                <form onSubmit={handlePaymentSubmit}>
                  {renderPaymentForm()}
                  
                  <div className="mt-6">
                    <button 
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="animate-spin mr-2" size={20} />
                          Processing...
                        </>
                      ) : (
                        `Pay ₹${selectedExpert.price} Now`
                      )}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              // Confirmation view
              renderConfirmation()
            )}
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

export default Page;