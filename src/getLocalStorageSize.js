
// let localStorageSize=null;

// function getLocalStorageSize(){
//     if (localStorageSize!==null) return localStorageSize;

//     localStorageSize=0;

//     let dataChunk="0".repeat(10223);
//     let keys=[];
//     let count=0;
//     try {
//         while (count<1000){
//                 const key='wab-calcsize'+String(count++).padStart(5,'0');
//                 localStorage.setItem(key, dataChunk);
//                 keys.push(key);
//         }
//     } catch (e) {
//     }

//     keys.forEach( key => {
//         localStorageSize+=10000+key.length;
//         localStorage.removeItem(key);
//     });

//     for (let i=0;i<localStorage.length;i++){
//         const key = localStorage.key(i);
//         localStorageSize+=key.length+localStorage.getItem(key).length;
//     }
    
//     return localStorageSize;
// }

function getUsedSpace(){
    let storageUsed=0;
    try {
        for (let i=0;i<localStorage.length;i++){
            const key = localStorage.key(i);
            storageUsed+=key.length+localStorage.getItem(key).length;
        }
    } catch (e) {
    }
    return storageUsed;
}

export {getUsedSpace};
