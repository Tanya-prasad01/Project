import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmergencyAlerts({ token }) {
  const [alerts, setAlerts] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get('/api/alerts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAlerts(res.data);
        const unread = res.data.filter(alert => alert.status === 'Sent');
        setUnreadCount(unread.length);

        if (unread.length > 0) {
          alert(`🚨 ${unread.length} Emergency Alert(s)! Check Now!`);
        }
      } catch (err) {
        console.error('Error fetching alerts:', err);
      }
    };

    fetchAlerts();

    // Poll every 60 seconds
    const interval = setInterval(fetchAlerts, 60000);

    return () => clearInterval(interval);
  }, [token]);

  return (
    <div>
      <h3>Emergency Alerts ({unreadCount} Unread)</h3>
      <ul>
        {alerts.map(alert => (
          <li key={alert._id}>
            📢 {alert.message} - {new Date(alert.sentAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmergencyAlerts;
