import UserDetails from '../../models/userDetails.js';

const distance = (lat1, lat2, lon1, lon2) => {
    //convert Degrees to radians
    lon1 = lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    //Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;

    let a = Math.pow(Math.sin(dlat /2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon/2), 2);

    let c = 2*Math.asin(Math.sqrt(a));

    //Radius Of Earth
    let r = 6371;

    return(c * r);
}

const GetListOfNearByUsersController = async(req, res) => {
    try{
        const { dis } = req.params;
        const id = req.headers['id'];

        const user =  await UserDetails.findById(id).select("-password")

        const allUsers = await UserDetails.find({incognito:false}).select("-password")

        const result = [];

        for(let i=0; i<allUsers.length; i++){
            let dist = distance(user.latitude, allUsers[i].latitude, user.longitude, allUsers[i].longitude)
            if(dist <= dis && user._id !== allUsers[i]._id){
                result.push({
                    _id:allUsers[i]._id,
                    username:allUsers[i].username,
                    place:allUsers[i].place,
                    latitude:allUsers[i].latitude,
                    longitude:allUsers[i].longitude,
                    distance:dist.toFixed(2) + " K.M."
                })
            }
        }

        res.status(200).json([
            {
                data:result,
                message:'Nearby Users'
            }
        ])

    }catch(error){
        res.status(500).json([
            {
                message:error.message,
                location:'GetListOfNearByUsers',
                errorType:'TryCatch'
            }
        ])
    }
}

export default GetListOfNearByUsersController;