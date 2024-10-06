class TrieNode {
    links = {};
    flag = false;
    getLink(ch) {
        return this.links[ch]
    }
    setLink(ch, node) {
        this.links[ch] = node;
    }
    getFlag() {
        return this.flag;
    }
    setFlag(f) {
        this.flag = f;
    }
  }
  
  var Trie = function() {
    this.root = new TrieNode();
  }
  Trie.prototype.insert = function(bitStr) {
    let pivot = this.root;
    for(let i= 0; i<bitStr.length; i++) {
        if(!pivot.getLink(bitStr[i])) {
            pivot.setLink(bitStr[i], new TrieNode())
        }
        pivot = pivot.getLink(bitStr[i]);
    }
  }
  Trie.prototype.getMax = function(bitStr) {
    let pivot = this.root;
    let finalBitStr = '';
    for(let i = 0; i<bitStr.length; i++) {
        if(bitStr[i] == '1') {
            if(!!pivot.getLink('0')) {
                finalBitStr = `${finalBitStr}1`;
                pivot = pivot.getLink('0')
            } else if(!!pivot.getLink('1')) {
                finalBitStr = `${finalBitStr}0`;
                pivot = pivot.getLink('1')
            }
        } else if(bitStr[i] == '0') {
            if(!!pivot.getLink('1')) {
                finalBitStr = `${finalBitStr}1`;
                pivot = pivot.getLink('1')
            } else if(!!pivot.getLink('0')) {
                finalBitStr = `${finalBitStr}0`;
                pivot = pivot.getLink('0')
            }
        }
    }
    return parseInt(finalBitStr, 2);
  }
  

const findMaximumXOR = (nums, queries) => {
    let final = [];
    nums.sort((a,b) => a-b);
    let indexedQueries = queries.map((query, index) => [...query, index]);
    indexedQueries.sort((a, b) => a[1] - b[1]); // sort by limit
    let numIndex = 0;
    let trie = new Trie();
    for(let i = 0; i < indexedQueries.length; i++) {
        let [numToXor, limit, originalIndex] = indexedQueries[i];
        while(numIndex < nums.length && nums[numIndex] <= limit){
            let bitStr = nums[numIndex].toString(2).padStart(32, '0');
            trie.insert(bitStr);
            numIndex++
        } 
        if(numIndex == 0) {
            final[originalIndex] = -1
        }  else {
            let numToXorBitstr = numToXor.toString(2).padStart(32, '0');
            let max = trie.getMax(numToXorBitstr)
            final[originalIndex] = max != undefined ? max : -1
        } 
    }
    return final
}

console.log(findMaximumXOR([0,1,2,3,4],[[3,1],[1,3],[5,6]]))