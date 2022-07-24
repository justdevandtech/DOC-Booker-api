import { doctorModel } from '../model/doctorModel.js';


export const applyAsDoctor = async(req, res) => {
    try {
        const doctor = new doctorModel(req.body);
        const result = await doctor.save();
        res.status(200).json({
            message: 'Doctor applied successfully',
            result,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error in applying as doctor',
            error,
            success: false
        });
    }
}