import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth0 } from "@auth0/auth0-react";
import LanguageSwitcher from '@/components/Molecules/LanguageSwitcher';
import { 
  Zap, 
  Shield, 
  Palette, 
  Database, 
  Smartphone, 
  Code, 
  Globe,
  Layers,
  Server,
  Sparkles,
  GitBranch,
  Cpu,
  Settings,
  CheckCircle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export default function HomeRoute() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const { logout } = useAuth0();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div 
            className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <span className="text-white font-bold text-lg">A</span>
          </motion.div>
          <p className="text-gray-600">Loading...</p>
        </motion.div>
      </div>
    );
  }

  const techStack = [
    {
      name: "React 19",
      icon: <Code className="w-6 h-6" />,
      color: "from-blue-400 to-blue-600",
      description: "Latest React with hooks, suspense, and concurrent features"
    },
    {
      name: "NestJS",
      icon: <Server className="w-6 h-6" />,
      color: "from-red-400 to-red-600",
      description: "Enterprise-grade Node.js backend framework"
    },
    {
      name: "TypeScript",
      icon: <Code className="w-6 h-6" />,
      color: "from-blue-500 to-blue-700",
      description: "Type-safe development with modern ES features"
    },
    {
      name: "Auth0",
      icon: <Shield className="w-6 h-6" />,
      color: "from-orange-400 to-orange-600",
      description: "Enterprise authentication and authorization"
    },
    {
      name: "Tailwind CSS",
      icon: <Palette className="w-6 h-6" />,
      color: "from-teal-400 to-teal-600",
      description: "Utility-first CSS framework for rapid UI development"
    },
    {
      name: "Vite",
      icon: <Zap className="w-6 h-6" />,
      color: "from-purple-400 to-purple-600",
      description: "Lightning-fast build tool with HMR"
    },
    {
      name: "Redux Toolkit",
      icon: <Database className="w-6 h-6" />,
      color: "from-violet-400 to-violet-600",
      description: "Predictable state management with modern Redux"
    },
    {
      name: "Framer Motion",
      icon: <Sparkles className="w-6 h-6" />,
      color: "from-pink-400 to-pink-600",
      description: "Production-ready motion library for React"
    }
  ];

  const features = [
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Modular Architecture",
      description: "Clean separation of concerns with atomic design principles",
      details: ["Atoms, Molecules, Organisms", "Reusable components", "Scalable structure"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Production-ready authentication with Auth0 integration",
      details: ["JWT tokens", "Protected routes", "Role-based access", "Logout management"]
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile-First Design",
      description: "Responsive layout with mobile drawer navigation",
      details: ["Drawer navigation", "Touch-friendly", "Fluid animations", "PWA ready"]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Internationalization",
      description: "Multi-language support with i18next",
      details: ["RTL support", "Dynamic translations", "Language switching", "Locale detection"]
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "State Management",
      description: "Redux Toolkit with RTK Query for data fetching",
      details: ["Normalized state", "Async thunks", "RTK Query", "DevTools support"]
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Performance Optimized",
      description: "Code splitting, lazy loading, and optimized bundle",
      details: ["Tree shaking", "Code splitting", "Lazy routes", "Bundle analysis"]
    }
  ];

  const projectStructure = [
    {
      name: "Client (React)",
      path: "/Client",
      items: [
        "📦 components/ - Atomic design components",
        "🎣 hooks/ - Custom React hooks",
        "🗂️ store/ - Redux store and slices",
        "🛣️ routes/ - React Router pages",
        "🎨 components/ui/ - Shadcn/ui components",
        "🌐 locales/ - i18next translations",
        "🔧 services/ - API service layer"
      ]
    },
    {
      name: "Server (NestJS)",
      path: "/Server",
      items: [
        "🛡️ auth0/ - Authentication module",
        "👤 user/ - User management",
        "🏥 health/ - Health check endpoints",
        "🧪 test/ - Test module",
        "🎯 Guards - Route protection",
        "📊 Interceptors - Request/response handling"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <motion.header 
        className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 5 }}
              >
                <span className="text-white font-bold text-sm">A</span>
              </motion.div>
              <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                React-Nest Ultimate
              </h1>
            </motion.div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              {!isAuthenticated && (
                <Button 
                  onClick={() => navigate('/auth')}
                  variant="outline"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  Sign In
                </Button>
              )}
              {isAuthenticated && (
                <Button
                  onClick={() => {
                    localStorage.removeItem("auth0_token");
                    localStorage.removeItem("auth0_id_token");
                    localStorage.removeItem("auth0_user");
                    localStorage.removeItem("auth0_expires_at");
                    logout({ logoutParams: { returnTo: window.location.origin } });
                  }}
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-20 px-6">
        <div className="text-center max-w-6xl mx-auto">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="text-white font-bold text-2xl">A</span>
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              React + NestJS
            </motion.h1>
            <motion.h2 
              className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Enterprise Full-Stack Template
            </motion.h2>
          </motion.div>
          
          <motion.p 
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Production-ready template with modern architecture, enterprise security, mobile-first design, 
            and comprehensive developer experience. Built with React 19, NestJS, TypeScript, Auth0, and more.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {!isAuthenticated ? (
              <>
                <Button 
                  size="lg"
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  Get Started <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/test')}
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Live Demo
                </Button>
              </>
            ) : (
              <>
                <Button 
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  Dashboard <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/test')}
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold"
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Features
                </Button>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Enterprise Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for modern, scalable applications
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 text-white">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Modern Tech Stack
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Industry-leading technologies for enterprise applications
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <div className={`w-12 h-12 bg-gradient-to-br ${tech.color} rounded-lg flex items-center justify-center mx-auto mb-4 text-white`}>
                    {tech.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{tech.name}</h3>
                  <p className="text-sm text-gray-600">{tech.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Structure Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Project Architecture
            </h2>
            <p className="text-xl text-gray-600">
              Clean, organized structure for maintainable code
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projectStructure.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GitBranch className="w-5 h-5" />
                      {section.name}
                    </CardTitle>
                    <CardDescription>
                      <Badge variant="secondary">{section.path}</Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.items.map((item, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.1 }}
                          viewport={{ once: true }}
                          className="text-sm text-gray-600 bg-gray-50 p-2 rounded-md"
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Build Enterprise Applications?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start with our comprehensive template and accelerate your development process
            </p>
            
            {!isAuthenticated ? (
              <Button 
                size="lg"
                onClick={() => navigate('/auth')}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button 
                size="lg"
                onClick={() => navigate('/dashboard')}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                Continue to Dashboard <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">A</span>
              </div>
              <span className="text-gray-600 font-medium">React-Nest Ultimate Template</span>
            </motion.div>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              &copy; 2024 React-Nest Template. Built with 
              <span className="text-red-500">❤️</span> 
              for developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
