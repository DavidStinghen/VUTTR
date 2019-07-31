import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const userAlredyExists = User.findOne({ where: { email: req.body.email } });
    if (userAlredyExists) {
      return res.status(401).json('User alredy exists');
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }
}

export default new UserController();