import CommentsDAO from "../dao/commentsDAO.js"

export default class CommentsController {
  static async apiPostComments(req, res, next) {
    try {
      const wrestlersId = req.body.wrestlers_id
      const comment = req.body.text
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id
      }
      const date = new Date()

      const CommentsResponse = await CommentsDAO.addComments(
        wrestlersId,
        userInfo,
        comment,
        date,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateComments(req, res, next) {
    try {
      const commentsId = req.body.comment_id
      const text = req.body.text
      const date = new Date()

      const commentsResponse = await CommentsDAO.updateComments(
        commentsId,
        req.body.user_id,
        text,
        date,
      )

      var { error } = commentsResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (commentsResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update comment - user may not be original poster",
        )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteComments(req, res, next) {
    try {
      const commentsId = req.query.id
      const userId = req.body.user_id
      console.log(commentsId)
      const commentsResponse = await CommentsDAO.deleteComments(
        commentsId,
        userId,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

}