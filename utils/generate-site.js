const fs = require('fs')


const writeFile = fileContent => {
    return new Promise((resolve, reject)=> {
        fs.writeFile('./dist/index.html', fileContent, err =>{
            //if there is an error, reject the Promis and send the error to the promise's '.catch()'
            if(err) {
                reject(err);
                //return out of the function here to make sure the Promise doesn't accidentally run the resolve function as well
                return;
            }
            //if everything went well, resolve the Promise and send the successful data tp tje '.then()' method
            resolve({
                ok:true,
                message: 'File created'
            })
        })
    })
}

const copyFile = () => {
    return new Promise((resolve, reject)=> {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
        if(err) {
            reject(err);
            return;
        }
        resolve({
            ok:true,
            message: 'Stylesheet copied'
        })
    })
})
}
module.exports = {writeFile, copyFile }