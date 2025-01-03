import { UserModel } from "../models/users.js";
import { addUserValidator, updateUserValidator } from "../validators/users.js";


 export const addUser = async (req, res, next) => {
    try {
      //add user validator
      const { error, value } = addUserValidator.validate(req.body);
      if (error) {
        return res.status(422).json(error);
      }
      //connect to datadase
      const user = new UserModel({
        ...value,
        user: req.auth.id,
      });
      //save new data
      await user.save();
      res.status(200).json("user added successfully!");
    } catch (error) {
        res.status(422).json({message:"failed to add user", error});
    }
 };


 export const getUserById = async (req, res, next) =>{
    try {
        //get user details by id from database
        const user = await UserModel.findById(req.params.id);
        //if user does not exist
        if (!habit) {
            return res.status(404).json ({message:"user not found"});
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(422).json({ message: "Failed to fetch user", error });
    }
 };


export const getAllUsers = async (req, res, next) => {
  try {
    const { filter = "{}", sort = "{}", limit = 50, skip = 0 } = req.query;

    const users = await UserModel.find(JSON.parse(filter))
      .sort(JSON.parse(sort))
      .limit(limit)
      .skip(skip);
    res.status(200).json(users);
  } catch (error) {
    res.status(422).json({ message: "Failed to fetch users", error });
  }
}; 


export const updateUser = async (req, res, next) => {
  try {
    const { error, value } = updateUserValidator.validate(req.body);
    if (error) {
      return res.status(422).json({ error: error.details });
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: req.params.id, user: req.auth.id },
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json("user updated successfully!");
  } catch (error) {
    res.status(422).json({ message: "Failed to update user", error });
  }
};


export const deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await UserModel.findById(req.params.id);
    if (!deleteUser) {
      return res.status(404).json({ message: "user not found" });
    }
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json("user deleted!");
  } catch (error) {
    res.status(422).json({ message: "Failed to delete user", error });
  }
};