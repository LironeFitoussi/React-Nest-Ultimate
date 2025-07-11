import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardAction } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const DashboardRoute: React.FC = () => {
  // Dummy data for the dashboard
  const stats = [
    { title: "Total Revenue", value: "$45,231.89", change: "+20.1%", trend: "up" },
    { title: "Active Users", value: "2,350", change: "+15.3%", trend: "up" },
    { title: "Total Orders", value: "12,234", change: "+3.2%", trend: "up" },
    { title: "Conversion Rate", value: "3.2%", change: "-2.1%", trend: "down" },
  ];

  const recentActivity = [
    { id: 1, user: "John Doe", action: "Made a purchase", amount: "$99.99", time: "2 minutes ago", status: "completed" },
    { id: 2, user: "Sarah Wilson", action: "Signed up", amount: "", time: "5 minutes ago", status: "new" },
    { id: 3, user: "Mike Johnson", action: "Updated profile", amount: "", time: "10 minutes ago", status: "updated" },
    { id: 4, user: "Emma Davis", action: "Made a purchase", amount: "$149.99", time: "15 minutes ago", status: "completed" },
    { id: 5, user: "Robert Brown", action: "Cancelled order", amount: "$79.99", time: "1 hour ago", status: "cancelled" },
  ];

  const quickActions = [
    { title: "Create New Product", description: "Add a new product to your store", icon: "📦" },
    { title: "Send Newsletter", description: "Send updates to your subscribers", icon: "📧" },
    { title: "Generate Report", description: "Create detailed analytics report", icon: "📊" },
    { title: "Manage Users", description: "View and edit user accounts", icon: "👥" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default">Completed</Badge>;
      case "new":
        return <Badge variant="secondary">New</Badge>;
      case "updated":
        return <Badge variant="outline">Updated</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? "📈" : "📉";
  };

  return (
    <div className="min-h-full bg-gray-50/30 p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business today.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              📅 This Week
            </Button>
            <Button size="sm" className="w-full sm:w-auto">
              📊 Generate Report
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <CardAction>
                <span className="text-xl">{getTrendIcon(stat.trend)}</span>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className={`text-sm flex items-center mt-1 ${
                stat.trend === "up" ? "text-green-600" : "text-red-600"
              }`}>
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        {/* Recent Activity */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions from your users and system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 lg:space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg gap-2">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end sm:space-x-3 ml-5 sm:ml-0">
                  <div className="flex items-center space-x-2">
                    {activity.amount && (
                      <span className="font-medium text-gray-900">{activity.amount}</span>
                    )}
                    {getStatusBadge(activity.status)}
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Button 
                key={index} 
                variant="outline" 
                className="w-full justify-start h-auto p-4 text-left"
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{action.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900">{action.title}</div>
                    <div className="text-sm text-gray-600">{action.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-6 lg:mt-8">
        {/* Revenue Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 lg:h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📈</div>
                <p className="text-gray-600">Revenue Chart</p>
                <p className="text-sm text-gray-500">Chart component would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Growth Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New user registrations over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 lg:h-64 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">👥</div>
                <p className="text-gray-600">User Growth Chart</p>
                <p className="text-sm text-gray-500">Chart component would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="mt-8 lg:mt-12 text-center text-gray-500">
        <p>© 2024 Your Company. All rights reserved.</p>
      </div>
    </div>
  );
};

export default DashboardRoute;
