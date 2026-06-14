import db from '../utils/db.js';
import redisClient from '../utils/redis.js';

export const confirmBooking = async (req, res) => {
    const { event_id, seat_ids, user_id } = req.body;

    const client = await db.connect();

    try {
        for (const seat_id of seat_ids) {
            const lockKey = `seat:lock:${event_id}:${seat_id}`;
            const lockOwner = await redisClient.get(lockKey);

            if (lockOwner !== String(user_id)) {
                return res.status(400).json({
                    error: `Seat ${seat_id} is not locked by user ${user_id}`
                });
            }
        }

        await client.query('BEGIN');

        for (const seat_id of seat_ids) {

            const seatResult = await client.query(
                `
                SELECT id, status
                FROM seats
                WHERE id = $1
                AND event_id = $2
                FOR UPDATE
                `,
                [seat_id, event_id]
            );

            if (seatResult.rows.length === 0) {
                throw new Error(`Seat ${seat_id} not found`);
            }

            if (seatResult.rows[0].status === 'BOOKED') {
                throw new Error(`Seat ${seat_id} already booked`);
            }
        }

        const bookingResult = await client.query(
            `
            INSERT INTO bookings (event_id, user_id, status)
            VALUES ($1, $2, 'CONFIRMED')
            RETURNING id
            `,
            [event_id, user_id]
        );

        const bookingId = bookingResult.rows[0].id;

        for (const seat_id of seat_ids) {

            await client.query(
                `
                UPDATE seats
                SET status = 'BOOKED'
                WHERE id = $1
                AND event_id = $2
                `,
                [seat_id, event_id]
            );

            await client.query(
                `
                INSERT INTO booking_seats (booking_id, seat_id)
                VALUES ($1, $2)
                `,
                [bookingId, seat_id]
            );
        }

        await client.query('COMMIT');

        await redisClient.del(`cache:seats:${event_id}`);

        return res.json({
            message: 'Booking confirmed',
            bookingId
        });

    } catch (err) {

        await client.query('ROLLBACK');

        console.error('Booking Error:', err);

        return res.status(500).json({
            error: err.message
        });

    } finally {

        client.release();
        for (const seat_id of seat_ids) {
            await redisClient.del(
                `seat:lock:${event_id}:${seat_id}`
            );
        }
    }
};
