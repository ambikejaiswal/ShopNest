import React from 'react';

const ReturnPolicy = () => {
  const containerStyle = {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '40px',
    background: '#18181b',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.05)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
    color: '#d4d4d8',
    lineHeight: '1.7'
  };

  const headingStyle = {
    color: '#f97316',
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    background: 'transparent'
  };

  const sectionStyle = {
    color: '#fff',
    marginTop: '30px',
    marginBottom: '10px'
  };

  return (
    <div style={containerStyle}>

      <h2 style={headingStyle}>
        Return & Refund Policy
      </h2>

      <p>
        At ShopNest, we proudly offer a hassle-free return and refund
        policy for all our customers. Here are the guidelines:
      </p>

      <h4 style={sectionStyle}>
        1. Return Policy
      </h4>

      <p>
        If you are not satisfied with your purchase, you have the right
        to return or exchange the product within 30 days of purchase.
        Please note that the return shipping fee will be deducted from
        the original purchase price.
      </p>

      <h4 style={sectionStyle}>
        2. Refund Policy
      </h4>

      <p>
        Once the returned product is received and inspected, the refund
        will be processed to the original payment method.
      </p>

      <h4 style={sectionStyle}>
        3. Conditions for Return
      </h4>

      <p>
        Products must be unused, in their original condition, and
        returned with the original packaging and accessories.
      </p>

    </div>
  );
};

export default ReturnPolicy;