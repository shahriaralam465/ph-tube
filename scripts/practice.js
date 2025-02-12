/**
 * 1. Fetch, load and show categories on html
 * 2. get categories form displayCategories
 * 3. get separately all item by using forEach
 * 4. create button and and set there inner text form object
 * 5. append those button in a div or nav
 * 6. load videos form API
 * 7. get the video from api by dot notation
 * 8. for displaying video array (Create another function and call the function form here)
 * 9. separate all videos form array by using forEach loop
 * 10. create a card for showing videos & append those in videoContainer
 * 11. add details for every video box use dynamically 
 * 12. add a badge which are verified by API
 * 13. add Posted date using another function
 * 14. make button dynamic
 * 15. delete already loaded data
 * 16. Add empty section content 
 * 17. add button dynamically changes there color
 * 18. create a button which will show the description of video (This will come from video id)
 * 
 */


// demo object
const objDemo = {
    category_id: "1001",
    video_id: "aaab",
    thumbnail: "https://i.ibb.co/QPNzYVy/moonlight.jpg",
    title: "Midnight Serenade",
    authors: [
        {
            profile_picture: "https://i.ibb.co/fDbPv7h/Noha.jpg",
            profile_name: "Noah Walker",
            verified: false
        }
    ],
    others: {
        views: "543K",
        posted_date: ""
    },
    description: "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
}


// Format time
function getDayTime(input) {

    // get year
    const year = parseInt(input / 31536000);
    let remainingSecond = input % 31536000;
    // get month
    const month = parseInt(remainingSecond / 2628288);
    remainingSecond = remainingSecond % 2628288;

    // get day
    const day = parseInt(remainingSecond / 86400);
    remainingSecond = remainingSecond % 86400;

    // get hour 
    const hour = parseInt(remainingSecond / 3600);
    remainingSecond = remainingSecond % 3600;

    // get minutes 
    const minutes = parseInt(remainingSecond / 60);
    const seconds = remainingSecond % 60;




    // return `${year} year ${month} month  ${day} day ${hour} hour ${minutes} minutes ${remainingSecond} second ago`

    // create an array to store non-zero values into the array
    let timeParts = [];

    // pushing only non-zero values into the array


    if (year > 0) timeParts.push(`${year} year`)
    if (month > 0) timeParts.push(`${month}mo`)
    if (day > 0) timeParts.push(`${day}d`)
    if (hour > 0) timeParts.push(`${hour} h`)
    if (minutes > 0) timeParts.push(`${minutes} m`)
    if (seconds > 0) timeParts.push(`${seconds} secs`)

    return timeParts.length > 0 ? timeParts.join(" ") + " ago" : "Just Now";
}
// remove active class
const removeActive = () => {
    const buttons = document.getElementsByClassName('category-btn');
    console.log(buttons);
    for (let btn of buttons) {
        btn.classList.remove("bg-red-500")
        btn.classList.remove("text-white")
    }
}




//Create load categories
const loadCategories = () => {
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error))

}
// load videos
const loadVideos = (searchText = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then((res) => res.json())
        .then((data) => displayVideos(data.videos))
        .catch((error) => console.log(error))

}


// load video category ways
const loadCategoryVideos = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            // remove active class from all
            removeActive();


            const activeBtn = document.getElementById(`btn-${id}`);
            // add active effect
            // activeBtn.classList = ("btn bg-red-500 text-white");
            activeBtn.classList.add('bg-red-500')
            activeBtn.classList.add('text-white')
            console.log(activeBtn);
            displayVideos(data.category);
        })
        .catch((error) => console.log(error))
}

// loading description
const loadDescription = async (videoId) => {
    console.log(videoId)
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.video);
}

// for displaying description
const displayDetails = (video) => {
    console.log(video);
    const detailsContainer = document.getElementById('modal-content');
    detailsContainer.innerHTML = `
        <div class="flex flex-col gap-2">
            <img class="w-full h-full object-cover rounded-lg" src="${video.thumbnail}"/>
            <div class="flex justify-start gap-2 items-center">
                <div>
                    <img class="w-20 h-20 rounded-full object-cover border-2 border-red-500" src=${video.authors[0].profile_picture}/>
                </div>
                <div>
                    <h2 class="font-bold text-3xl text-black">${video.title}</h2>
                    <h3 class="font-medium text-lg">${video.authors[0].profile_name}</h3>
                </div>
            </div>
            <hr class="my-2"/>
            <p class="text-gray-500">${video.description}</p>
        </div>
    `

    // way1
    // document.getElementById('showModalData').click();


    // way -2
    document.getElementById('customModal').showModal();

}


// for displaying video array
/**
 * const displayVideos = (videos) => {

    // Sort videos by views before displaying
    videos.sort((a, b) => {
        const parseViews = (views) => {
            let num = parseFloat(views.split("K")[0].split("M")[0]); // Extract the number
            if (views.includes("M")) num *= 1000000; // Convert M to full number
            if (views.includes("K")) num *= 1000; // Convert K to full number
            return num;
        };
        return parseViews(b.others.views) - parseViews(a.others.views); // Descending order
    });



    const videoContainer = document.getElementById('videos');
    videoContainer.classList.remove('grid');
    videoContainer.innerHTML = "";

    if (videos.length == 0) {
        videoContainer.innerHTML = `
        <div class="w-full flex flex-col gap-5 justify-center items-center">
            <img src="./assets/icon.png"/>
            <h2 class="text-3xl font-bold text-center">OPPS!!</h2>
            <h2 class="text-3xl font-bold text-center">NO CONTENT HERE IN THIS CATEGORY</h2>
        </div>
        `;
        return;
    }
    else {
        videoContainer.classList.add("grid")
    }

    videos.forEach((video) => {
        // console.log(video)
        //    video card
        const card = document.createElement('div')
        card.classList = "card card-compact rounded-none"
        card.innerHTML = `
            <figure class="h-[200px] rounded-none relative">
                <img class="h-full w-full object-cover rounded-lg" src=${video.thumbnail}/>
                ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 bg-gray-800 text-white text-xs p-1 rounded-lg">${getDayTime(video.others.posted_date)}</span>`}
             </figure>
            <div class="px-0 py-2 flex justify-start gap-2">
                <div class="">
                    <img class="w-10 h-10 rounded-full object-cover border-2 border-red-500" src=${video.authors[0].profile_picture}/>
                </div>
                <div>
                    <h2 class="font-bold ">${video.title}</h2>
                    <div class="flex items-center gap-4">
                        <p class="text-gray-600">${video.authors[0].profile_name}</p>
                        ${video.authors[0].verified == true ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"/>` : " "}
                    </div>
                    <div class="flex justify-start items-center">
                        <p class="text-gray-500 text-xs">${video.others.views}</p>
                        <p><button onclick="loadDescription('${video.video_id}')" class="btn btn-xs btn-link">Details</button></p>
                    </div>
                </div>
            </div>
        `
        videoContainer.append(card)
    })
}
 */


const displayVideos = (videos) => {
    // Sort videos by views before displaying
    videos.sort((a, b) => {
        const parseViews = (views) => {
            let num = parseFloat(views.split("K")[0].split("M")[0]); // Extract the number
            if (views.includes("M")) num *= 1000000; // Convert M to full number
            if (views.includes("K")) num *= 1000; // Convert K to full number
            return num;
        };
        return parseViews(b.others.views) - parseViews(a.others.views); // Descending order
    });

    const videoContainer = document.getElementById('videos');
    videoContainer.classList.remove('grid');
    videoContainer.innerHTML = "";

    if (videos.length == 0) {
        videoContainer.innerHTML = `
        <div class="w-full flex flex-col gap-5 justify-center items-center">
            <img src="./assets/icon.png"/>
            <h2 class="text-3xl font-bold text-center">OPPS!!</h2>
            <h2 class="text-3xl font-bold text-center">NO CONTENT HERE IN THIS CATEGORY</h2>
        </div>
        `;
        return;
    } else {
        videoContainer.classList.add("grid");
    }

    videos.forEach((video) => {
        const card = document.createElement('div');
        card.classList = "card card-compact rounded-none";
        card.innerHTML = `
            <figure class="h-[200px] rounded-none relative">
                <img class="h-full w-full object-cover rounded-lg" src=${video.thumbnail}/>
                ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 bg-gray-800 text-white text-xs p-1 rounded-lg">${getDayTime(video.others.posted_date)}</span>`}
             </figure>
            <div class="px-0 py-2 flex justify-start gap-2">
                <div class="">
                    <img class="w-10 h-10 rounded-full object-cover border-2 border-red-500" src=${video.authors[0].profile_picture}/>
                </div>
                <div>
                    <h2 class="font-bold ">${video.title}</h2>
                    <div class="flex items-center gap-4">
                        <p class="text-gray-600">${video.authors[0].profile_name}</p>
                        ${video.authors[0].verified == true ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"/>` : " "}
                    </div>
                    <div class="flex justify-start items-center">
                        <p class="text-gray-500 text-xs">${video.others.views}</p>
                        <p><button onclick="loadDescription('${video.video_id}')" class="btn btn-xs btn-link">Details</button></p>
                    </div>
                </div>
            </div>
        `;
        videoContainer.append(card);
    });
};



//Create displayCategories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');

    categories.forEach((item) => {
        // console.log(item)

        // create a button
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
            <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
                ${item.category}
            </button>
        `

        // add button to container
        categoryContainer.append(buttonContainer);
    })


};




// search video
document.getElementById('search-input').addEventListener('keyup', (e) => {
    loadVideos(e.target.value)

});

// sort video by views
document.getElementById('sort').addEventListener('click', (e) => {
    loadVideos();
});

loadCategories()
loadVideos()