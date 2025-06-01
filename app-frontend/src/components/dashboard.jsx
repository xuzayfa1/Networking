import React, { useState, useEffect } from 'react';
import api from '../utils/api'; // axios o'rniga
import StatCard from './graph/statCards';
import SalesBarChart from './graph/BarChart';
import RevenueLineChart from './graph/LineChart';
import SalesPieChart from './graph/PieChart';
import CustomersTable from './graph/DataTable';
import ActivityFeed from './graph/ActivityFeeds';
import Sidebar from './sidebar';

function Dashboard() {
  const [stats, setStats] = useState({});
  const [barData, setBarData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [
          statsResponse,
          barResponse,
          lineResponse,
          pieResponse,
          customersResponse,
          activitiesResponse,
        ] = await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/sales/bar'),
          api.get('/sales/line'),
          api.get('/sales/pie'),
          api.get('/customers'),
          api.get('/activities'),
        ]);

        setStats(statsResponse.data);
        setBarData(barResponse.data);
        setLineData(lineResponse.data);
        setPieData(pieResponse.data);
        setCustomers(customersResponse.data);
        setActivities(activitiesResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(`Failed to load data: ${err.response?.status} - ${err.response?.data || err.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

  return (
    <div className="d-flex vh-100" style={{ overflow: 'hidden' }}>
      {/* Sidebar */}
      <div
        className="bg-light"
        style={{ width: '250px', height: '100%', position: 'fixed', top: 0, left: 0, padding: '20px', borderRight: '1px solid #dee2e6' }} >
        <Sidebar/>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1" style={{ marginLeft: '250px', padding: '20px', overflowY: 'auto' }}>
        <div className="container-fluid">
          {/* Stat Cards */}
          <div className="row g-4 mb-4">
            <div className="col-12 col-sm-4">
              <StatCard title="Total Products" value={stats.totalProduct || 0} />
            </div>
            <div className="col-12 col-sm-4">
              <StatCard title="Revenue (This Month)" value={stats.productRevenue ? `$${stats.productRevenue.toFixed(2)}` : '$0.00'} />
            </div>
            <div className="col-12 col-sm-4">
              <StatCard title="Products Sold" value={stats.productSold || 0} />
            </div>
          </div>

          {/* Bar and Line Charts */}
          <div className="row g-4 mb-4">
            <div className="col-12 col-md-6">
              <div className="bg-white p-3 rounded shadow" style={{ height: '400px' }}>
                <SalesBarChart data={barData} />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="bg-white p-3 rounded shadow" style={{ height: '400px' }}>
                <RevenueLineChart data={lineData} />
              </div>
            </div>
          </div>

          {/* Pie Chart and Customer Table */}
          <div className="row g-4 mb-4">
            <div className="col-12 col-md-6">
              <div className="bg-white p-3 rounded shadow" style={{ height: '400px' }}>
                <SalesPieChart data={pieData} />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="bg-white p-3 rounded shadow">
                <CustomersTable rows={customers} />
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white p-3 rounded shadow">
            <h5 className="mb-3">Recent Activities</h5>
            <ActivityFeed activities={activities} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
