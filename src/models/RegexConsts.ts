export const ONLY_LETTERS_ON_STRING = /^[A-Za-z ]+$/i
export const ONLY_NUMBERS_ON_STRING = /^[0-9]+$/i ;
export const ONLY_LETTERS_AND_NUMBERS_ON_STRING = /^[A-Za-z0-9 ]*$/i
export const ONLY_NUMBER_WITH_DECIMALS_ON_STRING = /^[1-9]\d*(\.\d+)?$/ ;
export const ONLY_NUMBER_WITH_TWO_DECIMALS_ON_STRING=/^\d+(\.\d{1,2})?$/;

export const DATE_FORMAT = /^(0[1-9]|[12][0-9]|3[01])[- /.] (0[1-9]|1[012])[- /.] (19|20)\d\d$ /i;
export const DATE_FORMAT_2 =/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/i;