import Sequelize from 'sequelize';

import dbConfig from '../config/database';
import User from '../app/models/User';
import File from '../app/models/File';
import Tool from '../app/models/Tool';

const models = [User, File, Tool];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dbConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
