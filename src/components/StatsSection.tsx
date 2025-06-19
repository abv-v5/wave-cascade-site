
import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Clock, Award, Target, Zap } from 'lucide-react';

const StatsSection = () => {
  const [counters, setCounters] = useState({
    customers: 0,
    tickets: 0,
    satisfaction: 0,
    response: 0
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const barData = [
    { month: 'Jan', tickets: 2400, resolved: 2100 },
    { month: 'Feb', tickets: 1398, resolved: 1300 },
    { month: 'Mar', tickets: 9800, resolved: 9200 },
    { month: 'Apr', tickets: 3908, resolved: 3600 },
    { month: 'May', tickets: 4800, resolved: 4500 },
    { month: 'Jun', tickets: 3800, resolved: 3650 },
  ];

  const lineData = [
    { day: 'Mon', satisfaction: 95 },
    { day: 'Tue', satisfaction: 97 },
    { day: 'Wed', satisfaction: 94 },
    { day: 'Thu', satisfaction: 98 },
    { day: 'Fri', satisfaction: 96 },
    { day: 'Sat', satisfaction: 99 },
    { day: 'Sun', satisfaction: 97 },
  ];

  const pieData = [
    { name: 'Resolved', value: 85, color: '#10b981' },
    { name: 'In Progress', value: 12, color: '#f59e0b' },
    { name: 'Pending', value: 3, color: '#ef4444' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const animateCounter = (target: number, key: keyof typeof counters, duration: number) => {
      let start = 0;
      const increment = target / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCounters(prev => ({ ...prev, [key]: target }));
          clearInterval(timer);
        } else {
          setCounters(prev => ({ ...prev, [key]: Math.floor(start) }));
        }
      }, 16);
    };

    animateCounter(10000, 'customers', 2000);
    animateCounter(50000, 'tickets', 2500);
    animateCounter(98, 'satisfaction', 1500);
    animateCounter(15, 'response', 1000);
  }, [isVisible]);

  const stats = [
    {
      icon: <Users className="text-blue-600" size={32} />,
      title: "Happy Customers",
      value: `${counters.customers.toLocaleString()}+`,
      description: "Served worldwide",
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: <Target className="text-green-600" size={32} />,
      title: "Tickets Resolved",
      value: `${counters.tickets.toLocaleString()}+`,
      description: "This month",
      color: "bg-green-50 border-green-200"
    },
    {
      icon: <Award className="text-purple-600" size={32} />,
      title: "Satisfaction Rate",
      value: `${counters.satisfaction}%`,
      description: "Customer satisfaction",
      color: "bg-purple-50 border-purple-200"
    },
    {
      icon: <Zap className="text-orange-600" size={32} />,
      title: "Response Time",
      value: `${counters.response}s`,
      description: "Average response",
      color: "bg-orange-50 border-orange-200"
    }
  ];

  return (
    <section id="stats" ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Performance Speaks
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time insights into our customer service excellence
          </p>
        </div>

        {/* Animated Counter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.color} border-2 rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 hover:shadow-xl`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </h3>
              <p className="text-lg font-semibold text-gray-700 mb-1">
                {stat.title}
              </p>
              <p className="text-gray-600">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bar Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <TrendingUp className="text-blue-600 mr-3" size={24} />
              <h3 className="text-2xl font-bold text-gray-900">Ticket Resolution Trends</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tickets" fill="#3b82f6" name="Total Tickets" />
                <Bar dataKey="resolved" fill="#10b981" name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Ticket Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{entry.name}</span>
                  </div>
                  <span className="font-semibold">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="mt-8 bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Weekly Satisfaction Scores</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[90, 100]} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="satisfaction" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
