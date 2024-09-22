splitByOuterCommas = (str) => {
    let parts = [];
    let lastSplit = 0, parenthesis = 0
    for(let i = 0; i < str.length; i++) {
        if(str.charAt(i)=='(') {
            parenthesis++;
        } 
        else if(str.charAt(i) == ')') {
            parenthesis--;
        } else if(str.charAt(i) == ',' && parenthesis == 0) {
            parts.push(str.substring(lastSplit, i));
            lastSplit = i+1;
        }
    }
    parts.push(str.substring(lastSplit));
    return parts
}
var parseBoolExpr = function(expression) {
    let dp = {};
    const _calc = (str) => {
        if(str == 'f') return false;
        if(str == 't') return true;
        if(dp[str] != undefined) return dp[str]
        if(['!'].includes(str.charAt(0))) {
            let subExpression = str.substring(2, str.length - 1);
            dp[str] = !_calc(subExpression); return  dp[str]
        }
        if(['&', '|'].includes(str.charAt(0))) {
            let subExpressions = splitByOuterCommas(str.substring(2, str.length-1))
            if(str.charAt(0) == '|') {
                dp[str]= subExpressions.reduce((acc, curr) => (acc || _calc(curr)), false);
                return  dp[str];
            }
            if(str.charAt(0) == '&') {
                dp[str] = subExpressions.reduce((acc, curr) => (acc && _calc(curr)), true);
                return  dp[str];
            }
        }
    }
    return _calc(expression)
};

console.log(parseBoolExpr('|(&(t,f,t),!(t))'))