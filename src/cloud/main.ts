// cloud function defined here

// Parse.Cloud.define("averageStars", async function (request, response) {
//     const query = new Parse.Query("Review");
//     let results
//     try {
//         results = await query.equalTo("movie", request.params.movie).find()
//     } catch (e) {
//         response.error("movie lookup failed");
//     }
//     let sum = 0
//     for (let i = 0; i < results.length; ++i) {
//         sum += results[i].get("stars")
//     }
// });