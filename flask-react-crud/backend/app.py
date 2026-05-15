from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import MySQLdb
from config import Config
import os
from datetime import datetime

app = Flask(__name__, static_folder='../frontend/dist', static_url_path='/')
CORS(app)

def get_db_connection():
    """데이터베이스 연결"""
    try:
        conn = MySQLdb.connect(
            host=Config.MYSQL_HOST,
            user=Config.MYSQL_USER,
            passwd=Config.MYSQL_PASSWORD,
            db=Config.MYSQL_DB,
            port=Config.MYSQL_PORT,
            charset='utf8mb4'
        )
        return conn
    except MySQLdb.Error as e:
        print(f"Database connection error: {e}")
        return None

def init_db():
    """데이터베이스 테이블 초기화"""
    conn = get_db_connection()
    if conn is None:
        print("Failed to connect to database")
        return
    
    cursor = conn.cursor()
    try:
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                status VARCHAR(50) DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        """)
        conn.commit()
        print("Database initialized successfully")
    except MySQLdb.Error as e:
        print(f"Error creating table: {e}")
    finally:
        cursor.close()
        conn.close()

# API 엔드포인트: 모든 항목 조회
@app.route('/api/items', methods=['GET'])
def get_items():
    """모든 항목 조회"""
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = conn.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * FROM items ORDER BY id DESC")
        items = cursor.fetchall()
        return jsonify(items), 200
    except MySQLdb.Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# API 엔드포인트: 단일 항목 조회
@app.route('/api/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    """특정 항목 조회"""
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = conn.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * FROM items WHERE id = %s", (item_id,))
        item = cursor.fetchone()
        if item:
            return jsonify(item), 200
        else:
            return jsonify({'error': 'Item not found'}), 404
    except MySQLdb.Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# API 엔드포인트: 새 항목 생성
@app.route('/api/items', methods=['POST'])
def create_item():
    """새 항목 생성"""
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Database connection failed'}), 500
    
    data = request.get_json()
    
    if not data or 'title' not in data:
        return jsonify({'error': 'Title is required'}), 400
    
    try:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO items (title, description, status) VALUES (%s, %s, %s)",
            (data.get('title'), data.get('description', ''), data.get('status', 'pending'))
        )
        conn.commit()
        item_id = cursor.lastrowid
        return jsonify({'id': item_id, 'message': 'Item created successfully'}), 201
    except MySQLdb.Error as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# API 엔드포인트: 항목 수정
@app.route('/api/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    """항목 수정"""
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Database connection failed'}), 500
    
    data = request.get_json()
    
    try:
        cursor = conn.cursor()
        # 기존 항목 확인
        cursor.execute("SELECT id FROM items WHERE id = %s", (item_id,))
        if not cursor.fetchone():
            return jsonify({'error': 'Item not found'}), 404
        
        # 업데이트
        cursor.execute(
            "UPDATE items SET title = %s, description = %s, status = %s WHERE id = %s",
            (
                data.get('title'),
                data.get('description'),
                data.get('status'),
                item_id
            )
        )
        conn.commit()
        return jsonify({'message': 'Item updated successfully'}), 200
    except MySQLdb.Error as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# API 엔드포인트: 항목 삭제
@app.route('/api/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    """항목 삭제"""
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = conn.cursor()
        # 기존 항목 확인
        cursor.execute("SELECT id FROM items WHERE id = %s", (item_id,))
        if not cursor.fetchone():
            return jsonify({'error': 'Item not found'}), 404
        
        # 삭제
        cursor.execute("DELETE FROM items WHERE id = %s", (item_id,))
        conn.commit()
        return jsonify({'message': 'Item deleted successfully'}), 200
    except MySQLdb.Error as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# 정적 파일 서빙 (React dist 폴더)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_static(path):
    """React 빌드 파일 서빙"""
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

# 헬스 체크 엔드포인트
@app.route('/api/health', methods=['GET'])
def health_check():
    """서버 상태 확인"""
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    # 개발 환경에서는 DB 초기화
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)
