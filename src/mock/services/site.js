import Mock from 'mockjs'

const Random = Mock.Random
const templateList = [
  {
    id: Random.increment(), name: '空白', img: Random.dataImage('200x120'),
    data: []
  },
  {
    id: Random.increment(), name: '门户', img: Random.dataImage('200x120'),
    data: [
      {
        "id": "a2cbbcccb4a0456ebd5779ec7f69cda5",
        "x": 0,
        "y": 0,
        "w": 961,
        "h": 650,
        "line": {
          "id": "a2cbbcccb4a0456ebd5779ec7f69cda5",
          "x": 476,
          "y": 0,
          "w": 10,
          "h": 650,
          "way": "v",
          "pc": 50,
          "value": 481
        }
      },
      {
        "id": "1c9cfa03d0434709b4eb661cf2ce2e98",
        "x": 0,
        "y": 0,
        "w": 476,
        "h": 650,
        "parent": "a2cbbcccb4a0456ebd5779ec7f69cda5",
        "line": {
          "id": "1c9cfa03d0434709b4eb661cf2ce2e98",
          "x": 0,
          "y": 320,
          "w": 476,
          "h": 10,
          "way": "h",
          "pc": 50,
          "value": 325
        }
      },
      {
        "id": "bac64eb216074a75bbabc357df6cbcbc",
        "x": 486,
        "y": 0,
        "w": 475,
        "h": 650,
        "parent": "a2cbbcccb4a0456ebd5779ec7f69cda5"
      },
      {
        "id": "0d475ce8c3a24e09aff4d7916438e28d",
        "x": 0,
        "y": 0,
        "w": 476,
        "h": 320,
        "parent": "1c9cfa03d0434709b4eb661cf2ce2e98"
      },
      {
        "id": "9eede3fdf5ab4534b6e506ac3368c70b",
        "x": 0,
        "y": 330,
        "w": 476,
        "h": 320,
        "parent": "1c9cfa03d0434709b4eb661cf2ce2e98"
      }
    ]
  },
  {
    id: Random.increment(), name: '简约', img: Random.dataImage('200x120'),
    data: []
  },
  {
    id: Random.increment(), name: '高级', img: Random.dataImage('200x120'),
    data: []
  }
]
Mock.mock(/\/api\/templates/, 'get', templateList)