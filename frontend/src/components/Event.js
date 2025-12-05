import express from 'express';
import Event from './models/eventModel.js';
import nodeSchedule from 'node-schedule';
import { io } from './server.js';

const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const { title, datetime } = req.body;
    const event = new Event({ title, datetime });
    await event.save();
    scheduleEvent(event);
    res.status(201).json({ message: 'Event scheduled successfully!', event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const scheduleEvent = (event) => {
  nodeSchedule.scheduleJob(new Date(event.datetime), () => {
    io.emit('eventNotification', { title: event.title });
  });
};

export default router;
