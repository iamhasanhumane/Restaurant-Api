const testUserController = (req,res) => {
    try{
        res.status(200).send("<h1 align='center'>Test User Data </h1>")

    } catch(error){
        console.log('Error in Test Api'.red.bgWhite , error)
    }


}


module.exports = { testUserController }; 