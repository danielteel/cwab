import {Tokenizer, TokenType} from '@dteel/gpdsl';

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


const markUpScriptCache=[];
let markUpSpanKeyIndex=0;
function markUpScript(chartObj){
    if (markUpScriptCache[chartObj.name]){
        return markUpScriptCache[chartObj.name];
    }
    const code=chartObj.script;
    const tab='   ';
    const space=' ';
    const output=[];
    let indentLevel=0;
    const tokenizer=new Tokenizer();
    const tokenList=tokenizer.tokenize(code);
    const newLine = () => {
        output.push('\n');
        for (let i=0;i<indentLevel;i++){
            output.push(tab);
        }
    }
    const outputTextWithColor = (text, color) => {
        output.push(<span key={"colorSpan"+markUpSpanKeyIndex++} style={{color: color}}>{text}</span>);
    }
    const outputText = (text) => {
        output.push(text);
    }
    const outputOp = (text)=>{
        if (output.length-1 >= 0){
            if (output[output.length-1]===space){
                output.pop();
            }
        }
        outputText(text);
    }
    const outputElse = () => {
        let popTo=null;
        for (let i=output.length-1; i>=0 ; i--){
            if (typeof output[i]!=="string" || (output[i].trim()!=="" && output[i]!=='}')){
                outputTextWithColor('else', '#90090');
                outputText(space);
                return;
            }
            if (output[i]==='}') break;
            popTo=i;
        }
        for (;output.length>popTo; output.pop());
        outputTextWithColor('else', '#900090');
        outputText(space);
    }
    for (const token of tokenList){
        switch (token.type){
            case TokenType.LineDelim:
                outputOp(';');
                newLine();
                break;
            case TokenType.NewLine:
                break;
            case TokenType.Double:
                outputTextWithColor('double', '#0000FF');
                outputText(space);
                break;
            case TokenType.String:
                outputTextWithColor('string', '#0000FF');
                outputText(space);
                break;
            case TokenType.Bool:
                outputTextWithColor('bool', '#0000FF');
                outputText(space);
                break;
         
            case TokenType.DoubleLiteral:
                outputTextWithColor(String(token.value), '#995050');
                break;

            case TokenType.StringLiteral:
                if (token.value.includes('"')){
                    outputTextWithColor("'"+token.value+"'", '#009900');
                }else{
                    outputTextWithColor('"'+token.value+'"', '#009900');
                }
                break;
            case TokenType.Ident:
                outputTextWithColor(token.value, '#4090D0');
                outputText(space);
                break;
         
            case TokenType.True:
                outputTextWithColor('true', '#995050');
                break;
            case TokenType.False:
                outputTextWithColor('false', '#995050');
                break;
            case TokenType.Null:
                outputTextWithColor('null', '#995050');
                break;
         
            case TokenType.LeftParen:
                outputOp('(');
                break;
            case TokenType.RightParen:
                outputOp(')');
                outputText(space);
                break;
            case TokenType.LeftSqaure:
                outputOp('[');
                break;
            case TokenType.RightSqaure:
                outputOp(']');
                break;
         
            case TokenType.Comma:
                outputOp(', ');
                break;
            case TokenType.Dot:
                outputOp('.');
                break;
         
            case TokenType.Not:
                outputOp('!');
                break;
            case TokenType.And:
                outputOp(' && ');
                break;
            case TokenType.Or:
                outputOp(' || ');
                break;
            case TokenType.Plus:
                outputOp('+');
                break;
            case TokenType.Minus:
                outputOp('-');
                break;
            case TokenType.Divide:
                outputOp('/');
                break;
            case TokenType.Multiply:
                outputOp('*');
                break;
            case TokenType.Mod:
                outputOp('%');
                break;
            case TokenType.Exponent:
                outputOp('^');
                break;
         
            case TokenType.Question:
                outputOp('?');
                break;
            case TokenType.Colon:
                outputOp(':');
                break;
         
            case TokenType.Assignment:
                outputOp('=');
                break;
            case TokenType.Equals:
                outputOp('==');
                break;
            case TokenType.NotEquals:
                outputOp('!=');
                break;
            case TokenType.Lesser:
                outputOp('<');
                break;
            case TokenType.Greater:
                outputOp('>');
                break;
            case TokenType.LesserEquals:
                outputOp('<=');
                break;
            case TokenType.GreaterEquals:
                outputOp('>=');
                break;
         
            case TokenType.Min:
                outputTextWithColor('min', '#C05050');
                break;
            case TokenType.Max:
                outputTextWithColor('max', '#C05050');
                break;
            case TokenType.Abs:
                outputTextWithColor('abs', '#C05050');
                break;
            case TokenType.Clamp:
                outputTextWithColor('clamp', '#C05050');
                break;
            case TokenType.Floor:
                outputTextWithColor('floor', '#C05050');
                break;
            case TokenType.Ceil:
                outputTextWithColor('ceil', '#C05050');
                break;
         
            case TokenType.LCase:
                outputTextWithColor('lcase', '#C05050');
                break;
            case TokenType.UCase:
                outputTextWithColor('ucase', '#C05050');
                break;
            case TokenType.Trim:
                outputTextWithColor('trim', '#C05050');
                break;
            case TokenType.Len:
                outputTextWithColor('len', '#C05050');
                break;
            case TokenType.SubStr:
                outputTextWithColor('substr', '#C05050');
                break;
         
            case TokenType.While:
                outputTextWithColor('while ', '#900090');
                break;
            case TokenType.For:
                outputTextWithColor('for ', '#900090');
                break;
            case TokenType.Loop:
                outputTextWithColor('loop ', '#900090');
                break;
            case TokenType.If:
                outputTextWithColor('if ', '#900090');
                break;
            case TokenType.Else:
                outputElse();
                break;
            case TokenType.Break:
                outputTextWithColor('break', '#900090');
                break;
            case TokenType.LeftCurly:
                outputText('{');
                indentLevel++;
                newLine();
                break;
            case TokenType.RightCurly:
                if (output[output.length-1]===tab) output.pop();
                outputText('}');
                indentLevel--;
                newLine();
                break;
         
            case TokenType.Return:
                outputTextWithColor('return', '#D08070');
                outputText(space);
                break;
            case TokenType.Exit:
                outputTextWithColor('exit', '#D08070');
                outputText(space);
                break;
            default:
                break;
        }
    }
    
    let simplified=[];
    let accum="";
    for (let val of output){
        if (typeof val==="string"){
            accum+=val;
        }else{
            simplified.push(accum);
            accum="";
            simplified.push(val);
        }
    }
    if (accum.trim().length) simplified.push(accum);

    markUpScriptCache[chartObj.name]=<pre>{simplified}</pre>;
    return markUpScriptCache[chartObj.name];
}

export {toMAC, calcArm, calcMoment, realNumber, formatArm, formatWeight, formatMoment, isAboutEquals, displayVal, getUniqueId, isGoodObject, momentSimplifier, markUpScript};