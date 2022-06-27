import UserDetails from '../../models/userDetails.js';

const ShowAllUsersController = async(req, res) => {
    try{
        const users = await UserDetails.find({}).select("-password")
        res.status(200).json([
            {
                data:users,
                message:'users fetched successfully'
            }
        ])
    }catch(error){
        res.status(500).json([
            {
                message:error.message,
                location:'./controllers/showUsers/ShowAllUsers.js',
                errorType:'TryCatch'
            }
        ])
    }
}
export default ShowAllUsersController;