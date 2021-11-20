import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let wrestlers;

export default class WrestlersDAO {
  static async injectDB(conn) {
    if (wrestlers) {
      return;
    }
    try {
      wrestlers = await conn
        .db(process.env.AEWWRESTLERS_NS)
        .collection("wrestlers");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in wrestlersDAO: ${e}`
      );
    }
  }

  static async getWrestlers({
    filters = null,
    page = 0,
    wrestlersPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ("nickname" in filters) {
        query = { nickname: { $eq: filters["nickname"] } };
      } else if ("name" in filters) {
        query = { name: { $eq: filters["name"] } };
      }
    }

    let cursor;

    try {
      cursor = await wrestlers.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { wrestlersList: [], totalNumWrestlers: 0 };
    }

    const displayCursor = cursor
      .limit(wrestlersPerPage)
      .skip(wrestlersPerPage * page);

    try {
      const wrestlersList = await displayCursor.toArray();
      const totalNumWrestlers = await wrestlers.countDocuments(query);

      return { wrestlersList, totalNumWrestlers };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { wrestlersList: [], totalNumWrestlers: 0 };
    }
  }
  static async getWrestlersById(id) {
    try {
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "comments",
            let: {
              id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$wrestlers_id", "$$id"],
                  },
                },
              },
              {
                $sort: {
                  date: -1,
                },
              },
            ],
            as: "comments",
          },
        },
        {
          $addFields: {
            comments: "$comments",
          },
        },
      ];

      return await wrestlers.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Something went wrong in getWrestlersById: ${e}`);
      throw e;
    }
  }

  static async getName() {
    let names = [];
    try {
      names = await wrestlers.distinct("name");
      return names;
    } catch (e) {
      console.error(`Unable to get names, ${e}`);
      return names;
    }
  }

  static async getWrestlersByIdTitleReign(id) {
    try {
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "titlereign",
            let: {
              id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$wrestlers_id", "$$id"],
                  },
                },
              },
              {
                $sort: {
                  date: -1,
                },
              },
            ],
            as: "titlereign",
          },
        },
        {
          $addFields: {
            titlereign: "$titlereign",
          },
        },
      ];
      return await wrestlers.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Something went wrong in getWrestlersById: ${e}`);
      throw e;
    }
  }

  static async getStableAndMembers(id) {
    try {
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "stableAndteams",
            let: {
              id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$wrestlers_id", "$$id"],
                  },
                },
              },
              {
                $sort: {
                  date: -1,
                },
              },
            ],
            as: "stableAndteams",
          },
        },
        {
          $addFields: {
            stableAndteams: "$stableAndteams",
          },
        },
      ];
      return await wrestlers.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Something went wrong in getWrestlersById: ${e}`);
      throw e;
    }
  }
}
