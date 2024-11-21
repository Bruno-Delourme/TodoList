import { useState } from 'react';
import { auth } from '../../firebase';
import { 
    signInWithPopup, 
    GoogleAuthProvider,
    OAuthProvider,
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword 
} from 'firebase/auth';
import './Auth.css';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState('');

    // Connexion avec Google
    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (err) {
            setError(err.message);
        }
    };

    // Connexion avec Apple
    const handleAppleSignIn = async () => {
        try {
            const provider = new OAuthProvider('apple.com');
            provider.addScope('email');
            provider.addScope('name');
            await signInWithPopup(auth, provider);
        } catch (err) {
            setError(err.message);
        }
    };

    // Connexion avec email/mot de passe
    const handleEmailSignIn = async (e) => {
        e.preventDefault();
        try {
            if (isRegistering) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>{isRegistering ? 'Inscription' : 'Connexion'}</h2>
                {error && <p className="error">{error}</p>}
                
                {/* Boutons de connexion sociale */}
                <div className="social-buttons">
                    <button 
                        onClick={handleGoogleSignIn}
                        className="social-btn google-btn"
                    >
                        <img src="/google-icon.png" alt="Google" />
                        Continuer avec Google
                    </button>
                    
                    <button 
                        onClick={handleAppleSignIn}
                        className="social-btn apple-btn"
                    >
                        <img src="/apple-icon.png" alt="Apple" />
                        Continuer avec Apple
                    </button>
                </div>

                <div className="separator">ou</div>

                {/* Formulaire email/mot de passe */}
                <form onSubmit={handleEmailSignIn} className="email-form">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="submit-btn">
                        {isRegistering ? "S'inscrire" : 'Se connecter'}
                    </button>
                </form>

                <button
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="switch-auth"
                >
                    {isRegistering 
                        ? 'Déjà un compte ? Connectez-vous' 
                        : 'Créer un compte'}
                </button>
            </div>
        </div>
    );
};

export default Auth;