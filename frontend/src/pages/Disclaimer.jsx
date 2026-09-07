import React from 'react';

const textualStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '40px',
    background: '#18181b',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255,255, 0.05)',
    lineHeight: '1.8',
    color: '#a1a1aa'
};

const Disclaimer = () => {
    return (
        <div style={textualStyle}>
            <h2 style={{ color: '#fff', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
                Disclaimer
            </h2>
            <p style={{ marginBottom: '20px' }}>
                The data, interface, and graphical components represented across the shopnest domain.
            </p>
            <p style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '20px' }}>
                The information provided on this website is for general informational purposes only and should not be
                considered as legal, tax, or financial advice. Any information provided on this website should not be
                construed as a solicitation or offer to sell any securities in any jurisdiction. The publisher of this
                website does not guarantee the accuracy, completeness, or usefulness of the information provided on this
                website. The publisher of this website disclaims any liability for any errors or omissions in the
                information provided on this website.
            </p>
            <p style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '20px' }}>
                The materials spanning the shopnest interface may heavily include dynamic technical,
                typographical, or dummy photographic elements.
            </p>
        </div>
    );    
};

export default Disclaimer;