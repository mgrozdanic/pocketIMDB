const jwt = require('jsonwebtoken');
const { sendMail } = require('./mailing.service');

const { User } = require('./../models');

const me = token => token.user;

const register = async ({ email, password, name }) => {
  if (!email || !password || !name) {
    return { err: 'Malformed request data' };
  }

  const code = Math.floor(100000 + Math.random() * 900000);

  sendMail(email, code);

  const user = new User({
    email,
    password,
    name,
    confirmed: false,
    code
  });

  return user.save();
};

const verify = async userData => {
  try {
    if (userData.code === (await User.findById(userData.user.user._id)).code) {
      const user = await User.findByIdAndUpdate(userData.user.user._id, {confirmed:true}, {new: true});
      try {
        const token = jwt.sign({ user }, process.env.JWT_SECRET,
          {
          // eslint-disable-next-line radix
            expiresIn: parseInt(process.env.JWT_EXPIRE),
          });
    
        return({
          user,
          token,
        });
      } catch (err) {
        return('FAIL');
      }
    }
    return 'FAIL';
} catch (err) {
    console.log(err);
    return 'FAIL';
}
}

// eslint-disable-next-line consistent-return
const login = ({ email, password }) => new Promise(async (resolve, reject) => {
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) return reject(new Error(`Could not find user with e-mail ${email}`));

  try {
    await user.comparePassword(password);

    const token = jwt.sign({ user }, process.env.JWT_SECRET,
      {
      // eslint-disable-next-line radix
        expiresIn: parseInt(process.env.JWT_EXPIRE),
      });

    resolve({
      user,
      token,
    });
  } catch (err) {
    reject(err);
  }
});

const logout = () => {
  // Todo
};

const refresh = () => {
  // Todo
};

const checkUnique = async(email) => {
  const users = await User.findOne({email:email}, function(err, obj){
    if (err) throw err;
  });
  console.log({unique:users === null});
  return {unique:users === null};
}

module.exports = {
  me, register, login, logout, refresh, checkUnique, verify
};
