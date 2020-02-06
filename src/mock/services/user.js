import Mock from 'mockjs'

const Random = Mock.Random
const info = req => {
  console.log(req)
  return new Array(20).fill(null).map(() => ({
    address: Random.csentence(10, 25), // 随机生成长度为10-25的标题
    name: Random.cname(), // 随机生成名字
    date: Random.date() + ' ' + Random.time() // 随机生成年月日 + 时间
  }))
}

Mock.mock(`/api/user/info`, 'get', info)