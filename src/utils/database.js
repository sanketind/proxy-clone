import { supabase } from '../config/supabase'

// Generic CRUD operations
export const createRecord = async (table, data) => {
  try {
    const { data: record, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single()
    
    if (error) throw error
    return record
  } catch (error) {
    throw error
  }
}

export const getRecords = async (table, query = {}) => {
  try {
    let queryBuilder = supabase.from(table).select()

    // Apply filters if provided
    if (query.filters) {
      query.filters.forEach(filter => {
        queryBuilder = queryBuilder.filter(filter.column, filter.operator, filter.value)
      })
    }

    // Apply ordering if provided
    if (query.orderBy) {
      queryBuilder = queryBuilder.order(query.orderBy.column, { 
        ascending: query.orderBy.ascending 
      })
    }

    // Apply pagination if provided
    if (query.range) {
      queryBuilder = queryBuilder.range(query.range.from, query.range.to)
    }

    const { data, error } = await queryBuilder

    if (error) throw error
    return data
  } catch (error) {
    throw error
  }
}

export const updateRecord = async (table, id, data) => {
  try {
    const { data: record, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return record
  } catch (error) {
    throw error
  }
}

export const deleteRecord = async (table, id) => {
  try {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id)

    if (error) throw error
    return true
  } catch (error) {
    throw error
  }
}

// Real-time subscriptions
export const subscribeToTable = (table, callback) => {
  return supabase
    .channel(`${table}-changes`)
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: table }, 
      payload => callback(payload)
    )
    .subscribe()
}
