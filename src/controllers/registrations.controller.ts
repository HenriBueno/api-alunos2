import { Request, Response } from "express";
import db from "../database/prisma.connection";

class RegistrationController {
  public async create(req: Request, res: Response) {
    const { studentId, classroomId } = req.body;

    try {
      const registration = await db.registrations.create({
        data: { studentId, classroomId },
      });

      if (registration) {
        const classroom = await db.classrooms.findUnique({
          where: { id: classroomId },
        });

        if (classroom?.vacations) {
          await db.classrooms.update({
            where: { id: classroomId },
            data: { vacations: classroom.vacations - 1 },
          });
        }
        return res.status(200).json({
          success: true,
          msg: "Registration created.",
          data: registration,
        });
      }

      return res
        .status(500)
        .json({ success: false, msg: "Registration not created." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "ERROR Database." });
    }
  }
}

export default RegistrationController;
