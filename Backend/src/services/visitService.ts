import { db } from "../db";
import { sendNotification } from "./webSocketService";
import { VisitStatus } from "@prisma/client";

export const approveVisit = async (visitId: number) => {
  const visit = await db.visit.update({
    where: { id: visitId },
    data: { status: VisitStatus.APPROVED },
  });

  sendNotification(visit.visitorId, "Your visit has been approved!");
  return visit;
};

export const denyVisit = async (visitId: number) => {
  const visit = await db.visit.update({
    where: { id: visitId },
    data: { status: VisitStatus.DENIED },
  });

  sendNotification(visit.visitorId, "Your visit has been denied.");
  return visit;
};
