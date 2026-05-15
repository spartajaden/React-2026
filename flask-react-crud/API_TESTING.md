# API 엔드포인트 테스트 가이드

## cURL을 이용한 테스트

### 1. 헬스 체크

```bash
curl http://localhost:5000/api/health
```

**응답:**

```json
{
  "status": "healthy"
}
```

### 2. 모든 항목 조회

```bash
curl http://localhost:5000/api/items
```

**응답:**

```json
[
  {
    "id": 1,
    "title": "항목 1",
    "description": "설명",
    "status": "pending",
    "created_at": "2024-01-01 10:00:00",
    "updated_at": "2024-01-01 10:00:00"
  }
]
```

### 3. 단일 항목 조회

```bash
curl http://localhost:5000/api/items/1
```

### 4. 새 항목 생성

```bash
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "title": "새 항목",
    "description": "항목 설명",
    "status": "pending"
  }'
```

**응답:**

```json
{
  "id": 2,
  "message": "Item created successfully"
}
```

### 5. 항목 수정

```bash
curl -X PUT http://localhost:5000/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "수정된 항목",
    "description": "수정된 설명",
    "status": "in-progress"
  }'
```

**응답:**

```json
{
  "message": "Item updated successfully"
}
```

### 6. 항목 삭제

```bash
curl -X DELETE http://localhost:5000/api/items/1
```

**응답:**

```json
{
  "message": "Item deleted successfully"
}
```

## Postman 사용

1. Postman 다운로드: https://www.postman.com/
2. 새 Collection 생성
3. 각 엔드포인트 추가:

| Method | URL                        | Body                                                      |
| ------ | -------------------------- | --------------------------------------------------------- |
| GET    | localhost:5000/api/items   | -                                                         |
| GET    | localhost:5000/api/items/1 | -                                                         |
| POST   | localhost:5000/api/items   | `{"title": "...", "description": "...", "status": "..."}` |
| PUT    | localhost:5000/api/items/1 | `{"title": "...", "description": "...", "status": "..."}` |
| DELETE | localhost:5000/api/items/1 | -                                                         |

## Python을 사용한 테스트

```python
import requests

BASE_URL = "http://localhost:5000/api"

# 모든 항목 조회
response = requests.get(f"{BASE_URL}/items")
print(response.json())

# 새 항목 생성
data = {
    "title": "새 항목",
    "description": "설명",
    "status": "pending"
}
response = requests.post(f"{BASE_URL}/items", json=data)
print(response.json())
item_id = response.json()['id']

# 항목 수정
update_data = {
    "title": "수정된 항목",
    "description": "수정된 설명",
    "status": "completed"
}
response = requests.put(f"{BASE_URL}/items/{item_id}", json=update_data)
print(response.json())

# 항목 삭제
response = requests.delete(f"{BASE_URL}/items/{item_id}")
print(response.json())
```

## JavaScript를 사용한 테스트

```javascript
const BASE_URL = "http://localhost:5000/api";

// 모든 항목 조회
fetch(`${BASE_URL}/items`)
  .then((res) => res.json())
  .then((data) => console.log(data));

// 새 항목 생성
fetch(`${BASE_URL}/items`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "새 항목",
    description: "설명",
    status: "pending",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
```

## 상태 종류

- `pending` - 대기중
- `in-progress` - 진행중
- `completed` - 완료

## 에러 응답

### 400 Bad Request

```json
{
  "error": "Title is required"
}
```

### 404 Not Found

```json
{
  "error": "Item not found"
}
```

### 500 Internal Server Error

```json
{
  "error": "Database connection failed"
}
```
