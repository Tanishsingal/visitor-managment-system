
// src/components/admin/VisitStats.tsx
interface VisitStatsProps {
    stats: {
      totalVisits: number;
      pendingVisits: number;
      activeVisits: number;
      totalEmployees: number;
    };
  }
  
  export const VisitStats = ({ stats }: VisitStatsProps) => {
    const statCards = [
      { name: 'Total Visits', value: stats.totalVisits, color: 'bg-blue-500' },
      { name: 'Pending Visits', value: stats.pendingVisits, color: 'bg-yellow-500' },
      { name: 'Active Visits', value: stats.activeVisits, color: 'bg-green-500' },
      { name: 'Total Employees', value: stats.totalEmployees, color: 'bg-purple-500' },
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} rounded-full p-3 text-white`}>
                {/* You can add icons here */}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  