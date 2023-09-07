/* eslint-disable max-classes-per-file */

function merge(leftSide, rightSide) {
  const temp = [];
  let lCounter = 0;
  let rCounter = 0;

  // Filter for duplicated value
  const filteredLeftSide = leftSide.filter(
    (element, index) => leftSide.indexOf(element) === index,
  );
  const filteredRightSide = rightSide.filter(
    (element, index) => rightSide.indexOf(element) === index,
  );
  let arraySize = filteredLeftSide.length + filteredRightSide.length;

  while (temp.length !== arraySize) {
    if (filteredLeftSide[lCounter] === filteredRightSide[rCounter]) {
      arraySize -= 1;
      rCounter += 1;
    } else if (
      filteredLeftSide[lCounter] < filteredRightSide[rCounter] ||
      filteredRightSide[rCounter] === undefined
    ) {
      temp.push(filteredLeftSide[lCounter]);
      lCounter += 1;
    } else if (
      filteredLeftSide[lCounter] > filteredRightSide[rCounter] ||
      filteredLeftSide[lCounter] === undefined
    ) {
      temp.push(rightSide[rCounter]);
      rCounter += 1;
    }
  }
  return temp;
}

function mergeSort(array) {
  if (array.length === 1) {
    return array;
  }

  const middle = Math.ceil(array.length / 2);

  const leftSide = mergeSort(array.slice(0, middle));
  const rightSide = mergeSort(array.slice(middle, array.length));

  return merge(leftSide, rightSide);
}

class Node {
  constructor(value) {
    this.data = value;
    this.leftChild = null;
    this.rightChild = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  buildTree(arr) {
    const sortedTree = mergeSort(arr);

    function balancedBST(array, start, end) {
      if (start > end) return null;

      const mid = Math.ceil((start + end) / 2);
      const currNode = new Node(array[mid]);

      currNode.leftChild = balancedBST(arr, start, mid -1 );
      currNode.rightChild = balancedBST(arr, mid + 1, end);

      return currNode;
    }

    this.root = balancedBST(sortedTree, 0, sortedTree.length - 1);

    return this.arr;
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const tree = new Tree();
tree.buildTree([1,3, 5,7,9,11,13,15]);

prettyPrint(tree.root)
const node1 = new Node('asd');
node1.leftNode = 'asd';
console.log(node1);
