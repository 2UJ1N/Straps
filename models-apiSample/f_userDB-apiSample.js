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
  
  exports.get = (prod_num) => {
    const f_user = f_users.find(
      (f_user) => f_user.prod_num === prod_num
    );
  
    if (!f_user) {
      throw new Error('Note not found');
    }
    return f_user;
  };
  
  exports.create = ( name, kind, price, content,image,regdate,prod_count,prod_cell) => {
    const {
       prod_num: lastNum,
       prod_seq: lastSeq
     } = f_users[f_users.length - 1];
    const newF_user = { 
      prod_num: lastNum + 1, 
      name, 
      kind, 
      price, 
      content,
      image,
      regdate,
      prod_seq: lastSeq + 1,
      prod_count,
      prod_cell
    };
    f_users.push(newF_user);
    return newF_user;
  };
  
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