import React, { useEffect } from 'react';
import { Video, Shield, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            console.warn('Speech recognition not supported in this browser.');
            return;
        }

        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
            console.log("Recognized speech:", transcript);

            if (transcript.includes('doctor verification')) {
                navigate('/consultation');
            } else if (transcript.includes('consultation')) {
                navigate('/videocall');
            }
        };

        recognition.start();
        return () => recognition.stop();
    }, [navigate]);

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f6ff', color: '#4c1d95' }}>
            <nav style={{ backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button onClick={() => navigate("/home")}>Back</button>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#4c1d95' }}>SeniorEase</h1>
                </div>
                <div>
                    <button style={{ color: '#4c1d95', fontWeight: '600', padding: '8px 16px', marginRight: '12px', border: '2px solid #4c1d95', borderRadius: '8px', backgroundColor: 'white', cursor: 'pointer', transition: '0.3s' }}
                        onClick={() => navigate("/consultation")}>
                        Doctor Verification
                    </button>
                    <button style={{ backgroundColor: '#4c1d95', color: 'white', fontWeight: '600', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', transition: '0.3s', border: 'none' }}
                        onClick={() => navigate("/videocall")}>
                        Consultation
                    </button>
                </div>
            </nav>

            <div style={{ maxWidth: '1200px', margin: 'auto', padding: '32px 16px' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Welcome to SeniorEase Connect</h1>
                    <p style={{ fontSize: '20px', color: '#6b7280' }}>Quality healthcare from the comfort of your home</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }}>
                    <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
                        <Video style={{ margin: 'auto', color: '#4c1d95', marginBottom: '16px' }} size={48} />
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Video Consultations</h2>
                        <p style={{ color: '#6b7280' }}>Connect with verified doctors through high-quality video calls</p>
                    </div>

                    <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
                        <Shield style={{ margin: 'auto', color: '#4c1d95', marginBottom: '16px' }} size={48} />
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Verified Doctors</h2>
                        <p style={{ color: '#6b7280' }}>All our doctors are verified professionals with proven credentials</p>
                    </div>

                    <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
                        <Phone style={{ margin: 'auto', color: '#4c1d95', marginBottom: '16px' }} size={48} />
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Easy to Use</h2>
                        <p style={{ color: '#6b7280' }}>Simple interface designed specifically for senior citizens</p>
                    </div>
                </div>

                <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '48px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', textAlign: 'center', color: 'white' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px', color: '#4c1d95' }}>Start Your Consultation Today</h2>
                    <p style={{ fontSize: '20px', marginBottom: '24px', color: '#4c1d95' }}>Connect with qualified healthcare professionals from the comfort of your home</p>
                </div>
            </div>
        </div>
    );
}

export default Home;