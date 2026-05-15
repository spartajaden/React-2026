import React, { useState } from "react";
import "./App.css";
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/items");
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    } catch (error) {
      console.error("Failed to fetch items:", error);
      showMessage("항목을 불러오는데 실패했습니다.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (formData) => {
    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showMessage("항목이 추가되었습니다.", "success");
        fetchItems();
      } else {
        const error = await response.json();
        showMessage(error.error || "항목 추가에 실패했습니다.", "error");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      showMessage("항목 추가 중 오류가 발생했습니다.", "error");
    }
  };

  const handleUpdateItem = async (formData) => {
    if (!editingItem) return;

    try {
      const response = await fetch(`/api/items/${editingItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showMessage("항목이 수정되었습니다.", "success");
        setEditingItem(null);
        fetchItems();
      } else {
        const error = await response.json();
        showMessage(error.error || "항목 수정에 실패했습니다.", "error");
      }
    } catch (error) {
      console.error("Error updating item:", error);
      showMessage("항목 수정 중 오류가 발생했습니다.", "error");
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm("이 항목을 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        showMessage("항목이 삭제되었습니다.", "success");
        fetchItems();
      } else {
        const error = await response.json();
        showMessage(error.error || "항목 삭제에 실패했습니다.", "error");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      showMessage("항목 삭제 중 오류가 발생했습니다.", "error");
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  React.useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>📝 CRUD 애플리케이션</h1>
        <p>항목을 추가, 수정, 삭제할 수 있습니다</p>
      </div>

      {message && (
        <div className={message.type === "error" ? "error" : "success"}>
          {message.text}
        </div>
      )}

      <ItemForm
        onSubmit={editingItem ? handleUpdateItem : handleAddItem}
        onCancel={handleCancelEdit}
        editingItem={editingItem}
      />

      <ItemList
        items={items}
        loading={loading}
        onDelete={handleDeleteItem}
        onEdit={handleEditItem}
      />
    </div>
  );
}

export default App;
