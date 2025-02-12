// Time date
function getDayTime(input) {
    // Get year
    const year = parseInt(input / 31536000);
    let remainingSecond = input % 31536000;

    // Get month
    const month = parseInt(remainingSecond / 2628288);
    remainingSecond %= 2628288;

    // Get day
    const day = parseInt(remainingSecond / 86400);
    remainingSecond %= 86400;

    // Get hour
    const hour = parseInt(remainingSecond / 3600);
    remainingSecond %= 3600;

    // Get minutes
    const minutes = parseInt(remainingSecond / 60);
    const seconds = remainingSecond % 60;

    // Create an array to store non-zero values
    let timeParts = [];

    // Push only non-zero values into the array
    if (year > 0) timeParts.push(`${year} year`);
    if (month > 0) timeParts.push(`${month} month`);
    if (day > 0) timeParts.push(`${day} day`);
    if (hour > 0) timeParts.push(`${hour} hour`);
    if (minutes > 0) timeParts.push(`${minutes} minutes`);
    if (seconds > 0) timeParts.push(`${seconds} second`);

    // Join the array into a string
    return timeParts.length > 0 ? timeParts.join(" ") + " ago" : "Just now";
}


// 1. fetch, load and show categories in html



// create new categories
const loadCategories = () => {
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res) => res.json())
        .then(data => displayCategories(data.categories))
        .catch((error) => console.log(error))
}

// Load Videos
const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then((res) => res.json())
        .then((data) => displayVideos(data.videos))
        .catch((error) => console.log(error))
}


// const cardDemo = {
//     category_id: "1003",
//     video_id: "aaaf",
//     thumbnail: "https://i.ibb.co/5LRQkKF/stick-and-stones.jpg",
//     title: "Sticks & Stones",
//     authors: [
//         {
//             profile_picture: "https://i.ibb.co/rdTZrCM/dev.jpg",
//             profile_name: "Dave Chappelle",
//             verified: true
//         }
//     ],
//     others: {
//         views: "113K",
//         posted_date: ""
//     },
//     description: "Dave Chappelle's 'Sticks & Stones' has garnered 113K views and remains a controversial yet highly engaging piece of stand-up comedy. Known for his fearless approach, Dave dives into a wide range of topics, delivering his unique perspective with wit and sharp humor. As a verified artist, Dave's comedy is raw, honest, and unapologetically funny."
// }

// another function for displaying videos
const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos')
    videos.forEach(video => {
        console.log(video);
        const card = document.createElement("div");
        card.classList = "card card-compact rounded-none"
        card.innerHTML = `
        <figure class="h-[200px] rounded-lg relative">
            <img class="h-full w-full object-cover" src=${video.thumbnail}
            alt="Shoes" />
            ${video.others.posted_date?.length == 0 ? " " : ` <span class="absolute bg-gray-900 text-white p-1 rounded-md right-2 bottom-2">${getDayTime(video.others.posted_date)}</span>`}

        </figure>
        <div class="px-0 py-2 flex gap-2">
            <div>
                <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}/>
            </div>
            <div>
                <h2 class="font-bold">${video.title}</h2>
                <div class="flex justify-start items-center gap-3">
                    <p class="text-gray-500 font-semibold">${video.authors[0].profile_name}</p>
                    ${video.authors[0].verified == true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"/>` : " "}
                </div>
            </div >
        </div >
    `;
        videoContainer.append(card);
    })
}


/**
 * {
    "category_id": "1001",
    "category": "Music"
    }
 */

// create displayCategories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories')

    categories.forEach((item) => {
        console.log(item)

        // create a button
        const button = document.createElement('button');
        button.classList = "btn"
        button.innerText = item.category;

        // add button to category container
        categoryContainer.append(button)
    });

}


loadCategories()
loadVideos()