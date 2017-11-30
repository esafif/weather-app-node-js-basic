var getUser = (id, callback) => {
 var user = {
     id: id,
     name: 'safif'
 };

 setTimeout(() => {
    callback(user);
 }, 3000)
};

getUser(35, (userObject) =>{
    console.log(userObject);
});