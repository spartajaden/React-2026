#!/usr/bin/env python3
"""
Flask-React-CRUD 데이터베이스 마이그레이션 스크립트

사용법:
    python init_db.py          # 테이블 생성
    python init_db.py seed     # 샘플 데이터 추가
    python init_db.py drop     # 테이블 삭제 (주의!)
"""

import sys
import MySQLdb
from config import Config

def get_connection():
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
        print(f"❌ 데이터베이스 연결 실패: {e}")
        return None

def create_tables(conn):
    """테이블 생성"""
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
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        """)
        conn.commit()
        print("✅ 테이블 생성 완료")
    except MySQLdb.Error as e:
        print(f"❌ 테이블 생성 실패: {e}")
    finally:
        cursor.close()

def seed_data(conn):
    """샘플 데이터 추가"""
    cursor = conn.cursor()
    sample_items = [
        ("Flask 백엔드 구성", "Flask를 사용한 REST API 구현", "completed"),
        ("React 프론트엔드 구성", "React를 사용한 UI 개발", "completed"),
        ("MySQL 데이터베이스 설정", "Docker에서 MySQL 실행", "in-progress"),
        ("Docker Compose 설정", "서비스 오케스트레이션", "in-progress"),
        ("테스트 코드 작성", "API 및 컴포넌트 테스트", "pending"),
        ("배포 준비", "프로덕션 환경 설정", "pending"),
    ]
    
    try:
        for title, description, status in sample_items:
            cursor.execute(
                "INSERT INTO items (title, description, status) VALUES (%s, %s, %s)",
                (title, description, status)
            )
        conn.commit()
        print(f"✅ {len(sample_items)}개의 샘플 데이터 추가 완료")
    except MySQLdb.Error as e:
        print(f"❌ 샘플 데이터 추가 실패: {e}")
        conn.rollback()
    finally:
        cursor.close()

def drop_tables(conn):
    """테이블 삭제"""
    cursor = conn.cursor()
    try:
        cursor.execute("DROP TABLE IF EXISTS items")
        conn.commit()
        print("✅ 테이블 삭제 완료")
    except MySQLdb.Error as e:
        print(f"❌ 테이블 삭제 실패: {e}")
    finally:
        cursor.close()

def main():
    conn = get_connection()
    if not conn:
        sys.exit(1)
    
    try:
        if len(sys.argv) > 1:
            command = sys.argv[1]
            if command == "seed":
                seed_data(conn)
            elif command == "drop":
                confirm = input("⚠️  정말로 테이블을 삭제하시겠습니까? (yes/no): ")
                if confirm.lower() == "yes":
                    drop_tables(conn)
                else:
                    print("취소되었습니다")
            else:
                print(f"❌ 알 수 없는 명령: {command}")
        else:
            create_tables(conn)
    finally:
        conn.close()

if __name__ == "__main__":
    main()
