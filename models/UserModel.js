import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
const Schema = mongoose.Schema;

const userSchema = new Schema(
   {
      username: {
         type: String,
         required: [true, 'Kullanıcı adı boş bırakılamaz'],
         validate: [
            validator.isAlphanumeric,
            'Harf ve rakamlardan oluşturunuz şifrenizi',
         ],
      },
      email: {
         type: String,
         required: [true, 'Email adresi boş bırakılamaz.'],
         unique: true,
         validate: [validator.isEmail, 'Geçerli email adresinizi giriniz.'],
      },
      password: {
         type: String,
         required: [true, 'Şifre alanı boş bırakılamaz'],
         minLength: [6, 'En az 6 karakter giriniz.'],
      },
      followers: [
         {
            type: Schema.Types.ObjectId,
            ref: 'User',
         },
      ],
      followings:[
         {
            type: Schema.Types.ObjectId,
            ref: 'User',
         },
      ]
   },
   {
      timestamps: true,
   }
);

userSchema.pre('save', function (next) {
   const user = this
   bcrypt.hash(user.password, 10, (err, hash) => {
      user.password = hash;
      next();
   });
});

const User = mongoose.model('User', userSchema);
export default User;
