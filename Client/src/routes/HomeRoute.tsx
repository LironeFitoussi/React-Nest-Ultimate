import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useAuth0 } from "@auth0/auth0-react";
import LanguageSwitcher from '@/components/Molecules/LanguageSwitcher';

export default function HomeRoute() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const { logout } = useAuth0();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className=" bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                React-Nest Template
              </h1>
            </div>
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
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-20 px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              React + NestJS
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Ultimate Full-Stack Template
            </h2>
          </div>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            A modern, production-ready template combining React with TypeScript frontend 
            and NestJS backend, featuring Auth0 authentication, beautiful UI components, 
            and best practices out of the box.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {!isAuthenticated ? (
              <>
                <Button 
                  size="lg"
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  Get Started
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/test')}
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold"
                >
                  View Demo
                </Button>
              </>
            ) : (
              <>
                <Button 
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  Go to Dashboard
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/test')}
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold"
                >
                  Explore Features
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with modern technologies and best practices for scalable applications
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Fast & Modern</h3>
              <p className="text-gray-600">
                Built with Vite, React 18, and NestJS for lightning-fast development and optimal performance.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">🔐</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Secure Authentication</h3>
              <p className="text-gray-600">
                Auth0 integration with JWT tokens, protected routes, and user management out of the box.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Beautiful UI</h3>
              <p className="text-gray-600">
                Shadcn/ui components with Tailwind CSS for stunning, responsive designs that work everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Powered by Modern Tech Stack
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Industry-leading technologies for robust, scalable applications
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "React", color: "from-blue-400 to-blue-600" },
              { name: "NestJS", color: "from-red-400 to-red-600" },
              { name: "TypeScript", color: "from-blue-500 to-blue-700" },
              { name: "Auth0", color: "from-orange-400 to-orange-600" },
              { name: "Tailwind", color: "from-teal-400 to-teal-600" },
              { name: "Vite", color: "from-purple-400 to-purple-600" },
              { name: "Redux", color: "from-violet-400 to-violet-600" },
              { name: "Axios", color: "from-green-400 to-green-600" }
            ].map((tech, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <div className={`w-12 h-12 bg-gradient-to-br ${tech.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                  <span className="text-white font-bold text-sm">{tech.name.charAt(0)}</span>
                </div>
                <span className="text-gray-700 font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start your next project with our comprehensive template and save weeks of development time.
          </p>
          
          {!isAuthenticated ? (
            <Button 
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Get Started Now
            </Button>
          ) : (
            <Button 
              size="lg"
              onClick={() => navigate('/dashboard')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Continue to Dashboard
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">A</span>
              </div>
              <span className="text-gray-600 font-medium">React-Nest Ultimate Template</span>
            </div>
            <p className="text-sm text-gray-600">
              &copy; 2024 React-Nest Template. Built with ❤️ for developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
