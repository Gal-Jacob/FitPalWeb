import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';


export interface AuthPagesProps {
    onSwitchPage: () => void;
}

const AuthPages: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    const togglePage = () => setIsLogin(!isLogin);

    return isLogin ? <Login onSwitchPage={togglePage} /> : <SignUp onSwitchPage={togglePage} />;
};

export default AuthPages;
