const Booking = require('../models/Booking');
const Station = require('../models/Station');

// @desc    Book a slot (Parking or Charging)
// @route   POST /api/bookings/book
// @access  Private
const createBooking = async (req, res) => {
  try {
    const { stationId, bookingDate, timeSlot, serviceType } = req.body;

    // 1. Date Validation Logic
    const requestedDate = new Date(bookingDate);
    const today = new Date();
    requestedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (isNaN(requestedDate.getTime()) || requestedDate < today) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid date. You cannot book slots in the past." 
      });
    }

    // 2. Check if Station exists
    const station = await Station.findById(stationId);
    if (!station) {
      return res.status(404).json({ msg: 'Station not found' });
    }

    // ---------------------------------------------------------
    // ✅ FIX: CHECK CAPACITY INSTEAD OF JUST "EXISTS"
    // ---------------------------------------------------------
    
    // Count how many ACTIVE (non-cancelled) bookings exist for this specific slot
    const activeBookingsCount = await Booking.countDocuments({
      station: stationId,
      bookingDate: bookingDate, 
      timeSlot: timeSlot,
      status: { $ne: 'Cancelled' }
    });

    // Compare with the station's total capacity
    if (activeBookingsCount >= station.totalSlots) {
      return res.status(400).json({ 
        success: false, 
        message: `Slot full! All ${station.totalSlots} spots are taken for this time.` 
      });
    }

    // 4. Create Booking
    const newBooking = new Booking({
      station: stationId,
      user: req.user.id,
      bookingDate, 
      timeSlot,
      serviceType
    });

    const booking = await newBooking.save();
    res.json(booking);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all bookings for the logged-in user
// @route   GET /api/bookings/my-bookings
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ 
      user: req.user.id,
      status: { $ne: 'Cancelled' } 
    })
      .populate('station', 'name location address') // Added 'address' for better UI
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Cancel a booking
// @route   PUT /api/bookings/cancel/:id
// @access  Private
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    // 1. Security Check
    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to cancel this booking' });
    }

    // 2. Prevent cancelling past bookings
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const bookingDate = new Date(booking.bookingDate);
    
    if (bookingDate < today) {
      return res.status(400).json({ msg: 'Cannot cancel past bookings' });
    }

    // 3. Update Status
    booking.status = 'Cancelled';
    await booking.save();

    res.json({ msg: 'Booking Cancelled Successfully' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking 
};