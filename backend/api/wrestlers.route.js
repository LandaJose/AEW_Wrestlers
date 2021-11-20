import express from "express";
import WrestlersCtrl from "./wrestlers.controller.js";
import CommentsCtrl from "./comments.controller.js";
const router = express.Router();

router.route("/").get(WrestlersCtrl.apiGetWrestlers);
router.route("/id/?:id").get(WrestlersCtrl.apiGetWrestlersById);
router.route("/name").get(WrestlersCtrl.apiGetWrestlersName);
router
  .route("/id/?:id/titleReign")
  .get(WrestlersCtrl.apiGetWrestlersByIdTitleReign);
router
  .route("/id/?:id/stableMembers")
  .get(WrestlersCtrl.apiGetStableAndMembers);

router
  .route("/comments")
  .post(CommentsCtrl.apiPostComments)
  .put(CommentsCtrl.apiUpdateComments)
  .delete(CommentsCtrl.apiDeleteComments);

export default router;
