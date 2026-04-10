import Event from "../models/event.js";

// GET all events
export function getEvents(req, res) {

    Event.find().sort({ date: 1 }).then(
        (events) => {
            res.json(events);
        }
    ).catch(
        (err) => {
            res.status(500).json({
                message: "failed to get events"
            });
        }
    );

}

// GET single event
export function getEventById(req, res) {

    Event.findById(req.params.id).then(
        (event) => {

            if (event == null) {
                res.status(404).json({
                    message: "event not found"
                });
            } else {
                res.json(event);
            }

        }
    ).catch(
        (err) => {
            res.status(500).json({
                message: "server error"
            });
        }
    );

}

// CREATE event
export function createEvent(req, res) {

    const event = new Event({
        title: req.body.title,
        date: req.body.date,
        image: req.body.image
    });

    event.save().then(
        () => {
            res.json({
                message: "event created successfully"
            });
        }
    ).catch(
        () => {
            res.status(500).json({
                message: "failed to create event"
            });
        }
    );

}

// UPDATE event
export function updateEvent(req, res) {

    Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    ).then(
        (updatedEvent) => {
            res.json(updatedEvent);
        }
    ).catch(
        () => {
            res.status(500).json({
                message: "failed to update event"
            });
        }
    );

}

// DELETE event
export function deleteEvent(req, res) {

    Event.findByIdAndDelete(req.params.id).then(
        () => {
            res.json({
                message: "event deleted successfully"
            });
        }
    ).catch(
        () => {
            res.status(500).json({
                message: "failed to delete event"
            });
        }
    );

}