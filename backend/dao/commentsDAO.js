import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let comments;

export default class CommentsDAO {
  static async injectDB(conn) {
    if (comments) {
      return;
    }
    try {
      comments = await conn
        .db(process.env.AEWWRESTLERS_NS)
        .collection("comments");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }

  static async addComments(wrestlersId, user, comment, date) {
    try {
      const commentDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        text: comment,
        wrestlers_id: ObjectId(wrestlersId),
      };

      return await comments.insertOne(commentDoc);
    } catch (e) {
      console.error(`Unable to post comment: ${e}`);
      return { error: e };
    }
  }

  static async updateComments(commentsId, userId, text, date) {
    try {
      const updateComments = await comments.updateOne(
        { user_id: userId, _id: ObjectId(commentsId) },
        { $set: { text: text, date: date } }
      );

      return updateComments;
    } catch (e) {
      console.error(`Unable to update comment: ${e}`);
      return { error: e };
    }
  }

  static async deleteComments(commentsId, userId) {
    try {
      const deleteComments = await comments.deleteOne({
        _id: ObjectId(commentsId),
        user_id: userId,
      });

      return deleteComments;
    } catch (e) {
      console.error(`Unable to delete comment: ${e}`);
      return { error: e };
    }
  }
}
