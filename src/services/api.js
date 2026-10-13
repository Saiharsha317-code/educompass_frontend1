// EduCompass Central API Service

const API_BASE_URL =
  `${(import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080').replace(/\/+$/, '')}/api`;


async function fetchJSON(url, options = {}) {
  const config = {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: `Request failed with status ${response.status}` };
      }
      const error = new Error(errorData.message || `HTTP ${response.status}`);
      error.status = response.status;
      error.data = errorData;
      throw error;
    }

    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (err) {
    console.error(`API Error on ${url}:`, err);
    throw err;
  }
}

export const api = {
  // Health
  checkHealth() {
    return fetchJSON(`${API_BASE_URL}/health`);
  },
  // Authentication
  register(data) {
    return fetchJSON(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify({
        name: data.name ?? data.fullName,
        email: data.email,
        password: data.password
      })
    });
  },

  login(data) {
    return fetchJSON(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        rememberMe: Boolean(data.rememberMe)
      })
    });
  },

  loginWithGoogle(idToken) {
    return fetchJSON(`${API_BASE_URL}/auth/google`, {
      method: 'POST',
      body: JSON.stringify({ idToken })
    });
  },

  getCurrentUser() {
    return fetchJSON(`${API_BASE_URL}/auth/me`);
  },

  updateProfile(data) {
    return fetchJSON(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      body: JSON.stringify({ name: data.name })
    });
  },

  logout() {
    return fetchJSON(`${API_BASE_URL}/auth/logout`, {
      method: 'POST'
    });
  },
  // Pathways
  getPathways() {
    return fetchJSON(`${API_BASE_URL}/pathways`);
  },
  getPathwayById(id) {
    return fetchJSON(`${API_BASE_URL}/pathways/${id}`);
  },
  getPathwayByCode(code) {
    return fetchJSON(`${API_BASE_URL}/pathways/code/${encodeURIComponent(code)}`);
  },

  // Careers
  getCareers(category = '', search = '') {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    const qs = params.toString();
    return fetchJSON(`${API_BASE_URL}/careers${qs ? `?${qs}` : ''}`);
  },
  getCareerById(id) {
    return fetchJSON(`${API_BASE_URL}/careers/${id}`);
  },
  createCareer(careerData) {
    return fetchJSON(`${API_BASE_URL}/careers`, {
      method: 'POST',
      body: JSON.stringify(careerData)
    });
  },

  // Entrance Exams
  getExams(category = '', stage = '', search = '') {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (stage) params.append('stage', stage);
    if (search) params.append('search', search);
    const qs = params.toString();
    return fetchJSON(`${API_BASE_URL}/exams${qs ? `?${qs}` : ''}`);
  },
  getExamById(id) {
    return fetchJSON(`${API_BASE_URL}/exams/${id}`);
  },

  // Recommendations Quiz
  getRecommendations(quizData) {
    return fetchJSON(`${API_BASE_URL}/recommendations`, {
      method: 'POST',
      body: JSON.stringify(quizData)
    });
  },

  // Discussion Threads
  getThreads(category = '') {
    const qs = category ? `?category=${encodeURIComponent(category)}` : '';
    return fetchJSON(`${API_BASE_URL}/threads${qs}`);
  },
  getThreadById(id) {
    return fetchJSON(`${API_BASE_URL}/threads/${id}`);
  },
  createThread(threadData) {
    return fetchJSON(`${API_BASE_URL}/threads`, {
      method: 'POST',
      body: JSON.stringify(threadData)
    });
  },
  updateThread(id, threadData) {
    return fetchJSON(`${API_BASE_URL}/threads/${id}`, {
      method: 'PUT',
      body: JSON.stringify(threadData)
    });
  },
  deleteThread(id) {
    return fetchJSON(`${API_BASE_URL}/threads/${id}`, {
      method: 'DELETE'
    });
  },
  addReply(threadId, replyData) {
    return fetchJSON(`${API_BASE_URL}/threads/${threadId}/replies`, {
      method: 'POST',
      body: JSON.stringify({
        content: typeof replyData === 'string' ? replyData : replyData.content
      })
    });
  },
  updateReply(threadId, replyId, replyData) {
    return fetchJSON(`${API_BASE_URL}/threads/${threadId}/replies/${replyId}`, {
      method: 'PUT',
      body: JSON.stringify({
        content: typeof replyData === 'string' ? replyData : replyData.content
      })
    });
  },
  deleteReply(threadId, replyId) {
    return fetchJSON(`${API_BASE_URL}/threads/${threadId}/replies/${replyId}`, {
      method: 'DELETE'
    });
  }
};
