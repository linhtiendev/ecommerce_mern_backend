// Hàm xử lí liên quan đến API

const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

// Hàm tạo user
const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, phone } = newUser;
        try {
            // Hàm check email đã tồn tại
            const checkUser = await User.findOne({
                email: email,
            });
            if (checkUser !== null) {
                resolve({
                    status: "OK",
                    message: "Email is already",
                });
            }
            // hàm hashpassword (mã hóa)
            const hash = bcrypt.hashSync(password, 10);
            // Hàm tạo user
            const createUser = await User.create({
                name,
                email,
                password: hash,
                phone,
            });
            if (createUser) {
                resolve({
                    status: "OK",
                    message: "User created!",
                    data: createUser,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

// Hàm check login user
const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin;
        try {
            // Hàm check user tồn tại
            const checkUser = await User.findOne({
                email: email,
            });
            if (checkUser === null) {
                resolve({
                    status: "OK",
                    message: "User is not defined",
                });
            }
            // Hàm check (so sánh password input vs password in db)
            const comparePassword = bcrypt.compareSync(
                password,
                checkUser.password
            );
            if (!comparePassword) {
                resolve({
                    status: "OK",
                    message: "Password or user is incorrect",
                });
            }
            // k có case lỗi sẽ trả ra user vừa login
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: checkUser,
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createUser,
    loginUser,
};