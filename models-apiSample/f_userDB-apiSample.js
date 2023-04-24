//가짜데이터 import
const f_users = require("../models/Fake/f_user.json");
//////////////////////////
// 이 파일은 DB를 흉내 낸 것 
//////////////////////////
  exports.list = () => {
    return f_users.map(({ user_id, password, name, address, phones,email,regdate,role,status }) => ({
      user_id, 
      password, 
      name,   
      address, 
      phones,
      email,
      regdate,
      role,
      status
    }));
  }
  
  exports.findOne = (email) => {
    const f_user = f_users.find(
      (f_user) => f_user.email === email
    );
  
    if (!f_user) {
      throw new Error('User not found');
    }
    return f_user;
  };
  
  exports.create = ( password, name, address,phones,email,regdate) => {
    const { user_id : lastNum } = f_users[f_users.length - 1];
    const userRole = false;
    const userStatus = true;
    const newF_user = { 
      user_id : lastNum + 1, 
      password, 
      name, 
      address, 
      phones,
      email,
      regdate,
      role : userRole,
      status : userStatus
    };
    f_users.push(newF_user);
    return newF_user;
  };
  

  ///////////////////////////////당분간 안씀////////////////
  exports.update = (prod_num, prod_seq, name, kind, price, content,image,regdate,prod_count,prod_cell) => {
    const index = f_users.findIndex(
      (f_user) => f_user.prod_num === prod_num
    );
  
    if (index < 0) {
      throw new Error('Note not found for update');
    }
    const f_user = f_users[index];
    f_user.name = name;
    f_user.kind = kind;
    f_user.price = price;
    f_user.content = content;
    f_user.image = image;
    f_user.regdate = regdate;
    f_user.prod_count = prod_count;
    f_user.prod_cell = prod_cell;
    f_user.prod_seq = prod_seq; 
    f_users[index] = f_user;
    return f_user;
  };
  
  exports.delete = (prod_num) => {
    if (!f_users.some((f_user) => f_user.prod_num === prod_num)) {
      throw new Error('Product not found for delete');
    }
  
    f_users = f_users.filter(f_user => f_user.prod_num !== prod_num);
  
    return;
  };
  //////////////////////////
  // 이 파일은 DB를 흉내 낸 것 
  //////////////////////////