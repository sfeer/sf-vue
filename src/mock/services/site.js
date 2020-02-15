import Mock from 'mockjs'

const Random = Mock.Random
const templateList = [
  {id: Random.increment(), name: Random.ctitle(), data: []},
  {id: Random.increment(), name: Random.ctitle(), data: []},
  {id: Random.increment(), name: Random.ctitle(), data: []},
  {id: Random.increment(), name: Random.ctitle(), data: []}
]
Mock.mock(/\/api\/templates/, 'get', templateList)