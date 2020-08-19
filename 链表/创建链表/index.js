import LinkedList from './src/LinkedList'

const list = new LinkedList();

list.push('a')
console.log(list.toString())
console.log(list.size())

list.push('b')
list.push('c')
list.push('d')
console.log(list.toString())
console.log(list.size())

list.remove('c')
console.log(list.toString())

list.insert('z',1)
console.log(list.toString())

