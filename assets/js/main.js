"use strict";

let logOut = $('#logout');
let booksWrapper = $('.books-wrapper');
let resulCount = $('.result-count');
let bookmarkWrapper = $('.bookmark-list');
let searchInput = $('#search-input');

function tokenList(){
    let token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../../pages/login.html'
    }
}
tokenList()


function logOutFunction() {
    localStorage.removeItem('token');
    window.location.href = '../../pages/login.html'
}

logOut.addEventListener('click', () => {
    logOutFunction()
})

let baseURL = 'https://www.googleapis.com/books/v1'

async function render() {
    try {
        let response = await fetch(`${baseURL}/volumes?q=harry&startIndex=1`)
        let result = await response.json()
        renderAllBooks(result)
    } catch(err) {
        console.log(err);
    }
}
render()



function renderAllBooks(data) {
    // console.log(data.items);
    if (data.items.length) {
        data.items.forEach((el) => {
            let div = createElement('div', 'card w-[282px] h-[431px] rounded-[5px] bg-white py-[13px] px-[17px]', `
                                    <div class="grid place-content-center w-[249px] h-[238px] bg-[#F8FAFD] rounded-[5px] mb-[19px]">
                                        <img src="${el.volumeInfo.imageLinks.thumbnail}" alt="img">
                                    </div>
                                    <div>
                                        <p class="book-title font-semibold text-[18px]">${el.volumeInfo.title}</p>
                                        <span class="block text-[13px] text-[#757881]">${el.volumeInfo.authors}</span>
                                        <span class="block text-[13px] text-[#757881] mb-[10px]">${el.volumeInfo.publishedDate}</span>
                                        <div class="flex justify-between mb-[5px]">
                                            <button data-id="${el.id}" class="bookmark w-[120px] h-[37px] font-semibold text-[14px] bg-[#FFD80D] rounded-[4px]">Bookmark</button>
                                            <button class="w-[120px] h-[37px] font-semibold text-[14px] bg-[#0D75FF0D] rounded-[4px] text-[#0D75FF]">More Info</button>
                                        </div>
                                        <a href="${el.volumeInfo.previewLink}" target="_blanc" class="w-full h-[37px] flex items-center justify-center font-semibold text-[14px] bg-[#75828A] rounded-[4px] text-white">Read</a>
                                    </div>
            `)
            booksWrapper.appendChild(div)
            
        })
        resulCount.textContent = `Showing ${data.items.length} result(s)`
    } else {
        booksWrapper.innerHTML = "Not found"
    }
}

async function searchFunction(sentence) {
    booksWrapper.innerHTML = '<span class="absolute top-[365px] left-[385px] loader"></span>'
    try {
        let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${sentence}&startIndex=0&maxResults=30`)
        let result = await response.json();
        booksWrapper.innerHTML = ''
        renderAllBooks(result)
    } catch (err) {
        booksWrapper.innerHTML = '<p class="font-bold text-[20px] absolute top-[370px] left-[350px] text-[#0D75FF] flex items-center">NOT FOUND</p>'
    }
}

searchInput.addEventListener("keyup", (e) => {
    if(e.keyCode === 13 && e.target.value.length) {
        searchFunction(e.target.value.toLowerCase())
    }
})


// let bookmarkList = localStorage.getItem('bookmark') || [];

// booksWrapper.addEventListener('click', (el) => {
//     // bookmarkWrapper.innerHTML = "";
//     if (el.target.classList.contains('bookmark')) {
//         let id = el.target.dataset.id;
//         searchBookById(id)
//         renderBookmarkList(bookmarkList)
//     }
// })

// async function searchBookById(id) {
//     try {
//         const response = await fetch(`${baseURL}/volumes/${id}`);
//         const result = await response.json();
//         if (bookmarkList.length > 0) {

//             let dublicate = bookmarkList.map((el) => el.id)
//                 if (!dublicate.includes(id)) {
//                     bookmarkList.push(result)
//                     localStorage.setItem('bookmark', JSON.stringify(bookmarkList));
//                 }
//         }else {
//             bookmarkList.push(result)
//             localStorage.setItem('bookmark', JSON.stringify(bookmarkList))
//         }
//     } catch (er) {
//         console.log(er);
//     }
// }

// // localStorage.removeItem('bookmark')


// function renderBookmarkList(data) {
//     bookmarkWrapper.innerHTML = ""
//     if (data.length) {
//         data.forEach((el) => {
//             let div = createElement('div', 'w-[218px] py-[15px] px-[10px] bg-[#F8FAFD] hover:bg-[#dfe9ff] flex justify-between items-center rounded-[4px]', `
//                             <div>
//                                 <p class="font-semibold">${el?.volumeInfo?.title}</p>
//                                 <p class="font-medium text-[13px] text-[#757881]">${el?.volumeInfo?.authors}</p>
//                             </div>
//                             <div class="flex gap-3">
//                                 <a href="${el.volumeInfo.previewLink}" target="_blanc" class="text-[20px] cursor-pointer"><i class="text-[#75828A] bi bi-book"></i></a>
//                                 <span data-del="${el.id}" class="del-btn text-[20px] cursor-pointer"><i class="text-red-600 bi bi-trash"></i></span>
//                             </div>
//             `)
//             bookmarkWrapper.appendChild(div)
//         })
//     }
// }
// renderBookmarkList(bookmarkList)

