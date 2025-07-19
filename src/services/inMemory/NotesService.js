const { nanoid } = require("nanoid");

class NotesService {
  constructor() {
    this._notes = [];
  }

  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      title,
      body,
      tags,
      id,
      createdAt,
      updatedAt,
    };

    this._notes.push(newNote);
    const isSuccess = this._notes.filter((note) => note.id === id).length > 0;
    if (!isSuccess) {
      throw new Error("Note could not be added");
    }
    return id;
  }

  getNotes() {
    return this._notes;
  }
  getNotesById(id) {
    const note = this._notes.find((n) => n.id === id);
    if (!note) {
      throw new Error("Note not found");
    }
    return note;
  }
  editNoteById(id, { title, body, tags }) {
    const index = this._notes.findIndex((note) => note.id === id);
    if (index === -1) {
      throw new Error("Gagal memperbarui catatan. Id tidak ditemukan");
    }
    const updatedAt = new Date().toISOString();
    this._notes[index] = {
      ...this._notes[index],
      title,
      body,
      tags,
      updatedAt,
    };
  }

  deleteNoteById(id) {
    const index = this._notes.findIndex((note) => note.id === id);
    if (index === -1) {
      throw new Error("Error: Note not found");
    }
    this._notes.splice(index, 1);
  }
}

module.exports = NotesService;
