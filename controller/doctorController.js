import { doctorModel } from "../model/doctorModel.js";
import { UserModel } from "../model/userModel.js";

//apply for doctor account
export const applyAsDoctor = async (req, res) => {
  try {
    // //check if user is already a doctor
    // const user = await UserModel.findById(req.user._id);
    // if (user.isDoctor) {
    //   return res.status(400).json({
    //     message: "You are already a doctor",
    //   });
    // }
    const doctor = new doctorModel(req.body);
    await doctor.save();
    const adminUser = await UserModel.findOne({ isAdmin: true });
    const unSeen_notification = adminUser.unseenNotification;
    unSeen_notification.push({
      type: "doctor",
      id: doctor._id,
      message: `${doctor.first_name} ${doctor.last_name} has applied as a doctor`,
      name: `${doctor.first_name} ${doctor.last_name}`,
      onclickPath: "admin/doctor/view/" + doctor._id,
    });
    //update unseen notification
    await UserModel.findByIdAndUpdate(adminUser._id, { unSeen_notification });
    //save notification
    await adminUser.save();
    //change user hasApplied to true
    // await UserModel.findByIdAndUpdate(req.user._id, { hasApplied: true });
    res.status(200).json({
      message: "Successfully applied for doctor position",
      data: doctor,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in applying as doctor",
      error,
      success: false,
    });
  }
};

//get all doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).json({
      message: "Doctors found",
      success: true,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

//get doctor by id
export const getDoctorById = async (req, res) => {
  const { userId } = req.body;
  try {
    const doctor = await doctorModel.findOne({ userId });
    res.status(200).json({
      message: "Doctor found",
      success: true,
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
      success: false,
    });
  }
};

//change doctor status
export const changeDoctorStatus = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    await doctor.save();
    const user = await UserModel.findOne({ _id: doctor.userId });
    const unSeen_notification = user.unseenNotification;
    unSeen_notification.push({
      type: "doctor",
      id: doctor._id,
      message: `${doctor.first_name} ${doctor.last_name} account has been ${status}`,
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    res.status(200).json({
      message: "Successfully updated doctor status",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      error,
    });
  }
};

//block doctor
export const blockDoctor = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, {
      status: "blocked",
    });
    await doctor.save();
    const user = await UserModel.findOne({ _id: doctor.userId });
    const unSeen_notification = user.unseenNotification;
    unSeen_notification.push({
      type: "doctor",
      id: doctor._id,
      message: `${doctor.first_name} ${doctor.last_name} account has been blocked`,
    });
    user.isDoctor = false;
    await user.save();
    res.status(200).json({
      message: "Successfully blocked doctor",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      error,
    });
  }
}


//get all all approved doctors
export const getAllApprovedDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    res.status(200).json({
      message: "Doctors found",
      success: true,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}
