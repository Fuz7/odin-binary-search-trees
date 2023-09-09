// eslint-disable-next-line import/extensions
import {Tree, prettyPrint, generateGreaterThan100Number} from './main.js'



const arr = []
const tree = new Tree();
while(arr.length !== 20){
  arr.push(generateGreaterThan100Number())
}
tree.buildTree(arr)
console.log(tree.isBalanced())
prettyPrint(tree.root)
console.log(tree.preorder())
console.log(tree.inorder())
console.log(tree.postorder())
tree.insert(23)
tree.insert(44)
tree.insert(55)
tree.insert(21)
console.log(tree.isBalanced())
prettyPrint(tree.root)
console.log(tree.preorder())
console.log(tree.inorder())
console.log(tree.postorder())
tree.rebalance()
console.log(tree.isBalanced())
prettyPrint(tree.root)
console.log(tree.preorder())
console.log(tree.inorder())
console.log(tree.postorder())
