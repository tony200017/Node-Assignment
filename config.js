const MONGODB_CONNECTION_LINK="mongodb://127.0.0.1:27017/AudioLibraryDB";
//const MONGODB_CONNECTION_LINK="mongodb+srv://tonygereige9:tansa123@cluster0.eg7nnie.mongodb.net/AudioLibraryDB?retryWrites=true&w=majority&appName=Cluster0";
const tableNames={
    album:'Album',
    category:'Category',
    song:'Song',
    user:'User'

};
module.exports.mongodbConnection = MONGODB_CONNECTION_LINK;

module.exports.tableNames = tableNames;