import User from "../schemas/users.schema.js"
import Restaurant from './../schemas/restuarant.schema.js';
class UserService {
    async getAllUsers() {
        try {
            const users = await User.find();
            return users;
        } catch (err) {
            console.error('Error getting users', err);
            throw new Error('Could not get users');
        }
    }

    async getUserById(id) {
        try {
            const user = await User.findById(id);
            return user;
        } catch (err) {
            console.error('Error getting user', err);
            throw new Error('Could not get user');
        }
    }

    async createUser(data) {
        try {
            const user = new User(data);
            await Restaurant.findByIdAndUpdate(data.res_id, {
                $push: user._id
            })
            await user.save();
            return user;
        } catch (err) {
            console.error('Error creating user', err);
            throw new Error('Could not create user');
        }
    }
    async registerUser(data) {
        try {
            const user = await User.find({
                email: data.useremail,
                password: data.userpassword
            });
            if (user.length > 0) return user;
            else return "Siz admin emasizz"
            // return user;
        } catch (err) {
            console.error('Error getting user', err);
            throw new Error('Could not get user');
        }
    }

    async updateUser(id, data) {
        try {
            const user = await User.findByIdAndUpdate(id, data, {
                new: true
            });
            return user;
        } catch (err) {
            console.error('Error updating user', err);
            throw new Error('Could not update user');
        }
    }

    async deleteUser(id) {
        try {
            const user = await User.findByIdAndDelete(id);
            return user;
        } catch (err) {
            console.error('Error deleting user', err);
            throw new Error('Could not delete user');
        }
    }
}

export default UserService