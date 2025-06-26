import axiosInstance from "@/utils/axiosInstance";

const apiClient = {
  getAll: async (endpoint: string) => {
    const controller = new AbortController();

    try {
      const response = await axiosInstance.get(endpoint, {
        signal: controller.signal,
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    } finally {
      controller.abort();
    }
  },
  getById: async (endpoint: string, id: string) => {
    const controller = new AbortController();

    try {
      const response = await axiosInstance.get(`${endpoint}/${id}`, {
        signal: controller.signal,
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'élément:", error);
    } finally {
      controller.abort();
    }
  },
  create: async (endpoint: string, payload: object) => {
    const controller = new AbortController();

    try {
      const response = await axiosInstance.post(endpoint, payload, {
        signal: controller.signal,
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création de l'élément:", error);
    } finally {
      controller.abort();
    }
  },
  deleteById: async (endpoint: string) => {
    const controller = new AbortController();

    try {
      const response = await axiosInstance.delete(endpoint, {
        signal: controller.signal,
      });

      return response.data;
    } catch (error) {
      console.error("Erreur lors de la suppression de l'élément:", error);
    } finally {
      controller.abort();
    }
  },
  update: async (endpoint: string, payload: object) => {
    const controller = new AbortController();

    try {
      const response = await axiosInstance.put(endpoint, payload, {
        signal: controller.signal,
      });

      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'élément:", error);
    } finally {
      controller.abort();
    }
  },
  patch: async (endpoint: string, payload: object) => {
    const controller = new AbortController();

    try {
      const response = await axiosInstance.patch(endpoint, payload, {
        signal: controller.signal,
      });

      return response.data;
    } catch (error) {
      console.error("Erreur lors de la modification de l'élément:", error);
    } finally {
      controller.abort();
    }
  },
};

export default apiClient;
