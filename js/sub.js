import { blogPost, eventPost, guidePost } from './data.js';

/* --------------------------------------------------------------------
create bt kang-young-hyun
at 2024-04-22 / blogList, blogGoToPage
--------------------------------------------------------------------*/
// blog + blog 하위페이지
const blogList = () => {
    // blog list + 본문 내 prev, next posting 기능 구현
    const $listing = get('.blog .left-flex-list .listing');
    const $blogPaging = get('.blog .left-flex-list .paging ');
    let postPerPage = 6,
        currentPage = 1,
        firstPost,
        lastPost,
        postMod,
        pageNumber,
        totalPage,
        posts = 0;

    const blogCondense = () => {
        const $inner = get('.blog .inner');
        const $blogLis = getAll('.blog .left-flex-list .listing li');
        const $sum = get('.blog .right-flex-text');
        const $sumDate = get('.blog .right-flex-text .date');
        const $sumTitle = get('.blog .right-flex-text p');
        const $sumMainTitle = get('.blog .right-flex-text strong');
        const $sumQues = get('.blog .right-flex-text em');
        const $sumDummy1 = get('.blog .right-flex-text b:nth-of-type(1)');
        const $sumDummy2 = get('.blog .right-flex-text b:nth-of-type(2)');
        const $blogMore = get('.blog .right-flex-text p.blog-more a');
        let blogCur = firstPost;
        // console.log(blogCur);

        const sumKeyframes = [
            { transform: 'translateY(100px)', opacity: 0 },
            { transform: 'translateY(0px)', opacity: 1 },
        ];
        const sumOptions = {
            duration: 800,
            easing: 'ease',
            fill: 'forwards',
        };

        conText(blogCur);
        // window.localStorage.setItem(`num`, blogCur);
        // $blogLis[0].classList.add('on');

        $blogLis.forEach((li) => {
            li.addEventListener('click', (e) => {
                $sum.animate(sumKeyframes, sumOptions);
                let blogId = e.target.getAttribute('data-id');
                conText(blogId - 1);
                $blogLis.forEach((lis, idx) => {
                    lis.classList.remove('on');
                });
                e.currentTarget.classList.add('on');
            });
        });

        function conText(num) {
            // 블로그 우측 요약글
            let conNum = posts[num];
            $sumDate.innerHTML = `${conNum.date}`;
            $sumTitle.innerHTML = `${conNum.title}`;
            $sumMainTitle.innerHTML = `${conNum.mainTitle}`;
            $sumQues.innerHTML = `${conNum.ques}`;
            $sumDummy1.innerHTML = `${conNum.textDummy1}`;
            $sumDummy2.innerHTML = `${conNum.textDummy2}`;
            $blogMore.href = conNum.url;
            window.localStorage.setItem(`num`, num);
        }
    };
    const makePaging = () => {
        // 페이징 생성
        const pageClick = (e) => {
            switch (e.currentTarget.textContent) {
                case 'prev':
                    currentPage = currentPage > 1 ? currentPage - 1 : currentPage;
                    break;
                case 'next':
                    currentPage = currentPage < pageNumber ? currentPage + 1 : currentPage;
                    break;
                default:
                    currentPage = Number(e.currentTarget.textContent);
            }
            // console.log(currentPage);
            // getData();
        };
        $blogPaging.innerHTML = '';
        for (let i = 0; i < pageNumber; i++) {
            const a = document.createElement('a');
            a.textContent = i + 1;

            if (i == currentPage - 1) {
                a.classList.add('on');
            }
            $blogPaging.appendChild(a);
        }

        const minPrevBtn = document.createElement('a');
        const maxNextBtn = document.createElement('a');
        minPrevBtn.textContent = 'prev';
        maxNextBtn.textContent = 'next';
        $blogPaging.prepend(minPrevBtn);
        $blogPaging.append(maxNextBtn);

        const $blogPagings = getAll('.blog .left-flex-list .paging a');
        $blogPagings.forEach((paging) => {
            paging.addEventListener('click', pageClick);
        });
    };
    // const makeList = () => {
    //     // 좌측 게시판 리스팅

    // };
    const getData = () => {
        posts = blogPost;
        totalPage = blogPost.length;
        postMod = totalPage % postPerPage;
        pageNumber = Math.ceil(totalPage / postPerPage);
        const curPAgeNumt = window.localStorage.getItem('num');
        // currentPage = curPAgeNumt === '' ? currentPage : Math.floor(totalPage / postPerPage);
        firstPost = currentPage + 1 * postPerPage;
        window.localStorage.clear();
        lastPost = currentPage == pageNumber && postMod !== 0 ? firstPost + postMod : firstPost + postPerPage;
        console.log(firstPost, currentPage);

        $listing.innerHTML = '';

        for (let i = firstPost; i < lastPost; i++) {
            const li = document.createElement('li');
            li.textContent = firstPost + i + posts[i].title;
            li.setAttribute('data-id', posts[i].id);
            $listing.appendChild(li);
        }
        makePaging();
        blogCondense();
    };

    getData();
};
const blogGoToPage = () => {
    // 본문 연결 + 이전, 다음글 링크
    const $backList = get('.blog-more a');
    const $blogPrev = get('.blog-post .move-post .prev');
    const $blogPrevTitle = get('.blog-post .move-post .prev .title');
    const $blogNext = get('.blog-post .move-post .next');
    const $blogNextTitle = get('.blog-post .move-post .next .title');
    let cnt = Number(localStorage.getItem('num'));
    let old = 0;

    const btnPN = () => {
        if (cnt == 0) {
            $blogPrev.style.visibility = 'hidden';
            $blogNextTitle.innerHTML = `${blogPost[cnt + 1].id}. ${blogPost[cnt + 1].title}`;
        } else if (cnt == blogPost.length - 1) {
            $blogPrevTitle.innerHTML = `${blogPost[cnt - 1].id}. ${blogPost[cnt - 1].title}`;
            $blogNext.style.visibility = 'hidden';
        } else {
            $blogPrevTitle.innerHTML = `${blogPost[cnt - 1].id}. ${blogPost[cnt - 1].title}`;
            $blogNextTitle.innerHTML = `${blogPost[cnt + 1].id}. ${blogPost[cnt + 1].title}`;
        }
    };
    const numbering = (cnt) => {
        window.location = `../${blogPost[cnt].url}`;
        window.localStorage.setItem(`num`, cnt);
        old = cnt;
    };
    $blogPrev.addEventListener('click', (e) => {
        cnt--;
        numbering(cnt);
    });
    $blogNext.addEventListener('click', (e) => {
        cnt++;
        numbering(cnt);
    });

    btnPN();
    $backList.addEventListener('click', (e) => {
        history.back();
    });
};

/* --------------------------------------------------------------------
create bt kang-young-hyun
at 2024-04-21 / eventList (on, fin)
--------------------------------------------------------------------*/
// 이벤트 (진행/종료)
const eventListOn = () => {
    // card view listing + list more,  modal + event_Dday 구현
    const $evBar = getAll('.event .ev-bar span');

    const $cardViewUl = get('.event .event-card-view ul');
    const $seeMore = get('.event .see-more');
    const $body = get('body');

    // 모달 부모
    const $modal = get('.event .ev-modal');
    const $modalCon = get('.event .ev-modal .modal-con');

    // 모달(팝업) 내부 선언
    const $timer = get('.event .ev-modal .top-timer p');
    const $evImg = get('.event .ev-modal .ev-content em img');
    const $title = get('.event .ev-modal .ev-content h2');
    const $subTitle = get('.event .ev-modal .ev-content strong');
    const $desc = get('.event .ev-modal .ev-content span');
    const $info = getAll('.event .ev-modal .ev-content .info li');
    const $close = get('.event .ev-modal .ev-content p.close');

    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    let ongoing = [...eventPost].filter((x) => (x.year === 2024 && x.month == month && x.date > day) || (x.year >= 2024 && x.month > month));

    let maxCard = 6,
        cnt = 0,
        current = 0,
        data = ongoing,
        countdown = null;

    $cardViewUl.innerHTML = '';

    const dDay = (keys) => {
        console.log(keys.date);
        const dday = new Date(keys.year, keys.month, keys.date);
        const gapTime = dday.getTime() - today.getTime();

        const days = Math.floor(gapTime / (1000 * 60 * 60 * 24)) - 30;
        const hours = Math.floor(gapTime / (1000 * 60 * 60)) % 24;
        const minutes = Math.floor(gapTime / (1000 * 60)) % 60;
        const seconds = Math.floor(gapTime / 1000) % 60;

        $timer.innerHTML = `이벤트 마감까지 <span>D-${days}일 ${hours}시간 ${minutes}분</span>남았어요!`;
        // $timer.innerHTML = `이벤트 마감까지 <span>D-${days}일 ${hours}시간 ${minutes}분 ${seconds}초</span>남았어요!`;
        // num 값을 1초 단위로 받지 못해서 초에서 오류남.
    };
    const moInner = (id) => {
        // 모달 컨텐츠

        let keys = data[id];
        $evImg.setAttribute('src', `${keys.bgUrl}`);
        $evImg.setAttribute('alt', `${keys.subTitle}`);
        $title.innerHTML = `${keys.title}`;
        $subTitle.innerHTML = `${keys.subTitle}`;
        $desc.innerHTML = `${keys.desc}`;
        $info[0].innerHTML = `일자 : ${keys.year}.${keys.month}.${keys.date}`;
        $info[1].innerHTML = `${keys.loca}`;

        dDay(keys);
    };

    const modalView = () => {
        const $cards = getAll('.event .event-card-view ul li');
        $cards[0].classList.add('act');
        $cards.forEach((card, idx) => {
            // 클릭 시 모달 띄우기
            card.addEventListener('click', (e) => {
                current = idx;
                $modal.style.display = 'block';
                $body.style.overflow = 'hidden';

                // 항상 스크롤 맨 위로
                const scrollModal = document.getElementById('modal');
                scrollModal.scrollIntoView(true);

                moInner(e.currentTarget.getAttribute('data-id'));
            });
            card.addEventListener('mouseenter', (e) => {
                $cards.forEach((items) => {
                    items.classList.remove('act');
                });
                $cards[idx].classList.add('act');
            });
            card.addEventListener('mouseleave', (e) => {
                $cards.forEach((items) => {
                    items.classList.remove('act');
                });
            });
        });
    };

    const makeCard = () => {
        if (cnt > data.length - 1) return;

        // maxCard 의 조건을 걸어줘야함
        maxCard = data.length - cnt > 6 ? 6 : data.length - cnt;
        for (let i = 0; i < maxCard; i++) {
            const li = document.createElement('li');
            const b = document.createElement('b');
            const p1 = document.createElement('p');
            const p2 = document.createElement('p');
            const span = document.createElement('span');
            const p3 = document.createElement('p');
            li.setAttribute('data-id', cnt);
            li.style.backgroundImage = `url(${data[cnt].bgUrl})`;
            console.log(getComputedStyle(li).backgroundImage);
            b.textContent = data[cnt].cate;
            p1.innerHTML = data[cnt].title;
            p1.classList.add('title');
            p2.innerHTML = data[cnt].subTitle;
            p2.classList.add('sub-title');
            span.textContent = `${data[cnt].year}. ${data[cnt].month}. ${data[cnt].date}`;
            span.classList.add('date');
            p3.classList.add('popup-more');
            p3.innerHTML = `<i class="bx bx-right-arrow-alt"></i>`;

            li.append(b, p1, p2, span, p3);
            $cardViewUl.append(li);
            cnt++;
        }

        modalView();
    };
    makeCard();

    const closing = () => {
        $modal.style.display = 'none';
        $body.style.overflow = 'auto';
    };
    document.addEventListener('mouseup', (e) => {
        if (!$modalCon.contains(e.target)) {
            closing();
        }
    });
    $close.addEventListener('click', () => {
        closing();
    });
    $seeMore.addEventListener('click', (e) => {
        makeCard();
    });

    $evBar.forEach((bars, idx) => {
        bars.addEventListener('click', (e) => {
            $evBar.forEach((bItem) => {
                bItem.classList.remove('on');
            });
            $evBar[idx].classList.add('on');
        });
    });
};
const eventListFin = () => {
    // card view listing + list more,  modal + event_Dday 구현

    const $cardViewUl = get('.event .event-card-view ul');
    const $seeMore = get('.event .see-more');

    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    let finished = [...eventPost].filter((x) => (x.year === 2024 && x.month < month) || x.year === 2023);

    let maxCard = 6,
        cnt = 0,
        current = 0,
        data = finished;

    $cardViewUl.innerHTML = '';

    const makeCard = () => {
        if (cnt > data.length - 1) return;

        // maxCard 의 조건을 걸어줘야함
        maxCard = data.length - cnt > 6 ? 6 : data.length - cnt;
        for (let i = 0; i < maxCard; i++) {
            const li = document.createElement('li');
            const b = document.createElement('b');
            const p1 = document.createElement('p');
            const p2 = document.createElement('p');
            const span = document.createElement('span');
            const p3 = document.createElement('p');
            li.setAttribute('data-id', cnt);
            b.textContent = data[cnt].cate;
            p1.innerHTML = data[cnt].title;
            p1.classList.add('title');
            p2.innerHTML = data[cnt].subTitle;
            p2.classList.add('sub-title');
            span.textContent = `${data[cnt].year}. ${data[cnt].month}. ${data[cnt].date}`;
            span.classList.add('date');
            p3.classList.add('popup-more');
            p3.innerHTML = `<i class="bx bx-right-arrow-alt"></i>`;

            li.append(b, p1, p2, span, p3);
            $cardViewUl.append(li);
            $cardViewUl.classList.add('end');
            cnt++;
        }

        // modalView();
    };
    makeCard();

    $seeMore.addEventListener('click', (e) => {
        makeCard();
    });
};

/* --------------------------------------------------------------------
create bt kang-young-hyun
at 2024-04-22 / guideList
--------------------------------------------------------------------*/
const guideList = () => {
    const $cates = getAll('.guide .tab-bar .tab li');
    const $searchValue = get('.guide .tab-bar .search input');
    const $searchBtn = get('.guide .tab-bar .search button');
    const $guideTbody = get('.guide table tbody');
    const $guidePaging = get('.guide .guide-paging');
    let word = '';
    let postsPerPage = 8;
    let currentPage = 1;
    let firstPost,
        lastPost,
        pageNumber,
        postMod,
        totalPage,
        posts = 0;

    // 포스팅 날짜 최신순 정렬
    let listAll = [...guidePost].sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    });

    posts = listAll;

    const makePaging = () => {
        const pageAdd = (e) => {
            e.preventDefault();
            switch (e.currentTarget.textContent) {
                case 'prev':
                    currentPage = currentPage > 1 ? currentPage - 1 : currentPage;
                    break;
                case 'next':
                    currentPage = currentPage < pageNumber ? currentPage + 1 : currentPage;
                    break;
                default:
                    currentPage = Number(e.currentTarget.textContent);
            }
            getGuide();
        };

        $guidePaging.innerHTML = '';

        for (let i = 1; i <= pageNumber; i++) {
            const a = document.createElement('a');
            a.setAttribute('href', '#');
            a.textContent = i;

            if (i === currentPage) {
                a.classList.add('on');
            }
            $guidePaging.append(a);
        }
        const minPrevBtn = document.createElement('a');
        const maxNextBtn = document.createElement('a');
        minPrevBtn.textContent = 'prev';
        maxNextBtn.textContent = 'next';
        $guidePaging.prepend(minPrevBtn);
        $guidePaging.append(maxNextBtn);

        let $allpagings = getAll('.guide .guide-paging a');
        $allpagings.forEach((a, idx) => {
            a.addEventListener('click', pageAdd);
        });
    };
    const makeLIst = () => {
        $guideTbody.innerHTML = '';
        for (let i = firstPost; i < lastPost; i++) {
            const tr = document.createElement('tr');
            const num = document.createElement('td');
            const cate = document.createElement('td');
            const title = document.createElement('td');
            const titleLink = document.createElement('a');
            const date = document.createElement('td');
            num.textContent = i + 1;
            cate.textContent = posts[i].cate;

            titleLink.textContent = posts[i].title;
            titleLink.setAttribute('href', `${posts[i].url}`);
            titleLink.setAttribute('target', '_blank');
            date.textContent = posts[i].date;
            title.append(titleLink);
            tr.append(num, cate, title, date);
            $guideTbody.append(tr);
        }
    };

    const getGuide = () => {
        if (posts.length < postsPerPage) {
            postsPerPage = posts.length;
        }
        pageNumber = Math.ceil(posts.length / postsPerPage);
        totalPage = posts.length;
        postMod = totalPage % postsPerPage;
        firstPost = (currentPage - 1) * postsPerPage;
        lastPost = currentPage === pageNumber && postMod !== 0 ? firstPost + postMod : firstPost + postsPerPage;

        makePaging();
        makeLIst(currentPage);
    };
    getGuide();

    $cates.forEach((cates, idx) => {
        cates.addEventListener('click', (e) => {
            postsPerPage = 8;
            currentPage = 1;

            let name = e.target.textContent;
            let newList = [];
            if (name !== '전체') {
                newList = [...guidePost].filter((key) => {
                    return key.cate == name;
                });
            } else if (name === '전체') {
                newList = listAll;
            }
            posts = newList;

            getGuide();

            $cates.forEach((cate, idx) => {
                cate.classList.remove('on');
            });
            $cates[idx].classList.add('on');
        });
    });
    const wordSend = () => {
        postsPerPage = 8;
        currentPage = 1;

        word = $searchValue.value;
        if (!word || word === ' ') return;
        $searchValue.value = '';
        $searchValue.focus();

        let searchList = [];
        searchList = [...guidePost].filter((words) => words.title.toLowerCase().indexOf(word.toLowerCase()) !== -1);
        posts = searchList;
        getGuide();
    };
    $searchBtn.addEventListener('click', (e) => {
        wordSend();
    });
    $searchValue.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
            wordSend();
        }
    });
};

//서브페이지 별 함수 호출
const blog = () => {
    blogList();
};
const blogSub = () => {
    blogGoToPage();
};
const eventOn = () => {
    eventListOn();
};
const eventFin = () => {
    eventListFin();
};

const guide = () => {
    guideList();
};

const subInit = () => {
    if (location.pathname.split('/').pop() === 'blog.html') {
        blog();
    }
    if (location.pathname.split('/').pop() === 'baltimore.html' || location.pathname.split('/').pop() === 'ais.html' || location.pathname.split('/').pop() === 'cargo.html' || location.pathname.split('/').pop() === 'maersk.html' || location.pathname.split('/').pop() === 'red-sea.html') {
        blogSub();
    }
    if (location.pathname.split('/').pop() === 'eventOn.html') {
        eventOn();
    }
    if (location.pathname.split('/').pop() === 'eventFin.html') {
        eventFin();
    }
    if (location.pathname.split('/').pop() === 'guide.html') {
        guide();
    }
};

(() => {
    subInit();
})();
