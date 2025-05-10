import { create } from 'zustand';
import { Server } from '../types';
import { getServers, createServer, updateServer } from '../lib/api';

interface ServerState {
  servers: Server[];
  loading: boolean;
  error: string | null;
  fetchServers: () => Promise<void>;
  createServer: (name: string, description: string) => Promise<boolean>;
  updateServer: (id: string, name: string, description: string) => Promise<boolean>;
}

const serverStore = create<ServerState>((set) => ({
  servers: [],
  loading: false,
  error: null,

  fetchServers: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getServers();
      set({ servers: data, loading: false });
    } catch (error) {
      set({
        loading: false,
        error: typeof error === 'object' && error !== null && 'message' in error
          ? String(error.message)
          : 'Failed to fetch servers',
      });
    }
  },

  createServer: async (name, description) => {
    set({ loading: true, error: null });
    try {
      const newServer = await createServer(name, description);
      set((state) => ({
        servers: [...state.servers, newServer],
        loading: false,
      }));
      return true;
    } catch (error) {
      set({
        loading: false,
        error: typeof error === 'object' && error !== null && 'message' in error
          ? String(error.message)
          : 'Failed to create server',
      });
      return false;
    }
  },

  updateServer: async (id, name, description) => {
    set({ loading: true, error: null });
    try {
      const updatedServer = await updateServer(id, name, description);
      set((state) => ({
        servers: state.servers.map((server) =>
          server.id === id ? updatedServer : server
        ),
        loading: false,
      }));
      return true;
    } catch (error) {
      set({
        loading: false,
        error: typeof error === 'object' && error !== null && 'message' in error
          ? String(error.message)
          : 'Failed to update server',
      });
      return false;
    }
  },
}));

export default serverStore;