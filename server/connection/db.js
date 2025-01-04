import mongoose from "mongoose"

const Db = async() => { 
    try { 
        const connection = await mongoose.connect(
            `mongodb+srv://visheshtanwar:${process.env.PASSWORD}@cluster0.rxa0l.mongodb.net/ReelRover?retryWrites=true&w=majority&appName=Cluster0`
        )
        if (connection){
            console.log('coonected to Server');            
        }
        else {
            console.log('cannot connect to Server');
        }
        return connection ; 
    } catch (e) {
        console.log("Server error"); 
    }
}

export default Db ;