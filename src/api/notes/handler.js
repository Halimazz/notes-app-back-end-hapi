const ClientError = require('../../exceptions/ClientError');

class NotesHandler {
  constructor(service) {
    this._service = service;

    this._service = service;
 
    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  // Handler untuk menambahkan catatan
  postNoteHandler(request, h) {
    try {
      const { title = "untitled", body, tags } = request.payload;
      const noteId = this._service.addNote({ title, body, tags });
      const response = h.response({
        status: "success",
        message: "Catatan berhasil ditambahkan",
        data: { noteId },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      const response = h.response({
        status: "error",
        message: "Terjadi kesalahan pada server",
      });
      response.code(500);
      return response;
    }
  }

  // Handler untuk mendapatkan semua catatan
  getNotesHandler(request, h) {
    const notes = this._service.getNotes();
    return {
      status: "success",
      data: { notes },
    };
  }

  // Handler untuk mendapatkan catatan berdasarkan ID
  getNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const note = this._service.getNoteById(id);
      return {
        status: "success",
        data: { note },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      const response = h.response({
        status: 'error',
        message: 'Terjadi kesalahan pada server',
      });
      response.code(500);
      return response;
    }
  }

  // Handler untuk mengedit catatan berdasarkan ID
  putNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.editNoteById(id, request.payload);
      return {
        status: "success",
        message: "Catatan berhasil diperbarui",
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      const response = h.response({
        status: "error",
        message: "Terjadi kesalahan pada server",
      });
      response.code(500);
      return response;
    }
  }

  // Handler untuk menghapus catatan berdasarkan ID
  deleteNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.deleteNoteById(id);
      return {
        status: "success",
        message: "Catatan berhasil dihapus",
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      const response = h.response({
        status: "error",
        message: "Terjadi kesalahan pada server",
      });
      response.code(500);
      return response;
    }
  }
}

module.exports = NotesHandler;
