import { Request, Response } from "express";
// import { createEvent, fetchEvents } from "../services/eventService";
import { db } from "../db";

const createEvent = async (data: any) => {
    return await db.event.create({ data });
  };

  const fetchEvents = async () => {
    return await db.event.findMany({
      include: { visitors: true, host: true },
    });
  };

export const addEvent = async (req: Request, res: Response) => {
  try {
    const event = await createEvent(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error});
  }
};

export const getEvents = async (_req: Request, res: Response) => {
  try {
    const events = await fetchEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
