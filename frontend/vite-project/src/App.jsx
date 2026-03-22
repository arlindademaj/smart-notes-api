import { useState, useEffect } from "react";

function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:3000";

  const getNotes = async () => {
    try {
      const res = await fetch(`${API_URL}/notes`);
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  // ✏️ Create note
  const handleCreateNote = async () => {
    if (!note) return;

    try {
      const res = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: note }), // must match backend
      });

      const data = await res.json();
      console.log("Created note:", data);

      setNote(""); // clear input
      getNotes(); // refresh notes list
    } catch (err) {
      console.error("Error creating note:", err);
    }
  };

  // ❌ Delete note
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/notes/${id}`, {
        method: "DELETE",
      });

      getNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  // 🤖 Analyze note
  const handleAnalyze = async (content) => {
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/notes/ai-process`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing note:", error);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🧠 Smart Notes AI</h1>

      {/* ✏️ Create Note */}
      <textarea
        rows="5"
        cols="60"
        placeholder="Write your note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleCreateNote}>Save Note</button>

      {/* 📋 Notes List */}
      <h2 style={{ marginTop: "30px" }}>Your Notes</h2>

      {notes.length === 0 && <p>No notes yet...</p>}

      {notes.map((n) => (
        <div
          key={n._id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "5px",
          }}
        >
          <p>{n.content}</p>

          <button onClick={() => handleAnalyze(n.content)}>Analyze</button>

          <button
            onClick={() => handleDelete(n._id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}

      {/* 🤖 AI Result */}
      {result && (
        <div style={{ marginTop: "30px" }}>
          <h2>Summary</h2>
          <p>{result.summary}</p>

          <h3>Key Points</h3>
          <ul>
            {result.key_points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>

          <h3>🚀 Improve Next</h3>
          <ul>
            {result.next_topics.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>

          <h3>Tags</h3>
          <div>
            {result.tags.map((tag, i) => (
              <span key={i} style={{ marginRight: "8px" }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
