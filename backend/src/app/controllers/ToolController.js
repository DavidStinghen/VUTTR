import * as Yup from 'yup';
import { Op } from 'sequelize';

import Tool from '../models/Tool';

class ToolController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      link: Yup.string().required(),
      description: Yup.string().required(),
      tags: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const toolExists = await Tool.findOne({
      where: { link: req.body.link },
    });

    if (toolExists) {
      return res.status(400).json({ error: 'Tool alredy exists' });
    }

    const { id, title, link, description, tags } = await Tool.create(req.body);

    return res.status(201).json({ id, title, link, description, tags });
  }

  async index(req, res) {
    const { tag } = req.query;

    if (tag) {
      const tools = await Tool.findAll({
        where: {
          tags: {
            [Op.contains]: [tag],
          },
        },
        attributes: ['id', 'title', 'link', 'description', 'tags'],
        order: ['title'],
      });

      return res.json(tools);
    }

    const tools = await Tool.findAll({
      attributes: ['id', 'title', 'link', 'description', 'tags'],
      order: ['title'],
    });

    return res.json(tools);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      link: Yup.string(),
      description: Yup.string(),
      tags: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const tool = await Tool.findByPk(req.params.id);

    const { id, title, link, description, tags } = await tool.update(req.body);

    return res.json({ id, title, link, description, tags });
  }

  async delete(req, res) {
    const tool = await Tool.findByPk(req.params.id);

    if (!tool) {
      return res.status(404).json({ error: 'Tool not exists' });
    }

    await tool.destroy();

    return res.status(204).send();
  }
}

export default new ToolController();
