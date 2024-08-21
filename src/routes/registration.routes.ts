import { Request, Response, Router } from "express";
import RegistrationController from "../controllers/registrations.controller";


const routes = () => {
  const router = Router();
  const controller = new RegistrationController();

  router.post("/", controller.create);

  return router;
};

export default routes;
