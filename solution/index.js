module.exports = function (Homework) {

    return (array, fn, initialValue, cb) => {
        
        let result = initialValue

        let getLength = new Promise((resolve) => {
            array.length((len) => {
                resolve(len)
            })
        })

        getLength.then(
            async (len) => {

                let i
                let zero = new Promise((resolve) => {
                    Homework.subtract(len, len, (res) => {
                        i = res
                        resolve()
                    })
                })
                await zero
                let notEOA
                let fls = new Promise(resolve => {
                    Homework.less(len, i, (res) => {
                        notEOA = res
                        resolve()
                    })
                })
                await fls
                let isLess = new Promise((resolve) => {
                    Homework.less(i, len, (val) => {
                        notEOA = val

                        resolve()
                    })
                })
                isLess.then(() => {
                    return new Promise(async resolve => {
                        while(notEOA) {
                            let getCurr = new Promise((resolve) => {
                                array.get(i, (elem) => {
                                    resolve(elem)
                                })
                            })
                            let oper = getCurr.then((elem) => {

                                return new Promise((resolve) => {
                                    fn(result, elem, i, array, (operRes) => {
                                        result = operRes
                                        resolve()
                                    })
                                })
                            })
                            oper.catch((err) => {
                                console.log(err)
                            })

                            let inc = new Promise((resolve) => {
                                Homework.add(i, 1, (val) => {
                                    i = val
                                    resolve(i)
                                })
                            })
                            let isLess = inc.then((i) => {
                                return new Promise((resolve) => {
                                    Homework.less(i, len, (val) => {
                                        notEOA = val
                                        resolve()
                                    })
                                })
                            })
                            await Promise.all([oper, isLess])
                        }
                        resolve()
                    })
                }).then(() => {
                    cb(result)
                })

            }
        )
    }
}
