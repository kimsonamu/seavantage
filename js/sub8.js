'use strict';
const arrBannerList = [
    { num: 1, txt: '�ㅻ꼫�� �꾨땲�� �ㅽ븯��1', img: './img/thumb1.png', price: '1000' },
    { num: 2, txt: '�ㅻ꼫�� �꾨땲�� �ㅽ븯��2', img: './img/thumb2.png', price: '2000' },
    { num: 3, txt: '�ㅻ꼫�� �꾨땲�� �ㅽ븯��3', img: './img/thumb3.png', price: '6000' },
    { num: 4, txt: '�ㅻ꼫�� �꾨땲�� �ㅽ븯��4', img: './img/thumb4.png', price: '7000' },
    { num: 5, txt: '�ㅻ꼫�� �꾨땲�� �ㅽ븯��5', img: './img/thumb5.png', price: '500' },
    { num: 6, txt: '�ㅻ꼫�� �꾨땲�� �ㅽ븯��6', img: './img/thumb6.png', price: '18000' },
    { num: 7, txt: '�ㅻ꼫�� �꾨땲�� �ㅽ븯��7', img: './img/thumb7.png', price: '4000' },
];
const btns = document.querySelectorAll('.btns button');
const objBannerUl = document.querySelector('.sub8 .sec1 article ul:first-of-type');
const objPaingUl = document.querySelector('.sub8 .sec1 article ul:last-of-type');
const interval = 3000,
    total = arrBannerList.length;
let nCurCnt = 0,
    timer = null,
    fSetCurBanner;
btns[0].addEventListener('click', (e) => fAutoRoll(null, -1));
btns[1].addEventListener('click', (e) => fAutoRoll(null, 1));
for (let i = 0; i < arrBannerList.length; i++) {
    let li = document.createElement('li');
    li.setAttribute('draggable', true);
    let a = document.createElement('a');
    a.setAttribute('href', '#');
    a.addEventListener('click', (e) => {
        e.preventDefault();
        fAutoRoll(i, 1);
    });
    let img = document.createElement('img');
    img.setAttribute('src', arrBannerList[i].img);
    img.setAttribute('alt', arrBannerList[i].txt);
    let p = document.createElement('p');
    p.textContent = arrBannerList[i].txt;
    let span = document.createElement('span');
    span.textContent = 'gdfafasdfas';
    a.append(img, p, span);
    li.append(a);
    objBannerUl.append(li);
    let pLi = document.createElement('li');
    objPaingUl.append(pLi);
}
const objPaingLi = [...objPaingUl.children];
const objBannerLi = [...objBannerUl.children];
objPaingLi.forEach((item, idx) => {
    item.addEventListener('click', (e) => fAutoRoll(idx, 1));
});
(fSetCurBanner = (num = 0) => {
    num = num < 0 ? total - 1 : num >= total ? 0 : num;
    const pwidth = parseInt(getComputedStyle(objBannerUl).width);
    const width = parseInt(getComputedStyle(objBannerLi[num]).width);
    const vcount = Math.ceil(pwidth / width);
    const left = Math.floor(pwidth / vcount);
    objBannerLi.forEach((item) => {
        item.style.display = 'none';
    });
    const count = vcount + 2;
    let flag = Math.floor(count / 2);
    let tmp = 0;
    for (let i = 0; i < count; i++) {
        tmp = i - flag + num;
        tmp = (tmp < 0 ? total + tmp : tmp) % total;
        objBannerLi[tmp].style.left = `${left * i - left}px`;
        objBannerLi[tmp].style.display = 'block';
        objBannerLi[tmp].classList.remove('on');
    }
    objBannerLi[num].classList.add('on');
    fPagingSet(num);
    nCurCnt = num;
})(nCurCnt);
const fStopRoll = () => {
    clearInterval(timer);
    timer = null;
};
const fStartRoll = (delay) => {
    delay = delay || 0;
    timer = setInterval(() => fSetCurBanner(nCurCnt + 1), interval + delay);
};
function fPagingSet(num = 0) {
    objPaingLi.forEach((item, idx) => {
        if (idx === num) item.classList.add('on');
        else item.classList.remove('on');
    });
}
function fAutoRoll(index = null, flag = 1) {
    fStopRoll();
    let delay = 0;
    if (index !== null) {
        if (index === nCurCnt) return;
        let tmp = index - nCurCnt;
        for (let i = 0; i < Math.abs(tmp); i++) {
            // console.log(Math.round(400/Math.abs(tmp))*i);
            delay = 150 * i;
            setTimeout(() => fSetCurBanner(nCurCnt + (tmp < 0 ? -1 : 1)), delay);
        }
    } else fSetCurBanner(nCurCnt + flag);
    fStartRoll(delay);
}
fStartRoll();
