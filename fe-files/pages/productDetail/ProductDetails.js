import { getProduct } from '../../modules/product.mjs';

// 가격 콤마 삽입
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


$(".wrap")
    .on('mousemove', magnify)
    .prepend("<div class='magnifier'></div>")
    .children('.magnifier').css({
        "background": "url('" + $(".target").attr("src") + "') no-repeat"
    });
 
var target = $('.bigImg');
var magnifier = $('.magnifier');

// 돋보기 함수
function magnify(e) {

    var mouseX = e.pageX - $(this).offset().left;
    var mouseY = e.pageY - $(this).offset().top;
 
    if (mouseX < $(this).width() && mouseY < $(this).height() && mouseX > 0 && mouseY > 0) {
        magnifier.fadeIn(100);
    } else {
        magnifier.fadeOut(100);
    }
 
    if (magnifier.is(":visible")) {
 
        var rx = -(mouseX / target.width() * target[0].naturalWidth - magnifier.width() / 2);
        var ry = -(mouseY / target.height() * target[0].naturalHeight - magnifier.height()  /2);
 
        // 5
        var px = mouseX - magnifier.width() / 2;
        var py = mouseY - magnifier.height() / 2;
 
        // 6
        magnifier.css({
            left: px,
            top: py,
            backgroundPosition: rx + "px " + ry + "px"
        });
    }
}


// 버튼 비활성화
function btnDisabled(target) {
    target.disabled = true;
}

let productUrl = "http://34.64.218.104:5002/products";
let prod_num = 6;

// 상품 product로 받아오기
let product = await getProduct(productUrl, prod_num);
console.log(product);

//상품 분류
let category = document.getElementById('category');

// 상품 분류(kind)가 애플(0)인 경우 애플로 표시 + 애플 카테고리 링크 걸기
if (product['kind'] === 1) category.innerHTML="갤럭시";
// 상품 분류(kind)가 갤럭시(1)인 경우 갤럭시로 표시 + 갤럭시 카테고리 링크 걸기
else category.innerHTML="애플";


//상품 이미지
let img = document.getElementById('bigImg');
img.src = product['image'];

// 상품 이름
let name = document.getElementById('productName');
name.innerText = product['name'];

// 상품 설명
let complain = document.getElementById('productExplain');
complain.innerText = product['content'];

// 상품 가격
let price = document.getElementById('productPrice');
price.innerText = '₩ ' + numberWithCommas(product['price']);

// 상품 할인 가격
let salePrice = document.getElementById('productSalePrice');
let calPrice = parseInt(product['price'] * 0.9);
salePrice.innerText = '₩ ' + numberWithCommas(calPrice);

// 버튼
const addCart = document.getElementById('addCart');
const orderNow = document.getElementById('orderNow');


// 수량 변경
let minus = document.querySelector(".minus");
let plus = document.querySelector(".plus");
let amount = document.querySelector("#productAmount");
let totalCost = document.querySelector(".total");

let i = 1;

minus.addEventListener("click", () => {
    if (i > 0) {
        if (i == 1) {
            // 버튼 비활성화
            addCart.disabled = true;
            orderNow.disabled = true;
        }

        i--
        amount.value = i;
        amount.textContent = amount.value;
        let totalCostNum = i * product['price'];
        totalCost.textContent = '₩ ' + numberWithCommas(totalCostNum);
    }
    else { // 수량 0개인 경우
        amount.textContent = 0;
        totalCost.textContent = '₩ ' + 0;
        // 버튼 비활성화
        addCart.disabled = true;
        orderNow.disabled = true;
    }
})

plus.addEventListener("click", () => {
    i++
    amount.value = i;
    amount.textContent = amount.value;
    let totalCostNum = i * product['price'];
    totalCost.textContent = '₩ ' + numberWithCommas(totalCostNum);

    // 버튼 활성화
    addCart.disabled = false;
    orderNow.disabled = false;
})


// 상품 베스트셀러 - 70% 이상 판매된 경우
if (product['prod_cell'] < product['prod_count'] * 0.7)
    document.getElementById('best').style.display = 'none';

// 상품 세일 - 30% 이하 판매된 경우
    //세일 아닐 경우
if (product['prod_cell'] > product['prod_count'] * 0.3){
    document.getElementById('sale').style.display = 'none';
    //할인가 보이기
    document.getElementById('showSalePrice').style.display = 'none';
    document.getElementById('showPrice').style.alignSelf = 'center';
    totalCost.textContent = '₩ ' + numberWithCommas(product['price']);
}
else {
    totalCost.textContent = '₩ ' + numberWithCommas(calPrice);
}
    

// 상품 품절 x
if (product['prod_cell'] < product['prod_count']) {
    // 일시품절 표시
    document.getElementById('productSoldOut').style.display = 'none';
}
else { //상품 품절 o
    // 장바구니 버튼 비활성화
    addCart.disabled = true;
    // 바로구매 버튼 비활성화
    orderNow.disabled = true;
}

// 공유
let nowUrl = window.location.href;

function copyUrl(){
    navigator.clipboard.writeText(nowUrl).then(res =>{
        alert('주소가 복사되었습니다!')
    })
}