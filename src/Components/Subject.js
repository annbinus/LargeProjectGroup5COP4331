import React, { useState, useEffect } from 'react';
import '../AppMain.css';
import Task from './Task';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import axios from 'axios';

function Subject() {
  const [buttonStates, setButtonStates] = useState([]);
  const [subjectData, setSubjectData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('http://localhost:5000/subjects/');
        setSubjectData(res.data);
        setButtonStates(res.data.map(() => false));
      } catch (err) {
        console.log(`Error getting subjects: ${err}`);
      }
    }

    fetchData();
  }, []);

  const toggleButtons = (subjectID) => {
    setButtonStates(buttonStates.map((state, index) => index === subjectID ? !state : state));
  };

  const handleDeleteClick = () => {
    confirmAlert({
      title: 'Confirm deletion',
      message: 'Are you sure you want to delete this subject?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            // Delete the subject here
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  return (
    <div className='Subject'>
      <ul className='SubjectList'>
        {subjectData.map((val, subjectID) => {
          const buttonsOpen = buttonStates[subjectID];
          const buttonIcon = buttonsOpen ? <CheckIcon /> : <EditIcon />;
          return (
            <li 
              key={subjectID} 
              className='SubjectRow'
              style={{ backgroundColor: val.color }}
            >
              <div id='SubjectWrapper'>
                <div id='SubjectName'>{val.name}</div>
                <button id='SubjectButton' onClick={() => toggleButtons(subjectID)}>{buttonIcon}</button>
              </div>
              <div id='SubjectTasks'><Task tasks={val.tasks} isOpen={buttonsOpen} /></div>
              <button id='SubjectDeleteButton' style={{ display: buttonsOpen ? 'grid' : 'none' }} onClick={handleDeleteClick}><DeleteIcon /></button>
              <div id='TaskAddName' style={{ display: buttonsOpen ? 'grid' : 'none' }}>New Task</div>
              <button id='TaskAddButton' style={{ display: buttonsOpen ? 'grid' : 'none' }}><AddIcon /></button>
            </li>
          )
        })}
        <button id='SubjectAddWrapper'>
          <div id='SubjectAddName'>New Subject</div>
          <div id='SubjectAddButton'><AddIcon /></div>
        </button>
      </ul>
    </div>
  );
}

export default Subject;