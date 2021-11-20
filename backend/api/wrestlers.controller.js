import WrestlersDAO from "../dao/wrestlersDAO.js";

// 115 # wrestlers printed on main page
export default class WrestlersController {
  static async apiGetWrestlers(req, res, next) {
    const wrestlersPerPage = req.query.wrestlersPerPage
      ? parseInt(req.query.wrestlersPerPage, 10)
      : 115;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.name) {
      filters.name = req.query.name;
    } else if (req.query.nickname) {
      filters.nickname = req.query.nickname;
    }

    const { wrestlersList, totalNumWrestlers } =
      await WrestlersDAO.getWrestlers({
        filters,
        page,
        wrestlersPerPage,
      });

    let response = {
      wrestlers: wrestlersList,
      page: page,
      filters: filters,
      entries_per_page: wrestlersPerPage,
      total_results: totalNumWrestlers,
    };
    res.json(response);
  }
  static async apiGetWrestlersById(req, res, next) {
    try {
      let id = req.params.id || {};
      let wrestlers = await WrestlersDAO.getWrestlersById(id);
      if (!wrestlers) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(wrestlers);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetWrestlersName(req, res, next) {
    try {
      let name = await WrestlersDAO.getName();
      res.json(name);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  static async apiGetWrestlersByIdTitleReign(req, res, next) {
    try {
      let id = req.params.id || {};
      let wrestlers = await WrestlersDAO.getWrestlersByIdTitleReign(id);
      if (!wrestlers) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(wrestlers);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  static async apiGetStableAndMembers(req, res, next) {
    try {
      let id = req.params.id || {};
      let wrestlers = await WrestlersDAO.getStableAndMembers(id);
      if (!wrestlers) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(wrestlers);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
