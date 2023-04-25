const { Router } = require('express');
const router = Router();
const productApi = require('../apis/product_api');

// 사용자
router.get('/', productApi.getAllProducts); // (메인 페이지)

router.get('/:prod_num', productApi.getProductById); // (상품 상세 페이지)

// 관리자
router.post('/', productApi.createProduct); // (상품 관리 페이지)

router.put('/:prod_num', productApi.updateProduct); // (상품 관리 페이지)

router.delete('/:prod_num', productApi.deleteProduct); // (상품 관리 페이지)

module.exports = router;
