const jwt = require('jsonwebtoken');
const { sendMail } = require('./mailing.service');
const { getUserIdFromToken } = require('./movies.service');
const { User, Comment } = require('./../models');
const bcrypt = require('bcrypt');
const fs = require('fs');

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
    code,
    image: "https://facebook.github.io/react/logo-og.png"
  });

  return user.save();
};

const matchingPassword = async userReq => {
  const userId = userReq.userId;
  const password = userReq.password;
  
  const user = await User.findById(userId);
  const retVal = await bcrypt.compare(password, user.password);
  return {matching: retVal};
};

const updatePassword = async userData => {
  const userId = userData.userId;
  const password = userData.password;

  const hash = await bcrypt.hash(password, 10);

  const user = await User.findByIdAndUpdate(userId, {password: hash}, {new: true});
  try {
    const tokenNew = jwt.sign({ user }, process.env.JWT_SECRET,
      {
      // eslint-disable-next-line radix
        expiresIn: parseInt(process.env.JWT_EXPIRE),
      });

    return({
      user,
      tokenNew,
    });
  } catch (err) {
    return('FAIL');
  }
}

const updateUser = async(token, updatedData) => {
  const oldUser = getUserIdFromToken(token);
  const oldUserObj =await User.findById(oldUser);
  const oldEmail = oldUserObj.email;

  let base64String = updatedData.photo.uri;
  let base64Image = base64String.split(';base64,').pop();
  fs.writeFile('/Users/milangrozdanic/Desktop/sprint 2/pocketIMDB/intern-pocket-imdb-express-boilerplate-master/src/images/' + oldUser + '.png', base64Image, {encoding: 'base64'}, function(err) {
    if (err) console.log(err)
    else console.log('File created');
  });

  const user = await User.findByIdAndUpdate(oldUser, 
    {name: updatedData.name, email: updatedData.email, 
      image: '/Users/milangrozdanic/Desktop/sprint 2/pocketIMDB/intern-pocket-imdb-express-boilerplate-master/src/images/' + oldUser + '.png'}, {new: true});
  await Comment.update({user: oldEmail}, {$set:{user: updatedData.email}}, {multi: true});
  try {
    const tokenNew = jwt.sign({ user }, process.env.JWT_SECRET,
      {
      // eslint-disable-next-line radix
        expiresIn: parseInt(process.env.JWT_EXPIRE),
      });

    return({
      user,
      tokenNew,
    });
  } catch (err) {
    return('FAIL');
  }
}

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
  me, register, login, logout, refresh, checkUnique, verify, updateUser, matchingPassword, updatePassword
};
