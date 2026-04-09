import Booking from "../models/booking.js";

// 📌 CREATE booking
export function createBooking(req, res) {

    const { sessionType, date, timeSlot } = req.body;
    const userId = req.user.id;

    // ❗ Check overlapping bookings
    Booking.findOne({ date, timeSlot }).then((existing) => {

        if (existing) {
            return res.status(400).json({
                message: "Time slot already booked"
            });
        }

        // ❗ Only one outdoor session per user
        if (sessionType === "outdoor") {

            Booking.findOne({
                user: userId,
                sessionType: "outdoor"
            }).then((outdoorBooking) => {

                if (outdoorBooking) {
                    return res.status(400).json({
                        message: "Only one outdoor session allowed"
                    });
                }

                const booking = new Booking({
                    user: userId,
                    sessionType,
                    date,
                    timeSlot
                });

                booking.save().then(() => {
                    res.status(201).json({
                        message: "Booking created successfully"
                    });
                }).catch(() => {
                    res.status(500).json({
                        message: "Failed to create booking"
                    });
                });

            }).catch(() => {
                res.status(500).json({
                    message: "Server error"
                });
            });

        } else {

            const booking = new Booking({
                user: userId,
                sessionType,
                date,
                timeSlot
            });

            booking.save().then(() => {
                res.status(201).json({
                    message: "Booking created successfully"
                });
            }).catch(() => {
                res.status(500).json({
                    message: "Failed to create booking"
                });
            });

        }

    }).catch(() => {
        res.status(500).json({
            message: "Server error"
        });
    });

}


// 📌 GET user bookings
export function getUserBookings(req, res) {

    Booking.find({ user: req.user.id }).then((bookings) => {
        res.json(bookings);
    }).catch(() => {
        res.status(500).json({
            message: "Failed to get bookings"
        });
    });

}


// 📌 DELETE booking (Cancel)
export function cancelBooking(req, res) {

    Booking.findById(req.params.id).then((booking) => {

        if (booking == null) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        return Booking.findByIdAndDelete(req.params.id).then(() => {
            res.json({
                message: "Booking cancelled successfully"
            });
        });

    }).catch(() => {
        res.status(500).json({
            message: "Failed to cancel booking"
        });
    });

}