import React, { useState, useEffect } from "react";

function ItemForm({ onSubmit, onCancel, editingItem }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  useEffect(() => {
    if (editingItem) {
      setFormData({
        title: editingItem.title || "",
        description: editingItem.description || "",
        status: editingItem.status || "pending",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        status: "pending",
      });
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("제목을 입력하세요");
      return;
    }
    onSubmit(formData);
    if (!editingItem) {
      setFormData({
        title: "",
        description: "",
        status: "pending",
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      status: "pending",
    });
    onCancel();
  };

  return (
    <div className="form-section">
      <h2>{editingItem ? "항목 수정" : "새 항목 추가"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목 *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="항목 제목을 입력하세요"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">설명</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="항목 설명을 입력하세요 (선택사항)"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">상태</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pending">대기중</option>
            <option value="in-progress">진행중</option>
            <option value="completed">완료</option>
          </select>
        </div>

        <div className="form-actions">
          {editingItem && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              취소
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {editingItem ? "수정" : "추가"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ItemForm;
