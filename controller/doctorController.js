import { doctorModel } from "../model/doctorModel.js";
import { UserModel } from "../model/userModel.js";

export const applyAsDoctor = async (req, res) => {
  try {
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
