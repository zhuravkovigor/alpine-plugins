export const ajaxData = () => ({
  loading: false,
  error: null,
  data: null,
  async fetch(url, options = {}) {
    this.loading = true;
    this.error = null;
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      this.data = await response.json();
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  },
  async get(url) {
    return this.fetch(url, { method: "GET" });
  },
  async post(url, payload) {
    const headers = { "Content-Type": "application/json" };
    return this.fetch(url, {
      ...options,
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
  },
});
