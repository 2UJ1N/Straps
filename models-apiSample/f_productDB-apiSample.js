//가짜데이터 import
const f_products = require("../Fake/f_products.json");
//////////////////////////
// 이 파일은 DB를 흉내 낸 것 
//////////////////////////
  exports.list = () => {
    return f_products.map(({ prod_num, name, kind, price, content,image,regdate,prod_seq,prod_count,prod_cell }) => ({
      prod_num, 
      name, 
      kind, 
      price, 
      content,
      image,
      regdate,
      prod_seq,
      prod_count,
      prod_cell
    }));
  }
  
  exports.get = (prod_num) => {
    const f_product = f_products.find(
      (f_product) => f_product.prod_num === prod_num
    );
  
    if (!f_product) {
      throw new Error('Note not found');
    }
    return f_product;
  };
  
  exports.create = ( name, kind, price, content,image,regdate,prod_count,prod_cell) => {
    const {
       prod_num: lastNum,
       prod_seq: lastSeq
     } = f_products[f_products.length - 1];
    const newF_product = { 
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
    f_products.push(newF_product);
    return newF_product;
  };
  
  exports.update = (prod_num, prod_seq, name, kind, price, content,image,regdate,prod_count,prod_cell) => {
    const index = f_products.findIndex(
      (f_product) => f_product.prod_num === prod_num
    );
  
    if (index < 0) {
      throw new Error('Note not found for update');
    }
    const f_product = f_products[index];
    f_product.name = name;
    f_product.kind = kind;
    f_product.price = price;
    f_product.content = content;
    f_product.image = image;
    f_product.regdate = regdate;
    f_product.prod_count = prod_count;
    f_product.prod_cell = prod_cell;
    f_product.prod_seq = prod_seq; 
    f_products[index] = f_product;
    return f_product;
  };
  
  exports.delete = (prod_num) => {
    if (!f_products.some((f_product) => f_product.prod_num === prod_num)) {
      throw new Error('Product not found for delete');
    }
  
    f_products = f_products.filter(f_product => f_product.prod_num !== prod_num);
  
    return;
  };
  //////////////////////////
  // 이 파일은 DB를 흉내 낸 것 
  //////////////////////////