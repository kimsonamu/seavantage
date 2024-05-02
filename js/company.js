/* --------------------------------------------------------------------
    create by kimsona
    at 2024-04-25
--------------------------------------------------------------------*/
import { strNewsDataURL } from './data.js';
const arrNewsList = strNewsDataURL;
// ------------------------ for main page ------------------------------ //
function fMainPageInit() {
    //
}
// ------------------------- for new page ------------------------------ //
function fNewsPageInit() {
    const ulNewsList = document.querySelector('.news .newslist > ul');
    const divNewsCon = document.querySelector('.news .newscont');
    let nLastNewsClick = 0,
        nCurNews = 0;
    const fNewsListInit = () => {
        ulNewsList.innerHTML = '';
        divNewsCon.innerHTML = '';
        for (let i = 0; i < arrNewsList.length; i++) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.setAttribute('href', '#');
            a.addEventListener('click', (e) => fViewNews(i, e));
            const img = document.createElement('img');
            img.setAttribute('src', arrNewsList[i].thumb);
            img.setAttribute('alt', arrNewsList[i].title);
            const p = document.createElement('p');
            p.innerHTML = arrNewsList[i].title;
            const span = document.createElement('span');
            span.textContent = arrNewsList[i].date;
            const icon = document.createElement('i');
            icon.setAttribute('data-newsindex', arrNewsList[i].index);
            icon.classList.add('dropdownbtn');
            icon.classList.add('xi-angle-down');
            a.append(img, p, span, icon);
            li.append(a);
            ulNewsList.append(li);
        }
        fViewNews(0);
    };
    function fViewNews(num, ev = null) {
        if (ev !== null) {
            ev.preventDefault();
            window.scroll({ top: document.getElementById('newsContent').offsetTop + 500, behavior: 'smooth' });
        }
        nCurNews = num;
        const icon = ulNewsList.querySelectorAll('i[data-newsindex]');
        ulNewsList.children[nLastNewsClick].classList.remove('on');
        icon[nLastNewsClick].classList.remove('on');
        icon[nLastNewsClick].classList.replace('xi-angle-up', 'xi-angle-down');
        icon[nCurNews].classList.add('on');
        icon[nCurNews].classList.replace('xi-angle-down', 'xi-angle-up');
        ulNewsList.children[nCurNews].classList.add('on');
        divNewsCon.innerHTML = '';
        const strong = document.createElement('strong');
        strong.textContent = arrNewsList[num].title;
        const em = document.createElement('em');
        em.textContent = arrNewsList[num].date;
        const div = document.createElement('div');
        div.innerHTML = arrNewsList[num].content;
        divNewsCon.append(strong, em, div);
        nLastNewsClick = nCurNews;
    }
    (() => {
        fNewsListInit();
    })();
}
// ------------------------------------- for recruit page --------------------------------------//
function fRecruitPageInit() {
    const btnsRecruitMore = document.querySelectorAll('.cowork .ir-view .irlist li button');
    btnsRecruitMore.forEach((item) => {
        item.addEventListener('click', (e) => {
            window.open('https://team.seavantage.com/recruit');
        });
    });
}
// ---------------------------------- delete ----------------------------------//
if (location.pathname.split('/').pop() === 'about.html') {
    fAboutSeaVentage();
}
if (location.pathname.split('/').pop() === 'news.html') {
    fNewsPageInit();
}
if (location.pathname.split('/').pop() === 'recruit.html') {
    fRecruitPageInit();
}
if (location.pathname.split('/').pop() === 'index.html') {
    fMainPageInit();
}
