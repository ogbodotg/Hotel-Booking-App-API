import Hotels from "../models/Hotels.js";
import Rooms from "../models/Rooms.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotels(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotels.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotels.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotels.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

export const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotels.find({
      ...others,
      lowCost: { $gt: min || 1, $lt: max || 100000 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const cityList = await Promise.all(
      cities.map((city) => {
        return Hotels.countDocuments({ city: city });
      })
    );
    res.status(200).json(cityList);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotels.countDocuments({ type: "Hotel" });
    const resortCount = await Hotels.countDocuments({ type: "Resort" });
    const apartmentCount = await Hotels.countDocuments({ type: "Apartment" });
    const gameReserveCount = await Hotels.countDocuments({
      type: "Game Reserve",
    });

    res.status(200).json([
      { type: "Hotel", count: hotelCount },
      { type: "Resort", count: resortCount },
      { type: "Apartment", count: apartmentCount },
      { type: "Game Reserve", count: gameReserveCount },
    ]);
  } catch (error) {
    next(error);
  }
};

export const countType = async (req, res, next) => {
  const types = req.query.types.split(",");
  try {
    const typeList = await Promise.all(
      types.map((type) => {
        return Hotels.countDocuments({ type: type });
      })
    );
    res.status(200).json(typeList);
  } catch (error) {
    next(error);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const hotel = await Hotels.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Rooms.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
