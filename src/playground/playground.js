function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateUniqueRandomArray(length, min, max) {
  const uniqueNumbers = Array.from({ length }, (_, index) => index + min);
  shuffleArray(uniqueNumbers);
  return uniqueNumbers.slice(0, length);
}

const minNumber = 1;
const maxNumber = 100;
const arrayLength =20000;

let randomArray = generateUniqueRandomArray(arrayLength, minNumber, maxNumber);

const playground = (vertex, connections) => {
  const getNewArr = () => new Array(vertex).fill(0)
  const graph = new Array(vertex);
  for(var i = 0; i< graph.length; i++) {
    graph[i] = getNewArr()
  }
  for(var c = 0; c < connections.length; c++) {
    const {to, from, isDirected} = connections[c];
    if(isDirected) {
      graph[from][to] = 1;
    } else {
      graph[from][to] = 1;
      graph[to][from] = 1;
    }
  }
  console.log(graph)
}

const vertex = 5;
const connections = [
  {
    from: 0,
    to: 1,
    isDirected: true,
  },
  {
    from: 1,
    to: 3,
    isDirected: true,
  },
  {
    from: 1,
    to: 4,
    isDirected: true,
  },
  {
    from: 2,
    to: 0,
    isDirected: true,
  },
  {
    from: 2,
    to: 1,
    isDirected: true,
  },
  {
    from: 2,
    to: 3,
    isDirected: true,
  },
  {
    from: 4,
    to: 3,
    isDirected: true,
  }

]
playground(vertex, connections);
