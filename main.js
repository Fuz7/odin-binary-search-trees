/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
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

function findMinValue(node){
  while(node.leftChild !== null){
    node = node.leftChild
  }
  return node.data
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

  insert(val,node=this.root) {
    if(node === null){
      // eslint-disable-next-line no-param-reassign
      const newNode = new Node(val)
      return newNode
    }
    
    if(node.data === val){
      console.log('value already in tree') 
    }


    if(node.data > val){
      // eslint-disable-next-line no-param-reassign
      node.leftChild = this.insert(val,node.leftChild)
    } 
    if(node.data < val){
      // eslint-disable-next-line no-param-reassign
      node.rightChild = this.insert(val,node.rightChild)
    }
    
    return node
  }


  delete(val,node=this.root){
    if (node === null) return node
    

    // Traverse till you find the same value    
    if(node.data > val){
      node.leftChild = this.delete(val,node.leftChild)
    } 
    if(node.data < val){
      node.rightChild = this.delete(val,node.rightChild)
    }


    // To check if the node is the root and not the value
    if(val !== this.root.data && node === this.root){
      return node
    }

    // if val 
    if(val === node.data){
      if(node.leftChild === null){
        return node.rightChild
      }
      if(node.rightChild === null){
        return node.leftChild
      }
      
      node.data = findMinValue(node.rightChild)
  
      node.rightChild = this.delete(node.data,node.rightChild)

    }        

    return node
  }

  find(value,node=this.root){
    if(node === null) return null

    if(node.data === value) {
      // eslint-disable-next-line consistent-return
      return node
    }
    
    let searchedValue;
    if(node.data > value){
      searchedValue = this.find(value,node.leftChild)
    }
    if(node.data < value){
      searchedValue = this.find(value,node.rightChild)
    }

    // eslint-disable-next-line consistent-return
    return searchedValue

  }

  levelOrder(callbackFn,node=this.root){
    const queue = []
    const result = []
    queue.push(node)
    while(queue.length !== 0){
      const tempNode = queue.shift()
      if(tempNode.leftChild !== null) queue.push(tempNode.leftChild)
      if(tempNode.rightChild !== null) queue.push(tempNode.rightChild)

      if(callbackFn) callbackFn(tempNode)
      else result.push(tempNode.data)

    }
    if(result.length !== 0)return result

  }

  preorder(callbackFn,node=this.root,result=[]){

    if(callbackFn) callbackFn(node)
    else result.push(node.data)

    if(node.leftChild !== null) this.preorder(callbackFn,node.leftChild,result)
    if(node.rightChild !== null)this.preorder(callbackFn,node.rightChild,result)

    if(result.length !== 0) return result
    
  }

  inorder(callbackFn,node=this.root,result=[]){

  if(node.leftChild !== null) this.inorder(callbackFn,node.leftChild,result)
  
  if(callbackFn) callbackFn(node)
  else result.push(node.data)

  if(node.rightChild !== null)this.inorder(callbackFn,node.rightChild,result)

  if(result.length !== 0) return result
    
  }   

  postorder(callbackFn,node=this.root,result=[]){

  if(node.leftChild !== null) this.postorder(callbackFn,node.leftChild,result)
  if(node.rightChild !== null)this.postorder(callbackFn,node.rightChild,result)
  
  if(callbackFn) callbackFn(node)
  else result.push(node.data)

  if(result.length !== 0) return result
    
  }   

  findHeight(node=this.root){
    if(node === null || node === undefined){
      return -1
    }

    let height = -1
    const queue = []
    queue.push(node)
    // eslint-disable-next-line no-constant-condition
    while(true){
      let nodeCount = queue.length
      if (nodeCount === 0){
        return height
      }     
      height += 1

      while(nodeCount > 0){
        const newNode = queue.shift()
        if(newNode.leftChild !== null) queue.push(newNode.leftChild)
        if(newNode.rightChild !== null) queue.push(newNode.rightChild)
        nodeCount -= 1        
      }

    }
  }

  findDepth(node,currNode=this.root,counter=0){
    let depth;
    if(node === null){
      return undefined
    }
    if(node.data === currNode.data){
      return counter
    }

    if(node.data < currNode.data){
      depth = this.findDepth(node,currNode.leftChild,counter += 1)
    }
    if(node.data > currNode.data){
      depth = this.findDepth(node,currNode.rightChild, counter += 1)
    }

    return depth

  }

  isBalanced(node=this.root){
    if(node === null){
      return true
    }

    const nodeLeftHeight = this.findHeight(node.leftChild) 
    const nodeRightHeight = this.findHeight(node.rightChild)
    

    if(Math.abs(nodeLeftHeight - nodeRightHeight) <= 1){
      return true
    }
    return false
    
  }
  
  rebalance(){
    const arr = this.inorder()
    this.buildTree(arr)
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

function generateGreaterThan100Number(){
  const number = Math.floor((Math.random() * 300) + 101)
  return number
}

// function msg(as){
//   if(as.data % 2 === 0){
//     console.log(`${as.data} is even`)
//   }
// }

export {Tree, prettyPrint, generateGreaterThan100Number}