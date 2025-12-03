'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionContainer } from '@/components/SectionContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle2, Mail, MessageSquare, Calendar, Clock, Video, Zap, TrendingUp, CalendarPlus, Download } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    size: '',
    useCase: '',
    preferredTime: '',
    message: '',
  });

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData({ ...formData, email });
    
    if (email && !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final email validation
    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateICSFile = () => {
    // Create ICS file content for calendar
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Unifictional//Demo Call//EN
BEGIN:VEVENT
UID:${Date.now()}@unifictional.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${new Date(Date.now() + 86400000).toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${new Date(Date.now() + 86400000 + 1800000).toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:Unifictional Demo Call
DESCRIPTION:Your personalized demo with the Unifictional team. We'll walk you through the platform and answer all your questions.
LOCATION:Video Call (Link will be sent via email)
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT15M
DESCRIPTION:Demo call starts in 15 minutes
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'unifictional-demo.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const addToGoogleCalendar = () => {
    const event = {
      text: 'Unifictional Demo Call',
      details: 'Your personalized demo with the Unifictional team. We\'ll walk you through the platform and answer all your questions.',
      location: 'Video Call (Link will be sent via email)',
      dates: `${new Date(Date.now() + 86400000).toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${new Date(Date.now() + 86400000 + 1800000).toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    };
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.text)}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}&dates=${event.dates}`;
    window.open(url, '_blank');
  };

  const addToOutlookCalendar = () => {
    const event = {
      subject: 'Unifictional Demo Call',
      body: 'Your personalized demo with the Unifictional team. We\'ll walk you through the platform and answer all your questions.',
      location: 'Video Call (Link will be sent via email)',
      startdt: new Date(Date.now() + 86400000).toISOString(),
      enddt: new Date(Date.now() + 86400000 + 1800000).toISOString(),
    };
    const url = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.subject)}&body=${encodeURIComponent(event.body)}&location=${encodeURIComponent(event.location)}&startdt=${event.startdt}&enddt=${event.enddt}`;
    window.open(url, '_blank');
  };

  const benefits = [
    'Personalized demo tailored to your use case',
    'See the AI in action with real examples',
    'Get answers to all your questions',
    'Discuss pricing and custom plans',
    'Free onboarding consultation included',
  ];

  const demoHighlights = [
    {
      icon: Video,
      title: '30-Minute Demo',
      description: 'Live walkthrough of the platform',
    },
    {
      icon: Zap,
      title: 'Instant Setup',
      description: 'Get started same day if you\'re ready',
    },
    {
      icon: TrendingUp,
      title: 'Growth Strategy',
      description: 'Free consultation on your goals',
    },
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'We respond within 4 hours',
    },
  ];

  return (
    <>
      <SectionContainer className="bg-gradient-to-b from-white via-[#F9FAFB] to-white pt-24 sm:pt-28 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16 px-4"
        >
          <div className="inline-block mb-3 sm:mb-4">
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-gold-50 to-blue-50 text-gold border border-gold-200">
              🚀 Book Your Free Demo
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] mb-4 sm:mb-6">
            Ready to{' '}
            <span className="bg-gradient-to-r from-gold to-blue bg-clip-text text-transparent">
              accelerate your growth?
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#6B7280] max-w-3xl mx-auto">
            Book a personalized demo and see exactly how Unifictional can transform your business. No credit card required.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto mb-10 sm:mb-12 md:mb-16">
          {demoHighlights.map((highlight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow"
            >
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-gold to-blue flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <highlight.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h3 className="font-semibold text-[#111827] mb-1 text-xs sm:text-sm">{highlight.title}</h3>
              <p className="text-[#6B7280] text-[10px] sm:text-xs leading-tight">{highlight.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-gray-200">
              {!submitted ? (
                <>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mb-2">Book Your Discovery Call</h2>
                  <p className="text-sm sm:text-base text-[#6B7280] mb-4 sm:mb-6">Fill out the form below and we'll be in touch within 4 hours</p>
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Smith"
                        required
                        className="mt-2"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Work Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        required
                        className={`mt-2 ${emailError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                        value={formData.email}
                        onChange={handleEmailChange}
                      />
                      {emailError && (
                        <p className="mt-1.5 text-xs text-red-600 flex items-center">
                          <span className="mr-1">⚠️</span>
                          {emailError}
                        </p>
                      )}
                      {formData.email && !emailError && (
                        <p className="mt-1.5 text-xs text-green-600 flex items-center">
                          <span className="mr-1">✓</span>
                          Valid email address
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        type="text"
                        placeholder="Your Company"
                        className="mt-2"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="mt-2"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="size">Company Size</Label>
                      <Select value={formData.size} onValueChange={(value) => setFormData({ ...formData, size: value })}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="solo">Just me</SelectItem>
                          <SelectItem value="2-10">2-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201+">201+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="use-case">What brings you to Unifictional?</Label>
                      <Select value={formData.useCase} onValueChange={(value) => setFormData({ ...formData, useCase: value })}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select your primary goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ai-website">AI Website</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="lead-generation">Lead Generation / Lead Management</SelectItem>
                          <SelectItem value="leads">Better lead management</SelectItem>
                          <SelectItem value="ads">AI ad creation</SelectItem>
                          <SelectItem value="all">Complete growth platform</SelectItem>
                          <SelectItem value="agency">Agency operations</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="preferred-time">Preferred Meeting Time</Label>
                      <Select value={formData.preferredTime} onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select your preferred time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning-9am">9:00 AM - 10:00 AM</SelectItem>
                          <SelectItem value="morning-10am">10:00 AM - 11:00 AM</SelectItem>
                          <SelectItem value="morning-11am">11:00 AM - 12:00 PM</SelectItem>
                          <SelectItem value="afternoon-12pm">12:00 PM - 1:00 PM</SelectItem>
                          <SelectItem value="afternoon-1pm">1:00 PM - 2:00 PM</SelectItem>
                          <SelectItem value="afternoon-2pm">2:00 PM - 3:00 PM</SelectItem>
                          <SelectItem value="afternoon-3pm">3:00 PM - 4:00 PM</SelectItem>
                          <SelectItem value="afternoon-4pm">4:00 PM - 5:00 PM</SelectItem>
                          <SelectItem value="flexible">Flexible - Any time works</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your needs..."
                        rows={4}
                        className="mt-2"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading || !!emailError || !formData.email}
                      className="w-full bg-gradient-to-r from-gold to-blue hover:opacity-90 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {loading ? 'Sending...' : 'Book My Free Demo →'}
                    </Button>
                    <p className="text-xs text-center text-[#6B7280]">
                      No credit card required • 14-day free trial available
                    </p>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="py-8"
                >
                  <div className="text-center mb-8">
                    <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#111827] mb-4">
                      Thanks for reaching out!
                    </h3>
                    <p className="text-[#6B7280] mb-2">
                      We've received your request and will get back to you within 24 hours. Check your email for confirmation.
                    </p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <CalendarPlus className="h-5 w-5 text-gold" />
                      <h4 className="font-semibold text-[#111827]">Add to Your Calendar</h4>
                    </div>
                    <p className="text-sm text-[#6B7280] text-center mb-6">
                      Save this demo call to your calendar so you don't miss it
                    </p>
                    
                    <div className="space-y-3">
                      <Button
                        onClick={addToGoogleCalendar}
                        variant="outline"
                        className="w-full border-2 border-gray-200 hover:border-gold hover:bg-gold-50 text-[#111827] justify-start"
                        size="lg"
                      >
                        <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none">
                          <path d="M20 10H4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10Z" fill="#4285F4"/>
                          <path d="M20 6V10H4V6C4 4.9 4.9 4 6 4H7V2H9V4H15V2H17V4H18C19.1 4 20 4.9 20 6Z" fill="#EA4335"/>
                          <path d="M8 13H6V15H8V13Z" fill="#34A853"/>
                          <path d="M12 13H10V15H12V13Z" fill="#FBBC04"/>
                          <path d="M16 13H14V15H16V13Z" fill="#4285F4"/>
                        </svg>
                        <span>Add to Google Calendar</span>
                      </Button>

                      <Button
                        onClick={addToOutlookCalendar}
                        variant="outline"
                        className="w-full border-2 border-gray-200 hover:border-blue hover:bg-blue-50 text-[#111827] justify-start"
                        size="lg"
                      >
                        <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none">
                          <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" fill="#0078D4"/>
                          <path d="M12 12L4 7V18L12 13L20 18V7L12 12Z" fill="#50E6FF"/>
                        </svg>
                        <span>Add to Outlook Calendar</span>
                      </Button>

                      <Button
                        onClick={generateICSFile}
                        variant="outline"
                        className="w-full border-2 border-gray-200 hover:border-gold hover:bg-gold-50 text-[#111827] justify-start"
                        size="lg"
                      >
                        <Download className="h-5 w-5 mr-3 text-gold" />
                        <span>Download .ics file (Apple Calendar & others)</span>
                      </Button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <Button
                      onClick={() => setSubmitted(false)}
                      variant="ghost"
                      className="w-full text-[#6B7280] hover:text-blue"
                    >
                      Submit Another Request
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6 sm:space-y-8 mt-6 lg:mt-0"
          >
            <div className="bg-gradient-to-br from-gold-50 via-blue-50 to-gold-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-gold-200 shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-[#111827] mb-2">What to expect in your demo</h3>
              <p className="text-sm sm:text-base text-[#6B7280] mb-4 sm:mb-6">We'll customize the session to your specific needs and goals</p>
              <ul className="space-y-3 sm:space-y-4">
                {benefits.map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-start space-x-2 sm:space-x-3"
                  >
                    <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#111827] font-medium">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-white/50 rounded-xl border border-gold-200">
                <p className="text-sm text-[#111827] font-medium">
                  💡 <span className="font-bold">Pro tip:</span> Come with your current challenges ready to discuss. We'll show you exactly how to solve them.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <Mail className="h-8 w-8 text-gold mb-4" />
                <h4 className="font-semibold text-[#111827] mb-2">Email Us</h4>
                <p className="text-[#6B7280] text-sm">Unifictional@gmail.com</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <MessageSquare className="h-8 w-8 text-blue mb-4" />
                <h4 className="font-semibold text-[#111827] mb-2">Live Chat</h4>
                <p className="text-[#6B7280] text-sm">Available Mon-Fri, 9am-5pm EST</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start space-x-4">
                <Calendar className="h-8 w-8 text-gold flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-[#111827] mb-2">Typical Response Time</h4>
                  <p className="text-[#6B7280] text-sm">
                    We typically respond within 4 hours during business days. For urgent matters, please mention that in your message.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionContainer>
    </>
  );
}
