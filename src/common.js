const momentSimplifier=1000;

function realNumber(string){
    let real = Number(string);
    if (!isFinite(real)) real=0;
    return real;
}

function toMAC(arm){
    return Math.round((100*(Number(arm)-487.4))/164.5*10)/10;
}

function calcArm(weight, moment, divider=100){
    return formatArm((formatMoment(moment)*momentSimplifier)/formatWeight(weight), divider);
}

function calcMoment(weight, arm){
    return formatMoment((Number(weight)*Number(arm))/momentSimplifier);
}

function formatArm(arm, divider=100){
    arm=realNumber(arm);
    return Math.round(arm*divider)/divider;
}

function formatWeight(weight){
    weight=realNumber(weight);
    return Math.round(weight*100)/100;
}

function formatMoment(moment){
    return Math.round(realNumber(moment)*10000)/10000;
}

function isAboutEquals(a,b, smallestDiff=0.0000001){
    a=realNumber(a);
    b=realNumber(b);
    if (Math.abs(a-b)<smallestDiff){
        return true;
    }
    return false;
}

function displayVal(number, decimal=0){
    number=Number(number);
    if (!isFinite(number)) number=0;

    let formatted;
    if (decimal>=0){
        formatted=number.toFixed(decimal);
    }else{
        formatted=number;
        for (let i=0;i>decimal;i--){
            formatted/=10;
        }
        formatted=Math.round(formatted);
        for (let i=0;i>decimal;i--){
            formatted*=10;
        }
    }
    return formatted;
}

function getUniqueId(arrayOfObjs, property){
    let newKey = 0;
    try {
        for (const item of arrayOfObjs){
            let currentKey = Number(item[property]);
            if (!isFinite(currentKey)) currentKey = 0;
            if (newKey<=currentKey) newKey = currentKey+1;
        }
    } catch {
    }
    return newKey;
}

function isGoodObject(obj){
    return !(typeof obj!=='object' || Array.isArray(obj) || obj===null);
}



export {toMAC, calcArm, calcMoment, realNumber, formatArm, formatWeight, formatMoment, isAboutEquals, displayVal, getUniqueId, isGoodObject, momentSimplifier};