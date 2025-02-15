// // src/controllers/analyticsController.ts
// import { Request, Response } from 'express';
// import { db } from '../db';

// export const getDashboardStats = async (req: Request, res: Response) => {
//   try {
//     const { range = 'week' } = req.query;
//     const startDate = new Date();
    
//     // Set date range
//     switch(range) {
//       case 'day':
//         startDate.setHours(0, 0, 0, 0);
//         break;
//       case 'week':
//         startDate.setDate(startDate.getDate() - 7);
//         break;
//       case 'month':
//         startDate.setMonth(startDate.getMonth() - 1);
//         break;
//     }

//     const [totalVisits, activeVisits, visitsOverTime, visitsByDepartment] = await Promise.all([
//       db.visit.count(),
//       db.visit.count({ where: { status: 'CHECKED_IN' } }),
//       db.visit.groupBy({
//         by: ['checkIn'],
//         where: {
//           checkIn: {
//             gte: startDate
//           }
//         },
//         _count: true,
//         orderBy: {
//           checkIn: 'asc'
//         }
//       }),
//       db.visit.groupBy({
//         by: ['employee.department'],
//         _count: true,
//         orderBy: {
//           _count: 'desc'
//         }
//       })
//     ]);

//     res.json({
//       summary: {
//         totalVisits,
//         activeVisits,
//         pendingVisits: await db.visit.count({ where: { status: 'PENDING' } }),
//         completedVisits: await db.visit.count({ where: { status: 'CHECKED_OUT' } })
//       },
//       visitsOverTime: {
//         labels: visitsOverTime.map(v => new Date(v.checkIn).toLocaleDateString()),
//         data: visitsOverTime.map(v => v._count)
//       },
//       visitsByDepartment: {
//         labels: visitsByDepartment.map(v => v.department),
//         data: visitsByDepartment.map(v => v._count)
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch dashboard stats' });
//   }
// };

// export const getDepartmentAnalytics = async (req: Request, res: Response) => {
//   try {
//     const { department } = req.params;
//     const [totalVisits, activeVisits, averageDuration] = await Promise.all([
//       db.visit.count({
//         where: {
//           employee: {
//             department
//           }
//         }
//       }),
//       db.visit.count({
//         where: {
//           employee: {
//             department
//           },
//           status: 'CHECKED_IN'
//         }
//       }),
//       db.visit.findMany({
//         where: {
//           employee: {
//             department
//           },
//           status: 'CHECKED_OUT',
//           checkOut: {
//             not: null
//           }
//         },
//         select: {
//           checkIn: true,
//           checkOut: true
//         }
//       })
//     ]);

//     // Calculate average duration
//     const avgDuration = averageDuration.reduce((acc, visit) => {
//       const duration = new Date(visit.checkOut!).getTime() - new Date(visit.checkIn).getTime();
//       return acc + duration;
//     }, 0) / averageDuration.length;

//     res.json({
//       totalVisits,
//       activeVisits,
//       averageDurationMinutes: Math.round(avgDuration / (1000 * 60))
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch department analytics' });
//   }
// };