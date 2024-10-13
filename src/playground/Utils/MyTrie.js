class TrieNode {
  links = {};
  flag = false;
  wordCount = 0;
  count = 0;
  getLink(ch) {
    return this.links[ch];
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
  getCount() {
    return this.count;
  }
  setCount(c) {
    this.count = c;
  }
  getWordCount() {
    return this.wordCount;
  }
  setWordCount(c) {
    this.wordCount = c;
  }
}

var Trie = function () {
  this.root = new TrieNode();
};
Trie.prototype.insert = function (word) {
  let pivot = this.root;
  for (let i = 0; i < word.length; i++) {
    if (!pivot.getLink(word[i])) {
      pivot.setLink(word[i], new TrieNode());
    }
    pivot = pivot.getLink(word[i]);
    pivot.setCount(pivot.getCount() + 1);
  }
  pivot.setFlag(true);
  pivot.setWordCount(pivot.getWordCount() + 1);
};
Trie.prototype.search = function (word) {
  let pivot = root;
  for (let i = 0; i < word.length; i++) {
    if (!pivot.getLink(word[i])) {
      return false;
    }
    pivot = pivot.getLink(word[i]);
  }
  return !!pivot.getFlag();
};
Trie.prototype.searchPrefix = function (word) {
  let pivot = root;
  for (let i = 0; i < word.length; i++) {
    if (!pivot.getLink(word[i])) {
      return false;
    }
    pivot = pivot.getLink(word[i]);
  }
  return true;
};
Trie.prototype.countWordsEqualTo = function (word) {
  let pivot = this.root;
  for (let i = 0; i < word.length; i++) {
    if (!pivot.getLink(word[i])) {
      return 0;
    }
    pivot = pivot.getLink(word[i]);
  }
  return pivot.getWordCount();
};
Trie.prototype.countWordsStartingWith = function (word) {
  let pivot = this.root;
  for (let i = 0; i < word.length; i++) {
    if (!pivot.getLink(word[i])) {
      return 0;
    }
    pivot = pivot.getLink(word[i]);
  }
  return pivot.getCount();
};
Trie.prototype.erase = function (word) {
  let pivot = this.root;
  let nodes = [];
  for (let i = 0; i < word.length; i++) {
    nodes.push(pivot);
    pivot = pivot.getLink(word[i]);
    if (!pivot) return;
  }
  pivot.setWordCount(pivot.getWordCount() - 1);
  for (let i = word.length - 1; i >= 0; i--) {
    let node = nodes[i].getLink(word[i]);
    node.setCount(node.getCount() - 1);
    if (node.getCount() == 0) {
      delete node.links[word[i]];
    }
  }
};
