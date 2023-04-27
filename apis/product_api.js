const { Product } = require('../models/index');

const productApi = {
  // 사용자
  // 상품 목록 - 전체 상품 조회
  async getAllProducts(req, res, next) {
    try {
      // 페이지네이션
      const page = Number(req.query.page || 1);
      const perPage = Number(req.query.perPage || 10);

      const total = await Product.countDocuments({});
      const products = await Product.find({})
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage);

      const totalPage = Math.ceil(total / perPage);

      // const foundAllProducts = await Product.find({});
      res.status(200).json({ products, page, perPage, totalPage });
    } catch (error) {
      console.error(error);
    }
  },

  // 상품 정렬 - default, 높은 가격순, 낮은 가격순
  async getAlignProducts(req, res, next) {
    try {
      // 페이지네이션
      const page = Number(req.query.page || 1);
      const perPage = Number(req.query.perPage || 10);

      const total = await Product.countDocuments({});

      const totalPage = Math.ceil(total / perPage);

      // category : Number 0(베스트), 1(세일), 2(삼성), 3(애플)
      // sortOption : Number 0(인기순), 1(높은), 2(낮은)

      const { option } = req.params;
      const optionString = option.toString();

      const category = parseInt(optionString.charAt(0));
      const sortOption = parseInt(optionString.charAt(1));

      let products = await Product.find({})
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage);

      if (category === 0) {
        products = products.filter(
          (product) => product.prod_sell / product.prod_count >= 0.7
        );
      } else if (category === 1) {
        products = products.filter(
          (product) => product.prod_sell / product.prod_count < 0.3
        );
      } else if (category === 2) {
        products = products.filter((product) => product.kind === true);
      } else if (category === 3) {
        products = products.filter((product) => product.kind === false);
      }

      if (sortOption === 0) {
        products.sort(
          (a, b) => b.prod_sell / b.prod_count - a.prod_sell / a.prod_count
        );
      } else if (sortOption === 1) {
        products.sort((a, b) => b.price - a.price);
      } else if (sortOption === 2) {
        products.sort((a, b) => a.price - b.price);
      }

      res.status(200).json({ products, page, perPage, totalPage });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // 상품 상세 - 선택한 상품의 상세정보 조회
  async getProductById(req, res, next) {
    try {
      const { prod_num } = req.params;

      const foundProduct = await Product.findOne({ prod_num });

      if (!foundProduct) return console.error(error);

      res.status(200).json(foundProduct);
    } catch (error) {
      console.error(error);
    }
  },

  // 관리자
  // 상품 추가 - 상품 정보 추가
  async createProduct(req, res, next) {
    try {
      // prod_num은 서버에서 새로 생성함
      const {
        name,
        kind,
        price,
        content,
        image,
        regdate,
        prod_seq,
        prod_count,
        prod_sell,
      } = req.body;

      const createInfo = {
        name,
        kind,
        price,
        content,
        image,
        regdate,
        prod_seq,
        prod_count,
        prod_sell,
      };

      const createdProduct = await Product.create(createInfo);

      res.status(201).json(createdProduct);
    } catch (error) {
      console.error(error);
    }
  },

  // 상품 수정 - 상품 정보 수정
  async updateProduct(req, res, next) {
    try {
      const { prod_num } = req.params;
      const {
        name,
        kind,
        price,
        content,
        image,
        regdate,
        prod_seq,
        prod_count,
        prod_sell,
      } = req.body;

      const updateInfo = {
        name,
        kind,
        price,
        content,
        image,
        regdate,
        prod_seq,
        prod_count,
        prod_sell,
      };
      const foundProduct = await Product.findOne({ prod_num });

      if (!foundProduct) return console.error(error);

      const updatedProduct = await Product.updateOne({ prod_num }, updateInfo);

      res.status(201).json(updatedProduct);
    } catch (error) {
      console.error(error);
    }
  },

  // 상품 삭제 - 상품 정보 삭제
  async deleteProduct(req, res, next) {
    try {
      const { prod_num } = req.params;

      const foundProduct = await Product.findOne({ prod_num });

      if (!foundProduct) return console.error(error);

      const deletedProduct = await Product.deleteOne({ prod_num });

      res.status(201).json(deletedProduct);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = productApi;
