import UserDetails from "../../models/userDetails.js";

const SearchUsersByGeoCoordinates = async (req, res) => {
    try{
        const { lat, lon } = req.params
        const user =  await UserDetails.find({ latitude:lat, longitude:lon }).select("-password")

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
                location:'./Controller/ShowUsers/SearchUsersByGeoCoordinates.js',
                errorType:'TryCatch'
            }
        ])
    }
}

export default SearchUsersByGeoCoordinates;