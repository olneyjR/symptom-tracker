import { useState, useEffect } from 'react';
import { SymptomEntry } from '../types';
import { StorageService } from '../services/storage';

export function useSymptomData() {
  const [entries, setEntries] = useState<SymptomEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = () => {
    setIsLoading(true);
    try {
      const data = StorageService.getAllEntries();
      setEntries(data);
    } catch (error) {
      console.error('Failed to load entries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addEntry = (entry: SymptomEntry) => {
    try {
      StorageService.addEntry(entry);
      loadEntries();
    } catch (error) {
      console.error('Failed to add entry:', error);
      throw error;
    }
  };

  const updateEntry = (date: string, entry: SymptomEntry) => {
    try {
      StorageService.updateEntry(date, entry);
      loadEntries();
    } catch (error) {
      console.error('Failed to update entry:', error);
      throw error;
    }
  };

  const deleteEntry = (date: string) => {
    try {
      StorageService.deleteEntry(date);
      loadEntries();
    } catch (error) {
      console.error('Failed to delete entry:', error);
      throw error;
    }
  };

  const getEntryByDate = (date: string): SymptomEntry | null => {
    return entries.find(e => e.date === date) || null;
  };

  const clearAllEntries = () => {
    try {
      StorageService.clearEntries();
      loadEntries();
    } catch (error) {
      console.error('Failed to clear entries:', error);
      throw error;
    }
  };

  return {
    entries,
    isLoading,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntryByDate,
    clearAllEntries,
    refresh: loadEntries
  };
}
