"use strict";

let logOut = $('#logout');
let booksWrapper = $('.books-wrapper');

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

let baseURL = 'https://www.googleapis.com/books/v1/volumes?q=harry&startIndex=1'

async function render() {
    try {
        let response = await fetch(`${baseURL}`)
        let result = await response.json()
        renderAllBooks(result)
    } catch(err) {
        console.log(err);
    }
}
render()

function renderAllBooks(data) {
    console.log(data);
    if (data.items.length) {
        data.items.forEach((el) => {
            let div = createElement('div', 'w-[282px] h-[431px] rounded-[5px] bg-white py-[13px] px-[17px]', `
                                    <div class="grid place-content-center w-[249px] h-[238px] bg-[#F8FAFD] rounded-[5px] mb-[19px]">
                                        <img src="${el.volumeInfo.imageLinks.thumbnail}" alt="img">
                                    </div>
                                    <div>
                                        <p class="book-title font-semibold text-[18px]">${el.volumeInfo.title}</p>
                                        <span class="block text-[13px] text-[#757881]">${el.volumeInfo.authors}</span>
                                        <span class="block text-[13px] text-[#757881] mb-[10px]">${el.volumeInfo.publishedDate}</span>
                                        <div class="flex justify-between mb-[5px]">
                                            <button class="w-[120px] h-[37px] font-semibold text-[14px] bg-[#FFD80D] rounded-[4px]">Bookmark</button>
                                            <button class="w-[120px] h-[37px] font-semibold text-[14px] bg-[#0D75FF0D] rounded-[4px] text-[#0D75FF]">More Info</button>
                                        </div>
                                        <button class="w-full h-[37px] font-semibold text-[14px] bg-[#75828A] rounded-[4px] text-white">Read</button>
                                    </div>
            `)
            booksWrapper.appendChild(div)
        })
    } else {
        booksWrapper.innerHTML = "Not found"
    }
}
