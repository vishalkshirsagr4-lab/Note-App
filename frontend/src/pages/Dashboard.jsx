import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteService from "../api/noteService";
import "../styles/dashboard.css";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const [ loading , setloading ] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setloading(true);
      const data = await noteService.getAllNotes();
      setNotes(data);
    } catch (error) {
      console.log(error);
      navigate('/');
    } finally {
      setloading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await noteService.deleteNote(id);

      setNotes(notes.filter((note) => note._id !== id));

      alert("Note Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>My Notes</h1>

        <button
          className="add-btn"
          onClick={() => navigate("/add-note")}
        >
          + Add Note
        </button>
        <button
          className="logout-btn"
          onClick={() => { const token = localStorage.removeItem("token"); }}
        >
          Logout
        </button>
      </div>

      <div className="notes-container">
        { loading ? (<h3> Notes are Loading.....</h3>) : notes.length === 0 ? (
          <h3>No Notes Found</h3>
        ) :
          
          (notes.map((note) => (
            <div className="note-card" key={note._id}>
              <h3>{note.title}</h3>

              <p>{note.content}</p>

              <div className="btn-group">
                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(`/edit-note/${note._id}`)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(note._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) 
        }
      </div>
    </div>
  );
}

export default Dashboard;