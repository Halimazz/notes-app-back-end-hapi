const { nanoid } = require("nanoid");
const notes = require("./api/notes/notes");

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.some((note) => note.id === id);

  // Menggunakan h.response() dan menambahkan header
  const response = h
    .response({
      status: isSuccess ? "success" : "fail",
      message: isSuccess
        ? "Catatan berhasil ditambahkan"
        : "Catatan gagal ditambahkan",
      data: isSuccess ? { noteId: id } : undefined,
    })
    .code(isSuccess ? 201 : 500);

  // Menetapkan header CORS pada response
  response.header("Access-Control-Allow-Origin", "*");

  return response;
};

module.exports = {
  addNoteHandler,
};
