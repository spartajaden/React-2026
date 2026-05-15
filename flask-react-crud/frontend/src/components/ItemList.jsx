import React from "react";

function ItemList({ items, loading, onDelete, onEdit }) {
  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "status-completed";
      case "in-progress":
        return "status-in-progress";
      default:
        return "status-pending";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "completed":
        return "완료";
      case "in-progress":
        return "진행중";
      default:
        return "대기중";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  return (
    <div className="items-section">
      <h2>항목 목록 ({items.length})</h2>
      {items.length === 0 ? (
        <div className="empty-state">
          <p>항목이 없습니다. 새 항목을 추가해보세요!</p>
        </div>
      ) : (
        <div className="items-list">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              <div className="item-title">{item.title}</div>
              {item.description && (
                <div className="item-description">{item.description}</div>
              )}
              <div>
                <span className={`item-status ${getStatusClass(item.status)}`}>
                  {getStatusLabel(item.status)}
                </span>
              </div>
              <div className="item-meta">
                <span>{formatDate(item.created_at)}</span>
              </div>
              <div className="item-actions">
                <button
                  className="btn btn-warning"
                  onClick={() => onEdit(item)}
                >
                  수정
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(item.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemList;
