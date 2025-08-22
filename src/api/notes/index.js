const NotesHandler = require("./handler");
const routes = require("./routes");
const validator = require("../../validator/notes");

module.exports = {
  name: "notes",
  version: "1.0.0",
  register: async (server, { service }) => {
    const notesHandler = new NotesHandler(service, validator);
    server.route(routes(notesHandler));
  },
};
