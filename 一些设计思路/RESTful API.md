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

### 1. GET /api/Inbound_notes

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

### 2. GET /api/Inbound_nots/:inid

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

### 3. POST /api/Inbound_notes

发送以下信息。服务器接收以下信息后，会自动补全ID_time、createAt参数。

```json
{
    "container_id": "1",
    "brand": "4",
    "name": "4",
    "level": "4",
    "quanlity": 7,
    "volume_sum": 8,
    "goods_mark": "9"
}
```

应该返回一个与GET /Inbound_notes/:inid相同的数据

```json
{
    "container_id": "1",
    "brand": "4",
    "name": "4",
    "level": "4",
    "quanlity": 7,
    "volume_sum": 8,
    "goods_mark": "9",
    "ID_time": 1532678322980,
    "createAt": "2018-7-27 15:58:42"
}
```

### 4. DELETE /api/Inbound_notes/:inid

若ID正确，将删除数据后返回删除了几条记录。若ID错误，会返回如下错误码

```json
{
    "code": "database:data not found",
    "message": "data not found"
}
```

### 5. POST /api/Inbound_items

新建一个入库单子项目，传入如下数据，其中ID_time是入库单的ID，通过这个ID将子项与入库单联系起来

```json
{
	"ID_time": 1532744699830,
	"thickness": 38,
	"width": 125,
	"length": 4.000,
	"pcs": 224,
	"volume": 4.256
}
```

返回数据是完整的子项实例，包括ID和createAt。

```json
{
    "ID_time": 1532744699830,
    "thickness": 38,
    "width": 125,
    "length": 4,
    "pcs": 224,
    "volume": 4.256,
    "ID": 1532748576118,
    "createAt": "2018-7-28 11:29:36"
}
```

### 6. GET /api/Inbound_items/id=:id

通过ID，获取单个子项实例

例如`GET 127.0.0.1:3000/api/Inbound_items/id=1532752515398 `返回

```json
{
    "ID": 1532752515398,
    "createAt": "2018-7-28 12:35:15",
    "ID_time": 1532744699830,
    "thickness": 38,
    "width": 125,
    "length": 4,
    "pcs": 224,
    "volume": 4.256
}
```

### 7. GET /api/Inbound_items/inid=:inid

通过对比ID_time获取一个入库单上所有的子项

### 8. DELETE /api/Inbound_items/id=:id

删除对应ID的子项，成功返回删除了几条记录（此处应该是1），失败返回错误信息

### 9. DELETE /api/Inbound_items/inid=:inid

删除对应ID的入库单的所有子项，成功后会返回一个数字，显示删除了几条信息，失败返回相应的错误信息。



