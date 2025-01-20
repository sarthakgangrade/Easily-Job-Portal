class userModel{
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

export const users = [{
  id: 1,
  name: 'sarthak ',
  email: 'Satish.icds@gmail.com',
  password: '1'
}];
  
export const registerUser = (user) => {
    // Write your code here
    const userId = users.length + 1;
    users.push({ id: userId, ...user });
    console.log(users);
};

export const authenticateUser = (reqUser) => {
    // Write your code here
    const {email, password}=reqUser;
    const user = users.find((u) => u.email === email);
    if(user && user.password===password)
    {
      return true;
    }
    else{
      return false;
    }
}

export const findname = (email) => {
    const user = users.find((u) => u.email == email);
    return user;
  };