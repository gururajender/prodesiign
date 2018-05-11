import express from 'express';
import validateInput from '../shared/validations/signup';
import bcrypt from 'bcrypt';
import User from '../models/user'
import isEmpty from 'lodash/isEmpty'

let router = express.Router();

function commonValidations (data, otherValidations){
  let { errors } = otherValidations(data);

  return User.query({
    where: { email: data.email },
    orWhere: { username: data.username }
  }).fetch().then(user => {
    if (user) {
      if (user.get('username') === data.username) {
        errors.username = 'Username already exits';
      }
      if (user.get('email') === data.email) {
        errors.email = 'Email already exits';
      }
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  })
}

router.get('/:identifier', (req, res) => {
  User.query({
    select: [ 'username', 'email' ],
    where: { email: req.params.identifier },
    orWhere: { username: req.params.identifier }
  }).fetch().then(user => {
    res.json({ user });
  });
});

router.post('/', (req, res) => {
  commonValidations(req.body, validateInput).then(({ errors, isValid}) => {
    if (isValid) {
      const { username, email, password, timezone } = req.body;
      const password_digest = bcrypt.hashSync(password, 10);

    User.forge({
      username, email, timezone, password_digest
    }, { hasTimestamps: true }).save()
    .then(user => res.json({ success: true}))
    .catch(err => res.status(500).json({ error: err }));

    } else{
      res.status(400).json(errors);
    }
  });
});

export default router;
