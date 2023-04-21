# Team7_WatchStrap
- 워치 스트랩을 판매하는 쇼핑몰
- 기본 쇼핑몰 기능을 UI로 최적화하여, 사용자들에게 편의를 제공합니다.
- 필터 기능을 고도화하여, 카테고리별(갤럭시, 애플), 소재별(가죽, 메탈, 실리콘), 가격별(₩)로 원하는 조건에 맞춰 상품을 보여 실용적인 쇼핑몰을 제작합니다.

 
## 프론트 서버 실행

frontend 브랜치로 이동

~~~bash  
git checkout front-end
~~~

dependencies 설치

~~~bash  
npm install
~~~

서버 실행

~~~bash  
npm run fe-start
~~~  

아래 주소로 접속

~~~bash  
http://localhost:1234
~~~  

## parcel 페이지 변경 방법

package.json 파일에서 ./fe-files/index.html 부분을 변경

변경 전

~~~bash  
    "scripts": {
        "parcel-dev": "parcel ./fe-files/index.html",
        "parcel-prebuild": "npx rimraf build",
        "parcel-build": "parcel build --public-url ./ ./fe-files/index.html --experimental-scope-hoisting --out-dir build", 
        ...
    },
~~~  

변경 후

~~~bash  
    "scripts": {
        "parcel-dev": "parcel ./fe-files/joinForm.html",
        "parcel-prebuild": "npx rimraf build",
        "parcel-build": "parcel build --public-url ./ ./fe-files/joinForm.html --experimental-scope-hoisting --out-dir build", 
        ...
    },
~~~  

## parcel 실행시 css 오류

parcel build시 아래와 같은 메시지가 출력 될 경우

~~~bash  
    ×  D:\team7_watchstrap-fe\css\custom.css:undefined:undefined: ENOENT: no such file or directory, open 'D:\team7_watchstrap-fe\css\custom.css'
    Error: ENOENT: no such file or directory, open 'D:\team7_watchstrap-fe\css\custom.css'
~~~  

head 태그의 custom.css 파일 경로 확인
~~~bash
  <head>
    ...
    <link rel="stylesheet" href="../css/custom.css">
    ...
  </head>
~~~

