import { useState, useEffect } from "react";
import { fetchBooks, addBook, updateBook, deleteBook } from "../../service/Api";
import styles from "../../styles/Library.module.css";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";

const Library = () => {
  const [books, setBooks] = useState([]);
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    category: "",
    quantity: "",
  });
  const [editingId, setEditingId] = useState(null);
  const token = "your_jwt_token_here"; // Replace with actual token

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const data = await fetchBooks(localStorage.getItem("token"));
    setBooks(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateBook(editingId, bookData, localStorage.getItem("token"));
    } else {
      await addBook(bookData, localStorage.getItem("token"));
    }
    setBookData({ title: "", author: "", category: "", quantity: "" });
    setEditingId(null);
    loadBooks();
  };

  const handleEdit = (book) => {
    setBookData(book);
    setEditingId(book.id);
  };

  const handleDelete = async (id) => {
    await deleteBook(id, localStorage.getItem("token"));
    loadBooks();
  };

  return (
    <SuperAdminLayout>
      <div className={styles.container}>
        <h2 className={styles.title}>Library Management</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={bookData.title}
            onChange={(e) =>
              setBookData({ ...bookData, title: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={bookData.author}
            onChange={(e) =>
              setBookData({ ...bookData, author: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={bookData.category}
            onChange={(e) =>
              setBookData({ ...bookData, category: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={bookData.quantity}
            onChange={(e) =>
              setBookData({ ...bookData, quantity: e.target.value })
            }
            required
          />
          <button type="submit" className={styles.button}>
            {editingId ? "Update" : "Add"}
          </button>
        </form>

        <h3 className={styles.subtitle}>All Books</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.quantity}</td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit(book)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SuperAdminLayout>
  );
};

export default Library;
