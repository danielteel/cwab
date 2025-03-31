import { useReducer } from "react";

function sortReducer(state, key){
    if (key===state.key){
        if (state.dir===1){
            return {key, dir: -1};
        }
        return {key: null, dir: 0};
    }
    return {key, dir: 1};
}

function matchSort(sortObj, key){
    if (sortObj && sortObj.key===key){
        return sortObj.dir>0?'ascending':'descending';
    }
    return null;
}

function getSortedList(sorted, sortDetails, list, sortGetterArgs){
    if (!Array.isArray(list)) return list;
    const listCopy=[...list];
    if (sorted.key!==null){
        const sortDetail=sortDetails.find( details => details.key===sorted.key);
        if (sortDetail){
            listCopy.sort( (a, b) => {
                let aVal, bVal;
                if (typeof sortDetail.getter==='function'){
                    aVal=sortDetail.getter(a, ...sortGetterArgs);
                    bVal=sortDetail.getter(b, ...sortGetterArgs);
                }else{
                    aVal=a[sorted.key];
                    bVal=b[sorted.key];
                }
                if (sortDetail.type==='number'){
                    return sorted.dir * (Number(aVal) - Number(bVal));
                }else if (sortDetail.type==='string'){
                    return sorted.dir * String(aVal).localeCompare(String(bVal));
                }else if (sortDetail.type==='date'){
                    return sorted.dir * (new Date(aVal) - new Date(bVal));
                }
                console.warn("useSorted: attempting to sort with unknown sort type '"+sortDetail.type+"'");
                return 0;
            });
        }
    }
    return listCopy;
}

function useSorted(sortDetails, items, ...sortGetterArgs){
    const [sorted, sortedDispatch] = useReducer(sortReducer, {key: null, dir: 0});

    return [getSortedList(sorted, sortDetails, items, sortGetterArgs), sortedDispatch, matchSort.bind(null, sorted)]
}

export {useSorted};