import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        const fetchMyOrders = async () => {
            try {
                const res = await fetch('/api/orders/myorders', {
                        headers: {'Authorization': `Bearer ${user.token}`}
                });
                const data = await res.json();
                if (res.ok) {
                    setOrders(Array.isArray(data) ? data : []);
                } else {
                    //Token obsolete or 401: clear and bounce
                    if (res.status === 401) {
                        logout();
                        navigate('/login');
                    }
                    setOrders([]);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchMyOrders();
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const containerStyle = { maxWidth: '1200px', margin: '40px auto', padding: '20px', background: '#18181b', borderRadius: '16px', border: '1px solid rgba(255, 255,255, 0.05)', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)', textAlign: 'center' };
    const badgeStyle = { background: '#f97316', color: '#ffffff', padding: '5px 10px', borderRadius: '5px', fontSize: '0.8rem', margin: '0 5px' };

    if (!user) return null;

  return (
    <div style={containerStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
            paddingBottom: '20px', marginBottom: '20px' }}>
            <div>
                <h2 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '10px' }}>My Profile</h2> 
                <p style={{ color: '#a1a1aa', fontSize: '1.2rem', marginBottom: '20px' }}><strong>Name</strong> {user.name}</p>
                <p style={{ color: '#a1a1aa', fontSize: '1.2rem', marginBottom: '20px' }}><strong>Email</strong> {user.email}</p>
                <span style={badgeStyle}>Account Type: {user.role.toUpperCase()}</span>
            </div>
            <button onClick={handleLogout} className="btn" style={{ backgroundColor: '#f97316', color: '#ef4444', boxShadow: 'none' }}>Logout</button>
        </div>
        <h3 style={{ color: '#f97316', fontSize: '2rem', marginBottom: '20px' }}>My Orders</h3>
        { loading ? (<p style={{ color: '#ef4444' }}>Loading...</p>
        ) : orders.length === 0 ? (
          <div style={{ background: '#09090b', borderRadius: '16px', padding: '20px', textAlign: 'center', border: '1px solid #27272a' }}>
            <p style={{ color: '#a1a1aa', marginBottom: '15px' }}>You have not placed any orders yet.</p>
            <Link to='/shop' className='btn'>Go Shopping</Link>
           </div>
        ) : (
            <div style={{ display: 'grid', gap: '20px'}}>
                {orders.map(order => (
                    <div key={order._id} style={{ background: '#09090b', borderRadius: '16px', padding: '20px', border: '1px solid #27272a', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap:'20px' }}>
                        <div>
                            <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '5px' }}>Order ID: <span style={{ color: '#fff'}}>{order._id}</span></p>
                            <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '5px' }}>Placed On: <span style={{ color: '#fff'}}>{new Date(order.createdAt).toLocaleDateString()}</span></p>
                            <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '5px' }}>Total Price: <strong style={{ color: '#10b981'}}>${order.totalAmount.toFixed(2)}</strong></p>
                            <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '5px' }}>Status: <span style={{ color: '#fff'}}>{order.status}</span></p>
                        </div>
                        <div>
                            <span style={{ 
                                background: order.status === "Delivered" ? "#230a25b5" : order.status === 'Shipped' ? 
                                '#220834': "rgba(249, 115, 22, 0.1)",
                                color: order.status === "Delivered" ? "#10b981" : order.status === 'Shipped' ? 
                                '#117ba9': "#f97316", padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold' 
                                }}>
                                    {order.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};

export default Profile;
