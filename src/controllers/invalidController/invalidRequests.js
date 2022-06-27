const invalidRequest = (_req, res) => {
    res.status(404).json([
        {
            data:null,
            message:'Invalid Route'
        }
    ])
}

export default invalidRequest