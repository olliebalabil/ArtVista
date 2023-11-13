const db = require('../database/connect');

class Art {
  constructor(data) {
    this.id = data.art_id;
    this.user_id = data.user_id;
    this.title = data.title;
    this.description = data.description;
    this.likes = data.likes;
  }

  static async getAll() {
    const response = await db.query('SELECT * from art');
    if (response.rows.length === 0) {
      throw new Error('No art available.');
    }
    return response.rows.map((g) => new Art(g));
  }

  static async getAllByUser({ user_id }) {
    const response = await db.query(
      'SELECT * from art WHERE user_id = $1 ;',
      [user_id]
    );
    if (response.rows.length === 0) {
      throw new Error('No art available.');
    }
    return response.rows.map((g) => new Art(g));
  }

  static async getOneById(id) {
    const response = await db.query('SELECT * FROM art WHERE art_id = $1;', [
      id,
    ]);
    if (response.rows.length !== 1) {
      throw new Error('Unable to locate art.');
    }

    return new Art(response.rows[0]);
  }

  static async create(data) {
    const { user_id, title, description, likes } = data;
    const response = await db.query(
      'INSERT INTO art (user_id, title, description, likes) VALUES ($1, $2, $3, $4) RETURNING *;',
      [user_id, title, description, likes]
    );

    return new Art(response.rows[0]);
  }

  async update(data) {
    const { user_id, title, description, likes } = data;
    const response = await db.query(
      'UPDATE art SET user_id = $1, title = $2, description = $3 WHERE likes = $4 RETURNING *;',
      [user_id, title, description, likes]
    );
    if (response.rows.length !== 1) {
      throw new Error('Unable to update art.');
    }
    return new Art(response.rows[0]);
  }

  async destroy() {
    const response = await db.query(
      'DELETE FROM art WHERE art_id = $1 RETURNING *;',
      [this.id]
    );
    if (response.rows.length !== 1) {
      throw new Error('Unable to delete art from art table.');
    }
    return new Art(response.rows[0]);
  }
}

module.exports = Art;
