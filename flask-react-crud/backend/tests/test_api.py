"""
Flask-React-CRUD 통합 테스트

실행: pytest tests/test_api.py
"""

import pytest
import json
from app import app, get_db_connection

@pytest.fixture
def client():
    """테스트 클라이언트"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_health_check(client):
    """헬스 체크 테스트"""
    response = client.get('/api/health')
    assert response.status_code == 200
    assert response.json['status'] == 'healthy'

def test_get_items_empty(client):
    """빈 항목 목록 조회"""
    response = client.get('/api/items')
    assert response.status_code == 200
    assert isinstance(response.json, list)

def test_create_item(client):
    """항목 생성"""
    data = {
        'title': '테스트 항목',
        'description': '테스트 설명',
        'status': 'pending'
    }
    response = client.post('/api/items',
                          data=json.dumps(data),
                          content_type='application/json')
    assert response.status_code == 201
    assert 'id' in response.json

def test_create_item_without_title(client):
    """제목 없이 항목 생성 실패"""
    data = {
        'description': '테스트 설명',
        'status': 'pending'
    }
    response = client.post('/api/items',
                          data=json.dumps(data),
                          content_type='application/json')
    assert response.status_code == 400

def test_get_single_item(client):
    """단일 항목 조회"""
    # 먼저 항목 생성
    data = {'title': '테스트', 'description': '설명', 'status': 'pending'}
    create_response = client.post('/api/items',
                                 data=json.dumps(data),
                                 content_type='application/json')
    item_id = create_response.json['id']
    
    # 항목 조회
    response = client.get(f'/api/items/{item_id}')
    assert response.status_code == 200
    assert response.json['title'] == '테스트'

def test_update_item(client):
    """항목 수정"""
    # 먼저 항목 생성
    data = {'title': '원본', 'description': '설명', 'status': 'pending'}
    create_response = client.post('/api/items',
                                 data=json.dumps(data),
                                 content_type='application/json')
    item_id = create_response.json['id']
    
    # 항목 수정
    update_data = {'title': '수정됨', 'description': '수정된 설명', 'status': 'completed'}
    response = client.put(f'/api/items/{item_id}',
                         data=json.dumps(update_data),
                         content_type='application/json')
    assert response.status_code == 200

def test_delete_item(client):
    """항목 삭제"""
    # 먼저 항목 생성
    data = {'title': '삭제 대상', 'description': '설명', 'status': 'pending'}
    create_response = client.post('/api/items',
                                 data=json.dumps(data),
                                 content_type='application/json')
    item_id = create_response.json['id']
    
    # 항목 삭제
    response = client.delete(f'/api/items/{item_id}')
    assert response.status_code == 200

def test_get_nonexistent_item(client):
    """존재하지 않는 항목 조회"""
    response = client.get('/api/items/99999')
    assert response.status_code == 404

if __name__ == '__main__':
    pytest.main([__file__, '-v'])
