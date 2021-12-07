import http from "../http-common";

class WrestlersDataService {
  getAll(page = 0) {
    return http.get(`Wrestlers?page=${page}`);
  }

  // get(id) {
  //   return http.get(`wrestlers?id=${id}`);
  // }

  get(id) {
    return http.get(`Wrestlers/id/${id}`);
  }

  // get(id) {
  //   return http.get(`/wrestler?id=${id}`);
  // }

  // getTitleReign(id) {
  //   return http.get(`/wrestler?id=${id}/titleReign`);
  // }

  getTitleReign(id) {
    return http.get(`Wrestlers/id/${id}/titleReign`);
  }

  getStableMembers(id) {
    return http.get(`/id/${id}/stableMembers`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`Wrestlers?${by}=${query}&page=${page}`);
  }

  // createComment(data) {
  //   return http.post("/comment-new", data);
  // }

  // updateComment(data) {
  //   return http.put("/comment-edit", data);
  // }

  // deleteComment(id, userId) {
  //   return http.delete(`/comment-delete?id=${id}`, {
  //     data: { user_id: userId },
  //   });
  // }
  getName(id) {
    return http.get(`/names`);
  }
}

export default new WrestlersDataService();
