// // src/controllers/notificationController.ts
// import { Request, Response } from 'express';
// import { db } from '../db';

// export const getNotifications = async (req: Request, res: Response) => {
//   try {
//     const notifications = await db.notification.findMany({
//       where: {
//         userId: req.user.id
//       },
//       orderBy: {
//         createdAt: 'desc'
//       }
//     });

//     res.json(notifications);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch notifications' });
//   }
// };

// export const markAsRead = async (req: Request, res: Response) => {
//   try {
//     const notification = await db.notification.update({
//       where: {
//         id: Number(req.params.id)
//       },
//       data: {
//         read: true
//       }
//     });

//     res.json(notification);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to mark notification as read' });
//   }
// };

// export const clearAllNotifications = async (req: Request, res: Response) => {
//   try {
//     await db.notification.updateMany({
//       where: {
//         userId: req.user.id
//       },
//       data: {
//         read: true
//       }
//     });

//     res.json({ message: 'All notifications cleared' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to clear notifications' });
//   }
// };