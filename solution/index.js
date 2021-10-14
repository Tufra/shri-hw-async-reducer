module.exports = function (Homework) {

    return (array, fn, initialValue, cb) => {
        // добро пожаловать в Callback Hell
        // твой побег начинается прямо сейчас...

        let result = initialValue

        let getLength = new Promise((resolve) => {
            array.length((len) => {
                resolve(len)
            })
        })
        getLength.then(
            async (len) => {
                //console.log('len: ' + len)
                for (let i = 0; i < len; i++) {
                    let getCurr = new Promise((resolve, reject) => {
                        array.get(i, (elem) => {
                            resolve(elem)
                        })
                    })
                    getCurr.catch((err) => {
                        console.log(err)
                    })
                    let oper = getCurr.then((elem) => {
                            //console.log(`elem: ${elem}`)
                            return new Promise(resolve => {
                                fn(result, elem, i, array, (operRes) => {
                                    result = operRes
                                    resolve()
                                })
                            })
                        },
                        (err) => {
                            console.log(err)
                        }
                    )
                    oper.catch((err) => {
                        console.log(err)
                    })
                    await oper
                }
            },
            (err) => {
                console.log(err)
            }
        ).then(() => {
                cb(result)
            },
            (err) => {
                console.log(err)
            }
        )

    }
}
