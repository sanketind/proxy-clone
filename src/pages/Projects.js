import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Card, Typography } from '@mui/material';
import { supabase } from '../config/supabase';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  // Fetch projects
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching projects:', error);
    } else {
      setProjects(data || []);
    }
  };

  // Add new project
  const addProject = async (e) => {
    e.preventDefault();
    
    const { data, error } = await supabase
      .from('projects')
      .insert([{
        name: newProject.name,
        description: newProject.description
      }])
      .select();

    if (error) {
      console.error('Error adding project:', error);
    } else {
      setNewProject({ name: '', description: '' });
      fetchProjects();
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>My Projects</Typography>
      
      {/* Add Project Form */}
      <Card sx={{ p: 2, mb: 3 }}>
        <form onSubmit={addProject}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Project Name"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              required
            />
            <TextField
              label="Description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              fullWidth
            />
            <Button type="submit" variant="contained">Add Project</Button>
          </Box>
        </form>
      </Card>

      {/* Projects List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {projects.map(project => (
          <Card key={project.id} sx={{ p: 2 }}>
            <Typography variant="h6">{project.name}</Typography>
            <Typography color="text.secondary">{project.description}</Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default Projects;
