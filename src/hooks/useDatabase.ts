import { useCallback } from 'react'
import { supabase } from '../config/supabase'
import type { Database, Profile, Project, Task } from '../types/database'

export const useDatabase = () => {
  // Profile operations
  const getProfile = useCallback(async (userId: string): Promise<Profile | null> => {
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  }, [])

  const updateProfile = useCallback(async (userId: string, updates: Partial<Profile>) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  }, [])

  // Project operations
  const getProjects = useCallback(async (userId: string): Promise<Project[]> => {
    const { data, error } = await supabase
      .from('projects')
      .select()
      .or(`owner_id.eq.${userId},is_public.eq.true`)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }, [])

  const createProject = useCallback(async (project: Database['public']['Tables']['projects']['Insert']): Promise<Project> => {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single()

    if (error) throw error
    return data
  }, [])

  const updateProject = useCallback(async (projectId: string, updates: Database['public']['Tables']['projects']['Update']): Promise<Project> => {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', projectId)
      .select()
      .single()

    if (error) throw error
    return data
  }, [])

  const deleteProject = useCallback(async (projectId: string): Promise<void> => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId)

    if (error) throw error
  }, [])

  // Task operations
  const getTasks = useCallback(async (projectId: string): Promise<Task[]> => {
    const { data, error } = await supabase
      .from('tasks')
      .select()
      .eq('project_id', projectId)
      .order('priority', { ascending: false })
      .order('created_at', { ascending: true })

    if (error) throw error
    return data || []
  }, [])

  const createTask = useCallback(async (task: Database['public']['Tables']['tasks']['Insert']): Promise<Task> => {
    const { data, error } = await supabase
      .from('tasks')
      .insert(task)
      .select()
      .single()

    if (error) throw error
    return data
  }, [])

  const updateTask = useCallback(async (taskId: string, updates: Database['public']['Tables']['tasks']['Update']): Promise<Task> => {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', taskId)
      .select()
      .single()

    if (error) throw error
    return data
  }, [])

  const deleteTask = useCallback(async (taskId: string): Promise<void> => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)

    if (error) throw error
  }, [])

  // Real-time subscriptions
  const subscribeToProject = useCallback((projectId: string, callback: (payload: any) => void) => {
    return supabase
      .channel(`project-${projectId}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'tasks',
          filter: `project_id=eq.${projectId}`
        }, 
        callback
      )
      .subscribe()
  }, [])

  return {
    // Profile operations
    getProfile,
    updateProfile,
    
    // Project operations
    getProjects,
    createProject,
    updateProject,
    deleteProject,
    
    // Task operations
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    
    // Subscriptions
    subscribeToProject,
  }
}
