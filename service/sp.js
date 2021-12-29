const data = require('./data/res.json')

const predict = (input,callback) => {
    let i =-1;
    if(input instanceof Array){
        let t=0
        input.forEach(np=>{
            data.forEach(element => {
                element.input.forEach(el => {
                    if (el == np) {
                        callback(element)
                    }
                });
            }
            )
            t++;
            if(np.length == t){
                return 0;
            }
        })
    }else{
        let t=0
        data.forEach(element => {
            element.input.forEach(el => {
                if (el == input) {
                    callback(element)
                }
            });
            t++;
            if(data.length == t){
                return 0;
            }
        });
    }
    return i;
}

module.exports = {
    predict
}
