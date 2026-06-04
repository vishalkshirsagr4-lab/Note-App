import { useState } from "react";
import { useNavigate } from "react-router-dom";
import noteService from "../api/noteService";
import '../styles/login.css'

function Addnote () {
    const [ note , setnote ] = useState({
        title:'',
        content:''
    })
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setnote({
            ...note,
            [e.target.name]:e.target.value
        })
    }
    const [loading, setloading] = useState(false);
    const  CreateNote = async () => {
        try {
          setloading(true);
          const res = await noteService.addNote(note);
          alert('Note created ');
          console.log(res);

        } catch(e) {
           alert(
                e.response?.data?.message || 'Note creating Failed'
            );
        } finally {
            setloading(false);
        }
    }

    return (
        <>
 <div className='box'>
    <div className='Login'>
      <h2>Create Note</h2>

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

        <button onClick={CreateNote}>
          { loading?'Creating note...':'Create Note' }
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


export default Addnote;
