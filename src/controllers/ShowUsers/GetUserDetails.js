import UserDetails from "../../models/userDetails.js";

const GetUserDetails = async (req, res) => {
    try{
        const id = req.headers['id'];
        const user =  await UserDetails.findById(id).select("-password")

        res.status(200).json([
            {
                data:user,
                message:'user fetched successfully'
            }
        ])
    }catch(error){
        res.status(500).json([
            {
                message:error.message,
                location:'./Controller/ShowUsers/GetUserDetails.js',
                errorType:'TryCatch'
            }
        ])
    }
}

export default GetUserDetails;