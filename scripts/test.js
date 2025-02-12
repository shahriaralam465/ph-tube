// const isVarified = true;
// // if (isVarified == true){
// //     console.log("user is varified")
// // }
// // else{
// //     console.log("user is not varied")
// // }


// console.log(`${isVarified === true? "user is verified" : "user isn't verified" }`)


function getTimeString(time){
    // get hour and rest seconds
    const hour = parseInt(time/3600);
    let remainingSecond = time % 3600;
    const minutes = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ago ${minutes} minutes ago ${remainingSecond} second ago`
}

// console.log(getTimeString(7865))



function getDayTime(input){

    // get year
    const year = parseInt(input /31536000);
    let remainingSecond = input % 31536000;
    // get month
    const month = parseInt(remainingSecond / 2628288);
    remainingSecond = remainingSecond % 2628288;

    // get day
    const day = parseInt(remainingSecond/ 86400);
    remainingSecond = remainingSecond % 86400;

    // get hour 
    const hour = parseInt(remainingSecond/3600);
    remainingSecond = remainingSecond % 3600;

    // get minutes 
    const minutes = parseInt(remainingSecond/ 60);
    const seconds = remainingSecond % 60;




    // return `${year} year ${month} month  ${day} day ${hour} hour ${minutes} minutes ${remainingSecond} second ago`

    // create an array to store non-zero values into the array
    let timeParts = [];

    // pushing only non-zero values into the array


    if(year > 0) timeParts.push(`${year} year`)
    if(month > 0) timeParts.push(`${month }mo`)
    if(day > 0) timeParts.push(`${day}d`)
    if(hour > 0) timeParts.push(`${hour} h`)
    if(minutes > 0) timeParts.push(`${minutes} m`)
    if(seconds > 0) timeParts.push(`${year} seconds`)

    return timeParts.length > 0 ? timeParts.join(" ")+ " ago" : "Just Now";
}

console.log(getDayTime(1672656000));