import SignInForm from "@/components/Organisms/SignInForm";
import SignUpForm from "@/components/Organisms/SignUpForm";
import { useState } from "react";
import { useAuth } from '@/hooks/useAuth';
import { Navigate, useLocation } from "react-router-dom";

export default function AuthRoute() {
    const [isSignIn, setIsSignIn] = useState(true)
    const { isAuthenticated, isLoading } = useAuth()
    const location = useLocation()
    
    // Debug logging
    // console.log('AuthRoute Debug:', {
    //     pathname: location.pathname,
    //     isAuthenticated,
    //     isLoading,
    //     fromState: location.state?.from?.pathname
    // });
    
    const handleSwitchMode = () => {
        setIsSignIn(!isSignIn)
    }
    
    // Show loading while auth state is being determined
    if (isLoading) {
        return <div className="min-h-screen w-full flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Checking authentication...</p>
            </div>
        </div>
    }
    
    if (isAuthenticated) {
        // Redirect to the intended page or home page
        const from = location.state?.from?.pathname || '/'
        console.log('AuthRoute: Redirecting authenticated user to:', from);
        return <Navigate to={from} replace />
    }
    
    return (
        <div className="min-h-screen w-full">
            {isSignIn ? <SignInForm switchMode={handleSwitchMode}/> : <SignUpForm switchMode={handleSwitchMode}/>}
        </div>
    )
}
