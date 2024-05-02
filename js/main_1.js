/* --------------------------------------------------------------------
    create by kimsona
    at 2024-04-25
--------------------------------------------------------------------*/
import arrNewsList from './news.con.js';
// ------------------------ for main page ------------------------------ //
function fMainPageInit() {
    const btnContentCard = document.querySelectorAll('.main button');
    const newslist = document.querySelector('.mainNewsList');
    const bloglist = document.querySelector('.mainBlogList');
    const ulCardList = document.querySelectorAll('.main .cardScrollNews ul');
    const divScrollNavi = document.querySelector('.main .scrollbar');
    const arrBlogList = [...arrNewsList].sort((a, b) => (a.index > b.index ? -1 : 0));
    const nDefaultGage = parseInt(getComputedStyle(divScrollNavi).width);
    const nMaxGage = Number(getComputedStyle(divScrollNavi).getPropertyValue('--maxGage'))-nDefaultGage;
    let nCaptureY = 0,bCaptureY=false,bScrollEnd=false,bViewNews=true,liCardList=[[],[]],nMoveWdth=[];
    function fContListInit(list, arr) {
        const ul = list.querySelector('ul');
        ul.innerHTML = '';
        for (let i = 0; i < arr.length; i++) {
            const li = document.createElement('li');
            const anc = document.createElement('a');
            anc.setAttribute('src', '#');
            const div = document.createElement('div');
            div.style.backgroundImage = `url(${arr[i].thumb})`;
            const p = document.createElement('p');
            p.textContent = arr[i].title;
            anc.append(div, p);
            li.append(anc);
            ul.append(li);
        }
    }
    function fGageReset(flag) {
        bScrollEnd = false;
        divScrollNavi.style.width = `${nDefaultGage}px`;
        liCardList.forEach(list=>list.forEach(item=>item.style.transform = `translateX(0px)`));
        if(flag===true){
            newslist.classList.add('on');
            bloglist.classList.remove('on');
        } else {
            newslist.classList.remove('on');
            bloglist.classList.add('on');
        }
    }
    function fSetGageBar(e) {
        const idx = bViewNews ? 0:1;
        const nListTop = Math.round(ulCardList[idx].getBoundingClientRect().y);
        const nListHgt = Math.round(ulCardList[idx].getBoundingClientRect().height);
        const bCenterEle = Math.round(window.innerHeight/1.5) > Math.round(nListTop+(nListHgt/1.5));
        if(bCenterEle && !bCaptureY) [nCaptureY,bCaptureY] = [window.scrollY,true];
        if(bCenterEle && window.scrollY-nCaptureY <= nListHgt && !bScrollEnd){//
            let [x1,x2] = [Math.floor(window.scrollY-nCaptureY)* nMaxGage/nListHgt,Math.floor(window.scrollY-nCaptureY)* nMoveWdth[idx]/nListHgt];
            if(x1 < 0 || x2 < 0) return;
            divScrollNavi.style.width = `${nDefaultGage+x1}px`;
            liCardList[idx].forEach(item=>item.style.transform = `translateX(${-x2}px)`);
        } else if (bCenterEle && window.scrollY-nCaptureY > nListHgt && !bScrollEnd) {
            bScrollEnd= true;
            divScrollNavi.style.width = `${nDefaultGage+nMaxGage}px`;
            liCardList[idx].forEach(item=>item.style.transform = `translateX(${-nMoveWdth[idx]}px)`);
        }
    }
    fContListInit(newslist, arrNewsList);
    fContListInit(bloglist, arrBlogList);
    ulCardList.forEach((item,idx)=>liCardList[idx].push(...item.children));
    liCardList.forEach((item,idx)=>{
        nMoveWdth[idx] = item.reduce((acc,crr)=>{
            return acc + parseInt(getComputedStyle(crr).marginLeft) + parseInt(getComputedStyle(crr).marginRight) + parseInt(getComputedStyle(crr).width);
        },0) - parseInt(getComputedStyle(ulCardList[idx]).width);
    });
    window.addEventListener('scroll', fSetGageBar);
    btnContentCard.forEach((item,idx) => {
        item.addEventListener('click', (e) => {
            bViewNews = idx === 0 ? true:false;
            fGageReset(bViewNews);
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
