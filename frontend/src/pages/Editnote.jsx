import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import noteService from "../api/noteService";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify'
import '../styles/login.css'

function Editnote () {
    const { id } = useParams();
    const [loading , setloading] = useState(false);

    useEffect(() => {
        fetchNotes();
      }, []);

    const [ note , setnote ] = useState({
        title:'',
        content:''
    })
  
     const fetchNotes = async () => {
      try {
          const res = await noteService.getNote(id);
          setnote({
             title:res.title,
             content:res.content
          });
      } catch(e) {
         alert(e.response?.data?.message || 'Failed to fetch');
      }
    }

    const navigate = useNavigate();
    const handleChange = (e) => {
        setnote({
            ...note,
            [e.target.name]:e.target.value
        })
    }

    const EditNote = async () => {
      try {
        setloading(true)
        const res = await noteService.updateNote(id, note);
        toast.success("Note Updated");
      } catch (e) {
        toast.error(e.response?.data?.message || "Updating Failed");
      } finally {
        setloading(false);
      }
   };

    return (
        <>
        <div className='box'>
    <div className='Login'>
      <h2>Edit Note</h2>

        <div>
          <label>Title</label>
          <br />
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={handleChange}
            required
          />
        </div>

      

        <div>
  <label>Content</label>
  <br />
  <textarea
    name="content"
    value={note.content}
    onChange={handleChange}
    required
    rows={5}
    placeholder="Write your note here..."
  />
</div>


        <button onClick={() => EditNote() }>
          { loading?'Editing note...':'Edit Note' }
        </button>
        <p
          className="register-link"
          onClick={() => navigate('/Dashboard')}
          >
          Go to Home
        </p>
    </div>
        </div>
        </>
    )
}


export default Editnote;

