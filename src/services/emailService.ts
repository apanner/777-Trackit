import axios from 'axios';
import { Task, Worker } from '../types';

const API_URL = 'http://localhost:5000/api';

export async function sendTaskNotification(task: Task, worker: Worker) {
  try {
    await axios.post(`${API_URL}/tasks/${task.id}/notify`, {
      taskId: task.id,
      workerId: worker.id,
      type: 'task_assigned'
    });
  } catch (error) {
    console.error('Failed to send task notification:', error);
    throw error;
  }
}

export async function sendTaskNoteNotification(task: Task, note: any, worker: Worker) {
  try {
    await axios.post(`${API_URL}/tasks/${task.id}/notify`, {
      taskId: task.id,
      workerId: worker.id,
      noteId: note.id,
      type: 'new_note'
    });
  } catch (error) {
    console.error('Failed to send note notification:', error);
    throw error;
  }
}