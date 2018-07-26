### RESTful API

| 序号 | URI                  | HTTP方法 | 发送内容 | 返回结果       |
| ---- | -------------------- | -------- | -------- | -------------- |
| 1    | inbound_notes        | GET      | 空       | 所有入库单列表 |
| 2    | delivery_notes       | GET      | 空       | 所有送货单列表 |
| 3    | repo                 | GET      | 空       | 仓库库存       |
| 4    | inbound_notes/:inid  | GET      | 空       | 入库单详情     |
| 5    | delivery_notes/:deid | GET      | 空       | 送货单详情     |
| 6    | inbound_notes        | POST     | 所有信息 | 新建入库单     |
|      |                      |          |          |                |
|      |                      |          |          |                |
|      |                      |          |          |                |

### 1. GET /Inbound_notes

不发送内容，返回一个data对象如下(样例中，有两个Inbound_note)，前端在处理时，应当以ID_time去索引inbound_items，来获得入库单上面的具体货品。

```json
[
    {
        "ID_time": 1,
        "createAt": "1",
        "container_id": "1",
        "brand": "4",
        "name": "4",
        "level": "4",
        "quanlity": 7,
        "volume_sum": 8,
        "goods_mark": "9"
    },
    {
        "ID_time": 2,
        "createAt": "2",
        "container_id": "2",
        "brand": "niupi",
        "name": "lihai",
        "level": "4",
        "quanlity": 7,
        "volume_sum": 8,
        "goods_mark": "9"
    }
]
```

###2. GET /Inbound_nots/:inid

不发送内容，:inid用于索引（ID_time == :inid）的入库单，返回一个入库单如下。同样，需要用ID去索引items

```json
{
    "ID_time": 1,
    "createAt": "1",
    "container_id": "1",
    "brand": "4",
    "name": "4",
    "level": "4",
    "quanlity": 7,
    "volume_sum": 8,
    "goods_mark": "9"
}
```

### 3. PUT /Inbound_notes

发送以下信息

```json
{
    "container_id": "柜号",
    "brand": "品牌",
    "name": "品名",
    "level": "等级",
    "quanlity": 100,
    "volume_sum": 200.0,
    "goods_mark": "货号"
}
```

应该返回一个与GET /Inbound_notes/:inid相同的数据

```json

```

