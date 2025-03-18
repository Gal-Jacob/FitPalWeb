import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';


export interface AuthPagesProps {
    onSwitchPage: () => void;
}

export const emailRegex = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;
export const passwordSignUpRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
export const passwordLogInRegex = /^.{8,}$/;

const AuthPages: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    const togglePage = () => setIsLogin(!isLogin);

    return isLogin ? <Login onSwitchPage={togglePage} /> : <SignUp onSwitchPage={togglePage} />;
};

export default AuthPages;
