import React, { useState, useEffect } from "react";
import axios from "axios";
import Graph from "./Graph";
import "./Dashboard.css"; // Import the CSS file for styling

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://api.thingspeak.com/channels/1596152/feeds.json?results=5";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        const feeds = response.data.feeds;

        const processedData = {
          labels: feeds.map((item) => new Date(item.created_at).toLocaleTimeString()), // X-axis: Timestamps
          field1: feeds.map((item) => parseFloat(item.field1 || 0)), // PM2.5
          field2: feeds.map((item) => parseFloat(item.field2 || 0)), // PM10
          field3: feeds.map((item) => parseFloat(item.field3 || 0)), // Ozone
          field4: feeds.map((item) => parseFloat(item.field4 || 0)), // Humidity
          field5: feeds.map((item) => parseFloat(item.field5 || 0)), // Temperature
          field6: feeds.map((item) => parseFloat(item.field6 || 0)), // CO
        };

        setData(processedData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <h2>Air Quality Dashboard</h2>
        <a href="https://github.com/Bittu-kumar2003" target="_blank" rel="noopener noreferrer">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbqj9Ii13d6hx5a9kyLnC5A8A96LDSaSZv_w&s" alt="GitHub Logo" className="github-logo" />
        </a>
      </nav>

      <header className="dashboard-header">
        <h1>Air Quality Monitoring Dashboard</h1>
        <p className="subtitle">Real-time data visualization of environmental parameters.</p>
      </header>

      <div className="graphs-container">
        <div className="graph-box">
          <Graph labels={data.labels} data={data.field1} title="PM2.5 Levels" color="rgba(255, 99, 132)" />
        </div>
        <div className="graph-box">
          <Graph labels={data.labels} data={data.field2} title="PM10 Levels" color="rgba(54, 162, 235)" />
        </div>
        <div className="graph-box">
          <Graph labels={data.labels} data={data.field3} title="Ozone Levels" color="rgba(75, 192, 192)" />
        </div>
        <div className="graph-box">
          <Graph labels={data.labels} data={data.field4} title="Humidity Levels" color="rgba(255, 206, 86)" />
        </div>
        <div className="graph-box">
          <Graph labels={data.labels} data={data.field5} title="Temperature Levels" color="rgba(153, 102, 255)" />
        </div>
        <div className="graph-box">
          <Graph labels={data.labels} data={data.field6} title="CO Levels" color="rgba(255, 159, 64)" />
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Air Quality Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
