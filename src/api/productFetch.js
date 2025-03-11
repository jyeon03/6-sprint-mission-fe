const URL = "https://panda-market-api.vercel.app";

export async function productFetch(params = {}) {
  const query = new URLSearchParams(params).toString();

  try {
    const response = await fetch(`${URL}/products?${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};