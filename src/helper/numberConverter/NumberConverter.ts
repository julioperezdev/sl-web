// export function converCommaToDot(numberWithComma:string):string{
//     return numberWithComma.replace(',','.')
// }

// export function converDotToComma(numberWithDot:string):string{
//     return numberWithDot.replace('.',',')
// }

// export function converCommaToDotReturningNumber(numberWithComma:string):number{
//     let replace = numberWithComma.replace(',','.')
//     return Number.parseFloat(replace);
// }

// export function converDotToCommaReturningString(numberWithDot:number):string{
//     if(numberWithDot == 0) return '0'
//     return numberWithDot.toString().replace('.',',')
// }

// export function converCommaToDotReturningNumberTwoDecimals(numberWithComma:string):number{
//     let converted = converCommaToDotReturningNumber(numberWithComma);
//     return Number.parseFloat(converted.toFixed(2));
// }

// export function converDotToCommaReturningStringTwoDecimals(numberWithDot:number):string{
//     let stringWithDotTwoDecimals = numberWithDot.toFixed(2);
//     return converDotToComma(stringWithDotTwoDecimals);
// }

export function converDotReturningNumberWithTwoDecimals(numberWithDot:number):number{
    return Math.round(numberWithDot*100)/100;
    // let stringWithDotTwoDecimals = numberWithDot.toFixed(2);
    // return Number.parseFloat(stringWithDotTwoDecimals);


}
export function convertCurrencyMask(currency:number):string{
    //const formatter = new Intl.NumberFormat('de-DE', {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    return formatter.format(currency);
}