if(true === process.env.DEV) {
    require("@khanacademy/tota11y/dist/tota11y.min.js")
}

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('done!');
    }, 1000)
})

promise.then(res => {
    console.log(res)
})